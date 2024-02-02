document.addEventListener("DOMContentLoaded", function () {
    let idBtnAdd= document.getElementById("idBtnAdd");
    let idBtnSubtract= document.getElementById("idBtnSubtract");
    let idBtnMultiply= document.getElementById("idBtnMultiply");
    let idBtnSplit= document.getElementById("idBtnSplit");
    let idBtnReset= document.getElementById("idBtnReset");
    let idBtnHelp= document.getElementById("idBtnHelp");

    idBtnAdd.addEventListener('click', operate);
    idBtnSubtract.addEventListener('click', operate);
    idBtnMultiply.addEventListener('click', operate);
    idBtnSplit.addEventListener('click', operate);
    idBtnReset.addEventListener('click', cleanForm);
    idBtnHelp.addEventListener('click', showMsg);
});

let idFirstValue= document.getElementById("idFirstValue");
let idSecondValue= document.getElementById("idSecondValue");

let idFirstValueMsgError= document.getElementById("idFirstValueMsgError");
let idSecondValueMsgError= document.getElementById("idSecondValueMsgError");

let idOperation= document.getElementById("idOperation");
let idOperationResult= document.getElementById("idOperationResult");

let nroError=0;

const add = (value_a,value_b) => {
    return ((value_a+value_b).toFixed(2));
}
const substract = (value_a,value_b) => {
    return ((value_a-value_b).toFixed(2));
}
const multiply = (value_a,value_b) => {
    return ((value_a*value_b).toFixed(2));
}
const split = (value_a,value_b) => {
    return ((value_a/value_b).toFixed(2));
}

const showResult = (operation,result) => {    
    idOperation.innerHTML=operation;
    idOperationResult.innerHTML=convertNumberToString(result);
}

const cleanForm = (e) => {
    e.preventDefault();
    var inputCollection=document.getElementsByTagName("input");
    var spanCollection=document.getElementsByTagName("span");
    var errorsCollection=document.getElementsByClassName("erroMessage");

    for (let index = 0; index < inputCollection.length; index++) {
        inputCollection[index].value="";
    }
    for (let index = 0; index < spanCollection.length; index++) {
        spanCollection[index].innerHTML="";
    }
    for (let index = 0; index < errorsCollection.length; index++) {
        errorsCollection[index].classList.remove("animation");
        errorsCollection[index].classList.add("hidden");
        errorsCollection[index].innerText = "";
        errorsCollection[index].style.display = "none";
    }
    resetErrorResultColor();
    showResult("Esperando operación",0);
}

const validateNumber=(input, pError)=>{
    let valid=true;
    if (verificarNoVacio(input.value)){             
        if(validarNumeroDecimalNeg(input.value)){ 
            cleanMsgError(input,pError);  
        } 
        else {
            let msg="Solo se permiten Valores Númericos (123; 123.123,00)";
            showMsgError(input,pError,msg);            
            almacenarError(msg + ` - Valor igresado: ${input.value}`);
            valid=false;
        }
    }else{
        let msg="Campo Obligatorio";
        showMsgError(input,pError,msg); 
        almacenarError(msg);
        valid=false;       
    }
    return valid;
}

const validateForm = ()=> {        
    return (validateNumber(idFirstValue,idFirstValueMsgError) & validateNumber(idSecondValue,idSecondValueMsgError));
}

const help = ()=> {
}

const changeErrorResultColor =() =>{
    idOperation.style.color = "red";
    idOperationResult.style.color = "red";
}

const resetErrorResultColor =() =>{
    idOperationResult.style.color = "#00005b";
    idOperation.style.color = "grey";
}

const convertStringToNumber = (st) =>{
    let newValue = st.replace(".", "");
    newValue = Number(newValue.replace(",", "."));
    return newValue;
}

const convertNumberToString = (num) =>{

    if(num!=0)
    {
        var partes = num.split(".");
        var parteEntera = partes[0];
        var parteDecimal = partes[1] || "";
        parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parteEntera + (parteDecimal.length ? "," + parteDecimal : "");
    }
    else
        return  0;
   
}

const operate = (e) => {
    e.preventDefault();
    if(validateForm())
    {
        resetErrorResultColor();
        let value_a_str=idFirstValue.value;
        let value_b_str=idSecondValue.value;

        let value_a=convertStringToNumber(idFirstValue.value);
        let value_b=convertStringToNumber(idSecondValue.value);
       
        let resultado;
        let operation;
        switch (e.target.name) {
            case "add":  
                resultado=add(value_a,value_b);  
                operation= value_a_str + " + " + value_b_str;
                break;
            case "substract":    
                resultado=substract(value_a,value_b); 
                operation= value_a_str + " - " + value_b_str;            
                break;
            case "multiply":   
                resultado=multiply(value_a,value_b);  
                operation= value_a_str + " x " + value_b_str;            
                break;
            case "split":  
                if(value_b!=0)        
                    resultado=split(value_a,value_b);    
                else
                    {
                        changeErrorResultColor();
                        resultado="No se puede dividir por 0";
                        almacenarError(resultado + ` - Valores igresados: ${value_a_str} | ${value_b_str}`);
                    }
                operation= value_a_str + " ÷ " + value_b_str;
                break;
        }
        showResult(operation,resultado);
    }
    else
        showResult("Esperando operación",0);
}

const showMsgError = (htmlElement,htmlElementMsg, msg) => {
    cleanMsgError(htmlElement,htmlElementMsg);
    if(htmlElement)
        htmlElement.setAttribute('aria-invalid', 'true');
    htmlElementMsg.innerText = msg;
    htmlElementMsg.style.display = "block";
    validForm = false;
    htmlElementMsg.classList.remove("hidden");
    htmlElementMsg.classList.add("animation");
}

const cleanMsgError = (htmlElement,htmlElementMsg) => {
    if(htmlElement)
        htmlElement.setAttribute('aria-invalid', 'false');
    htmlElementMsg.innerText = "";
    htmlElementMsg.style.display = "none";
    htmlElementMsg.classList.remove("animation");
    htmlElementMsg.classList.add("hidden");
}

const showMsg = (e) => {
    e.preventDefault();
    let msg="<strong>Consideraciones:</strong><br><br>";

    msg=msg+"-Las operaciones permitidas son la <strong> Suma (+), Resta (-), Multiplicación (x) y División (/) </strong> <br><br>";
    msg=msg+"-Se permiten Números <strong>Positivos y Negativos</strong> y en caso de que los mismos sean escrito con separadores de miles y decimales, se deberá considerar como separador de miles (.) y de decimales (,); caso contrario recibira una alerta de error. <br><br>";
    msg=msg+"-No estan permitidas las <strong>divisiones por 0 </strong> <br><br>";
    msg=msg+"-El botón <strong>Reset</strong> solo resetea todos los valores menos el historial de errores. <br><br>";
    msg=msg+"-Los resultados se computan <strong>en 2 decimales</strong>.<br><br>";
    
    mostrarPopup(msg);
}

const almacenarError = (msg) => {
    nroError=++nroError;
    let errores=document.getElementById('idErrores');
    errores.innerHTML=`<strong>Error N° ${nroError}</strong> - ${msg}.<br>`  + errores.innerHTML; 
}
