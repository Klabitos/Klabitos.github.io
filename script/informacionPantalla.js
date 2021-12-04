/*-----------    Listeners ---------------*/
document.body.addEventListener("load", generarBarraVida()); // () para que lo haga instant
document.body.addEventListener("load", generarTutorial());
document.body.addEventListener("load", generarNave());
document.body.addEventListener("keydown", tutorialCheck);
document.getElementById("extremo").addEventListener("click", activarHardcore);
document.getElementById("debug").addEventListener("click", explotarNaveGenerarNueva);
/*----------------------------------------*/

/*-----------    NAVE ---------------*/
function generarNave(){
    let nave = document.createElement("div");
    nave.classList.add("cuadradoPrueba");
    nave.style.left=window.screen.availWidth/2+"px";
    nave.style.top=window.screen.availHeight/2+"px";
    pantalla.append(nave);
    pantalla.focus();
}

/*-----------    VIDA ---------------*/
function generarBarraVida(){
    let elementoContenedor = document.getElementById("vidas");
    let divCreado;
    let h2Creado;
    for(let i=0; i<numVida; i++){
        divCreado=document.createElement("div");
        divCreado.classList.add("vida");
        divCreado.classList.add("vidaStandard");
        divCreado.innerHTML="&nbsp;";
        elementoContenedor.append(divCreado);
        if(i==numVida/2){
            h2Creado=document.createElement("p");
            h2Creado.innerHTML="HP";
            h2Creado.classList.add("hp");
            divCreado.append(h2Creado);
        }
        if(i==numVida-1){
            divCreado.classList.add("ultimaVida");
        }else if(i==0){
            divCreado.classList.add("primeraVida");
        }
    }
}
function disminuirVida(){
    let todaLaVidaVerde = document.querySelectorAll(".vidaStandard");
    todaLaVidaVerde[todaLaVidaVerde.length-1].classList.replace("vidaStandard", "vidaPerdida");
    comprobarDerrota();
}
function disminuirVidaBalazo(valorVidaPerdida){
    let todaLaVidaVerde = document.querySelectorAll(".vidaStandard");
    for(let i=0; i<valorVidaPerdida; i++){
        todaLaVidaVerde[todaLaVidaVerde.length-1].classList.replace("vidaStandard", "vidaPerdida");
    }
    comprobarDerrota();
}

function comprobarDerrota(){
    let todaLaVidaRoja = document.querySelectorAll(".vidaPerdida");
    if(todaLaVidaRoja.length==numVida){
        alert("Has perdido");
        location.reload(); 
    }
}

/*-----------    debugger MOVIMIENTO ---------------*/
function explotarNaveGenerarNueva(){
    let cuadradoQueSeMueve = document.getElementsByClassName("cuadradoPrueba")[0];  
    cuadradoQueSeMueve.style.backgroundImage = "url(../img/bomba/Explosion.png)";    
    setTimeout(() => {
        cuadradoQueSeMueve.style.opacity="0.5";
    }, 200);
    setTimeout(() => {
        cuadradoQueSeMueve.style.opacity="0";
    }, 400);
    setTimeout(() => {
        cuadradoQueSeMueve.remove();
        generarNave();
        this.blur();
    }, 300);
    
}

/*-----------    VISUAL || STATS---------------*/

function tripleKillAndSo(kills){
    let textoEnPantalla = document.getElementById("kills");
    
    switch(kills){
        case 1:
            textoEnPantalla.innerText="Kill";
            textoEnPantalla.className="kill";
            break;
        case 2:
            textoEnPantalla.innerText="Double Kill!";
            textoEnPantalla.className="dobleKill";
            break;
        case 3:
            textoEnPantalla.innerText="TRIPLE KILL!";
            textoEnPantalla.className="tripleKill";
            aumentoVelocidad();
            break;
        case 4:
            textoEnPantalla.innerText="¡CUADRA KILL!";
            textoEnPantalla.className="cuadraKill";
            aumentoVelocidad();
            aumentarBalasDisponibles();
            break;
    }
}
function aumentarBalasDisponibles(){
    let numeroDisparosDisponibles = document.getElementById("balas");
    numeroDisparosTotalesDisponibles++;
    numeroDisparosDisponibles.innerText=numeroDisparosTotalesDisponibles;
}

function aumentoVelocidad(){
    let velocidadPantalla = document.getElementById("velocidad");
    velocidad++;
    velocidadPantalla.innerText=velocidad;
}

function aumentarPuntuacionUnMuerto(){
    let puntuacionSpan = document.getElementById("puntuacion");
    let puntuacionNumero = parseInt(puntuacionSpan.innerText);
    puntuacionSpan.innerText=puntuacionNumero+Number(100); 
    if(parseInt(puntuacionSpan.innerText)%1000==0){
        aumentoVelocidad();
    }   
}

function disminuirPuntuacion(){
    let textoEnPantalla = document.getElementById("kills");
    let puntuacionSpan = document.getElementById("puntuacion");
    let puntuacionNumero = parseInt(puntuacionSpan.innerText);
    textoEnPantalla.innerText="Escapado";
    textoEnPantalla.className="escapado";
    disminuirVida();
    puntuacionSpan.innerText=puntuacionNumero-Number(50);   
}

function activarHardcore(){
    let botonExtremo = document.getElementById("extremo");
    hardcore=true;
    botonExtremo.innerText="EXTREMO ACTIVO";
    botonExtremo.classList.add("fondoRojo");
    this.blur;
}

/*-----------    TUTORIAL---------------*/
function generarTutorial(){
    let divParrafoIntroductorio = document.createElement("div");
    let bienvenidos = document.createElement("h2");
    let texto = document.createElement("h3");
    divParrafoIntroductorio.classList.add("parrafoTutorial");
    bienvenidos.textContent="Bienvenido, para comenzar a jugar prueba los controles: \n"
    texto.innerHTML="<span id=A>-A izquierda</span> <br>";
    texto.innerHTML+="<span id=D>-D derecha</span> <br>";
    texto.innerHTML+="<span id=S>-S abajo </span><br>";
    texto.innerHTML+="<span id=W>-W arriba</span> <br>";
    texto.innerHTML+="<span id=Space>-Space disparar</span> <br>";
    pantalla.appendChild(divParrafoIntroductorio);
    divParrafoIntroductorio.appendChild(bienvenidos);
    divParrafoIntroductorio.appendChild(texto);
}
function tutorialCheck(evento){
    switch(evento.key.toLowerCase()){
        case "w":
            movimientoArriba();
            W_check()
            break;
        case "a":
            movimientoIzq();
            A_check()
            break;
        case "s":
            movimientoAbajo();
            S_check()
            break;
        case "d":
            movimientoDerecha();
            D_check()
            break;
    }
    if(evento.keyCode==32){
        Space_check();
        generarBomba();
    }
    comprobarFinTutorial();
    
}

function A_check(){
    comprobanteFinalizacionTutorial[0]=true;
    let texto=document.getElementById("A");
    texto.classList.add("azul");
}
function D_check(){
    comprobanteFinalizacionTutorial[1]=true;
    let texto=document.getElementById("D");
    texto.classList.add("azul");
}
function S_check(){
    comprobanteFinalizacionTutorial[2]=true;
    let texto=document.getElementById("S");
    texto.classList.add("azul");
}
function W_check(){
    comprobanteFinalizacionTutorial[3]=true;
    let texto=document.getElementById("W");
    texto.classList.add("azul");
}
function Space_check(){
    comprobanteFinalizacionTutorial[4]=true;
    let texto=document.getElementById("Space");
    texto.classList.add("azul");
}

function comprobarFinTutorial(){
    let parrafoTutorial = document.getElementsByClassName("parrafoTutorial")[0];
    for(let i=0; i<comprobanteFinalizacionTutorial.length; i++){
        if(!comprobanteFinalizacionTutorial[i]){
            return;
        }
    }
    document.body.addEventListener("keydown", comprobanteTecla);
    document.body.removeEventListener("keydown", tutorialCheck);
    parrafoTutorial.remove();
    generacionHumanos(); //creo que se ejecuta la generacion muchisimas veces lo que hace que sea tan divertido
}