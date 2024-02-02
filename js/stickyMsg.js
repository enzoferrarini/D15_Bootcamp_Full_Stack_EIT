const showStickyMsg = (msg) => {
    let idMsgSticky=document.getElementById("idMsgSticky");
    idMsgSticky.innerHTML=msg;
    let mensajeFlotante = document.getElementById('mensajeFlotante');
    mensajeFlotante.classList.add('mostrar');

    // Establece un temporizador para ocultar el mensaje después de 7 segundos (ajustable)
    setTimeout(function () {
        hdieStickyMsg();
    }, 4000);
}

const hdieStickyMsg = () => {
    var mensajeFlotante = document.getElementById('mensajeFlotante');
    mensajeFlotante.classList.remove('mostrar');   
}


const mostrarPopup=(msgInit)=> {
    let idPopupMsg = document.getElementById('idPopupMsg');
    idPopupMsg.innerHTML=msgInit;
    let popup = document.getElementById('popup');
    popup.style.display = 'flex';
}

const ocultarPopup = () => {
    let idPopupMsg = document.getElementById('idPopupMsg');
    idPopupMsg.innerHTML="";
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}
