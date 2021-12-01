/*-----------    PERSONAS (genérico) ---------------*/
function generacionHumanos(){
    seedHumanos = setInterval(() => {
        comprobarGenerarHumanos();
    }, 1000-((velocidad-1)*10)<=990?(velocidad-1)*10:990); //Para que no sea 0 nunca
}

function comprobarGenerarHumanos(){
    if(listaHumanos.length<velocidad+Number(10)){
        unHumanoNuevo();
    }
}
function unHumanoNuevo(){
    let rect = pantalla.getBoundingClientRect(); //TODO usar la velocidad y la aparicion
    let humano = tipoDeHumano();
    humano.darClase();
    humano.obtenerDiv().style.top=rect.bottom-80+"px";
    if(humano.aparicion==1){
        humano.obtenerDiv().style.left=rect.left+"px";
        humano.obtenerDiv().style.backgroundImage=humano.fondoHaciaDerecha;
    }else{
        humano.obtenerDiv().style.left=rect.right-Number(80)+"px";
        humano.obtenerDiv().style.backgroundImage=humano.fondoHaciaIzquierda;
    }
    pantalla.appendChild(humano.obtenerDiv());
    movimientoHumanos(humano);
}

function tipoDeHumano(){
    let numeroAleatorio = randomIntFromInterval(1,5);
    let humano;
    switch(numeroAleatorio){
        case 1:
            humano = new Humano(randomIntFromInterval(45,65),"url(../img/humano/caminante.png","url(../img/humano/caminante2.png",randomIntFromInterval(1,2),document.createElement("div"), id());
            break;
        case 2:
            humano = new Humano(randomIntFromInterval(35,45),"url(../img/humano/chicaTriste.png","url(../img/humano/chicaTriste2.png",randomIntFromInterval(1,2),document.createElement("div"),id());
            break;
        case 3:
            humano = new Humano(randomIntFromInterval(75,80),"url(../img/humano/corredor.png","url(../img/humano/corredor2.png",randomIntFromInterval(1,2),document.createElement("div"),id());
            break;
        case 4:
            humano = new Humano(randomIntFromInterval(45,55),"url(../img/humano/caminante.png","url(../img/humano/caminante2.png",randomIntFromInterval(1,2),document.createElement("div"),id());
            break;
        case 5:
            humano = new Policia(randomIntFromInterval(45,55),"url(../img/humano/policia.png","url(../img/humano/policia2.png",randomIntFromInterval(1,2),document.createElement("div"),id());
            humano.disparar();
            break;    
    }
    listaHumanos.push(humano);
    return humano;
}

function movimientoHumanos(humano){
    if(humano.aparicion==1){
        movimientoDerechaHumano(humano);
    }else{
        movimientoIzquierdaHumano(humano);
    }
    
}

function movimientoDerechaHumano(humano){
    let rect = pantalla.getBoundingClientRect();
    humano.establecerIntervaloMovimiento(setInterval(() => {
        humano.obtenerDiv().style.left=(parseInt(humano.obtenerDiv().style.left)+Number(5)) + "px";
        if((parseInt(humano.obtenerDiv().style.left)>rect.right-Number(40))){
            clearInterval(humano.intervalo);
            escapar(humano);
        }
    }, humano.obtenerVelocidad()));
}

function movimientoIzquierdaHumano(humano){
    let rect = pantalla.getBoundingClientRect();
    humano.establecerIntervaloMovimiento(setInterval(() => {
        humano.obtenerDiv().style.left=(parseInt(humano.obtenerDiv().style.left)-Number(5)) + "px";
        if(parseInt(humano.obtenerDiv().style.left)<rect.left){
            clearInterval(humano.intervalo);
            escapar(humano);
        }
    },  humano.obtenerVelocidad()));
}


function escapar(humano){
    humano.obtenerDiv().remove();
    delete humano;
    for(var i = 0; i < listaHumanos.length; i++) {
        if (listaHumanos[i].idHumano == humano.idHumano) {
            listaHumanos.splice(i,1);
            break;
        }
    }
    if(humano instanceof Policia){
        clearInterval(humano.intervaloDisparar);
    }
    disminuirPuntuacion()
}

/*-----------    POLICIA ---------------*/

function generarBalaDisparar(div, aparacion){
    let bala = document.createElement("div");
    bala.classList.add("bala");
    bala.style.left=parseInt(div.style.left)+"px";
    bala.style.top=parseInt(div.style.top)+"px";
    pantalla.appendChild(bala);
    if(aparacion==1){
        movimientoDiagonalHaciaDerecha(bala);
        bala.classList.add("imagenBalaHaciaDerecha");
    }else{
        movimientoDiagonalHaciaIzquierda(bala);
        bala.classList.add("imagenBalaHaciaIzquierda");
    }
}

function movimientoDiagonalHaciaIzquierda(bala){
    let rect = pantalla.getBoundingClientRect();
    let intervalo;
    
    intervalo=setInterval(() => {
        bala.style.top=(parseInt(bala.style.top)-Number(10)) + "px";
        bala.style.left=(parseInt(bala.style.left)-Number(10)) + "px";
        golpeoDisparoNave(bala, intervalo);
        if((parseInt(bala.style.left)<rect.left) || (parseInt(bala.style.top)<rect.top)){
            bala.remove();
            clearInterval(intervalo);
        }
    }, 20);
        
}

function movimientoDiagonalHaciaDerecha(bala){
    let rect = pantalla.getBoundingClientRect();
    let intervalo;
    
    intervalo=setInterval(() => {
        bala.style.top=(parseInt(bala.style.top)-Number(10)) + "px";
        bala.style.left=(parseInt(bala.style.left)+Number(10)) + "px";
        golpeoDisparoNave(bala, intervalo);
        if((parseInt(bala.style.left)>rect.right) || (parseInt(bala.style.top)<rect.top)){
            bala.remove();
            clearInterval(intervalo);
        }
    }, 20);
}

function explotarBala(bala, intervalo){
    bala.style.backgroundImage = "url(../img/bomba/Explosion.png)";  
    bala.style.zIndex = "4";  
    clearInterval(intervalo);
    setTimeout(() => {
        bala.remove();
    }, 300);
}
