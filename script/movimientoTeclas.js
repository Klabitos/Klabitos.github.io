document.body.addEventListener("keyup", comprobanteTeclaLevantar);

function comprobanteTecla(evento){
    comprobarMovimiento(evento);
    comprobarBomba(evento);
    if(evento.keyCode==17){//control izq
        deBugMovimiento();
    }
}

function deBugMovimiento(){ //No se si funciona aun
    movIzqActivo=false;
    movDerActivo=false;
    movArrActivo=false;
    movAbajActivo=false;
    clearInterval(intervaloIzq);
    clearInterval(intervaloDer);
    clearInterval(intervaloArr);
    clearInterval(intervaloAbaj);
}

function comprobanteTeclaLevantar(evento){
    switch(evento.key.toLowerCase()){
        case "w":
            movArrActivo=false;
            break;
        case "a":
            movIzqActivo=false;
            break;
        case "s":
            movAbajActivo=false;
            break;
        case "d":
            movDerActivo=false;
            break;
    }
}

function comprobarMovimiento(evento){
    switch(evento.key.toLowerCase()){
        case "w":
            movimientoArriba();
            comprobarChoqueSuelo();
            break;
        case "a":
            movimientoIzq();
            comprobarChoqueSuelo();
            break;
        case "s":
            movimientoAbajo();
            comprobarChoqueSuelo();
            break;
        case "d":
            movimientoDerecha();
            comprobarChoqueSuelo();
            break;
    }
    hardcore?generacionHumanos():0;
}



function comprobarBomba(evento){
    if(evento.keyCode=="32"){
        generarBomba();
    }
}

function movimientoIzq(){
    let cuadradoQueSeMueve = document.getElementsByClassName("cuadradoPrueba")[0];   
    let rect = pantalla.getBoundingClientRect(); //PARA QUE SEA RELATIVO A LA VISTA
    if(!movIzqActivo){ //Para que solo entre una vez con cada primer keydown
        movIzqActivo=true;
        intervaloIzq=setInterval(() => {
            if(parseInt(cuadradoQueSeMueve.style.left)<parseInt(rect.left)+Number(20)){ //Para que no se pase del limite de nuestra pantalla
                cuadradoQueSeMueve.style.left=rect.left+"px";
            }else{
                cuadradoQueSeMueve.style.left = (parseInt(cuadradoQueSeMueve.style.left) - 20) + "px"; //Se mueve si no se va a ir fuera
            }
            if(!movIzqActivo){
                clearInterval(intervaloIzq);
            }
        }, 35);
    }
}

function movimientoDerecha(){
    let cuadradoQueSeMueve = document.getElementsByClassName("cuadradoPrueba")[0];  
    let rect = pantalla.getBoundingClientRect();
    if(!movDerActivo){ //Para que solo entre una vez con cada primer keydown
        movDerActivo=true;
        intervaloDer=setInterval(() => {
            if(parseInt(cuadradoQueSeMueve.style.left)>parseInt(rect.right)-Number(120)){ //Para que no se pase del limite de nuestra pantalla
                cuadradoQueSeMueve.style.left=rect.right-Number(100)+"px";
            }else{
                cuadradoQueSeMueve.style.left = (parseInt(cuadradoQueSeMueve.style.left) + 20) + "px"; //Se mueve si no se va a ir fuera
            }
            if(!movDerActivo){
                clearInterval(intervaloDer);
            }
        }, 35);
    }
}

function movimientoArriba(){
    let cuadradoQueSeMueve = document.getElementsByClassName("cuadradoPrueba")[0];  
    let rect = pantalla.getBoundingClientRect();
    if(!movArrActivo){ //Para que solo entre una vez
        movArrActivo=true;
        intervaloArr=setInterval(() => {
            if(parseInt(cuadradoQueSeMueve.style.top)<parseInt(rect.top)+Number(10)){ //Para que no se pase del limite de nuestra pantalla
                cuadradoQueSeMueve.style.top=rect.top-Number(5)+"px";
            }else{
                cuadradoQueSeMueve.style.top = (parseInt(cuadradoQueSeMueve.style.top) - 20) + "px"; //Se mueve si no se va a ir fuera
            }
            if(!movArrActivo){
                clearInterval(intervaloArr);
            }
        }, 35);
    }
}

function movimientoAbajo(){
    let cuadradoQueSeMueve = document.getElementsByClassName("cuadradoPrueba")[0];  
    let rect = pantalla.getBoundingClientRect();
    if(!movAbajActivo){ //Para que solo entre una vez
        movAbajActivo=true;
        intervaloAbaj=setInterval(() => {
            if(parseInt(cuadradoQueSeMueve.style.top)>parseInt(rect.bottom)-Number(130)){ //Para que no se pase del limite de nuestra pantalla
                cuadradoQueSeMueve.style.top=rect.bottom-Number(80)+"px";
            }else{
                cuadradoQueSeMueve.style.top = (parseInt(cuadradoQueSeMueve.style.top) + 20) + "px";
            }
            if(!movAbajActivo){
                clearInterval(intervaloAbaj);
            }
        }, 35);
    }
}

