/*-----------    VAR Elementos Visuales ---------------*/
var pantalla = document.getElementsByClassName("pantalla")[0];

/*-----------    VAR Humanos y su generación ---------------*/
var listaHumanos = [];
var seedHumanos;
var numId = 0;
var id = () => {
    numId==100?numId=0:0;
    numId++;
    return numId;
}

/*-----------    VAR Bombas y disparos ---------------*/
var numeroBombasEnElAire=0;
var numeroDisparosTotalesDisponibles = 2;
var velocidad = 1;

/*-----------    VAR Tutorial ---------------*/
var comprobanteFinalizacionTutorial=[false,false,false,false,false];

/*-----------    VAR Stats ---------------*/
var numVida = 100;
var hardcore=false;



/*-----------    VAR Movimiento Actualizado ---------------*/
//Para permitir el movimiento mientras se dispara, y que aunque no registre el keyDown siga moviendose hasta el keyUp
var movIzqActivo=false;
var intervaloIzq;
var movDerActivo=false;
var intervaloDer;
var movArrActivo=false;
var intervaloArr;
var movAbajActivo=false;
var intervaloAbaj;

/*-----------    Clases y constructores ---------------*/
class Humano{
    constructor(velocidad, fondoHaciaIzquierda, fondoHaciaDerecha, aparicion, div, idHumano){
        this.velocidad = velocidad;
        this.fondoHaciaIzquierda = fondoHaciaIzquierda;
        this.fondoHaciaDerecha = fondoHaciaDerecha;
        this.aparicion = aparicion;
        this.div = div;
        this.idHumano = idHumano;
        this.intervalo = 0;
    }
    darClase(){
        this.div.classList.add("humano");
    }
    obtenerDiv(){
        return this.div;
    }
    obtenerVelocidad(){
        return 100-this.velocidad;
    }
    establecerIntervaloMovimiento(intervalo){
        this.intervalo=intervalo;
    }
}

class Policia{
    constructor(velocidad, fondoHaciaIzquierda, fondoHaciaDerecha, aparicion, div, idHumano){  
        this.velocidad = velocidad;
        this.fondoHaciaIzquierda = fondoHaciaIzquierda;
        this.fondoHaciaDerecha = fondoHaciaDerecha;
        this.aparicion = aparicion;
        this.div = div;
        this.idHumano = idHumano;
        this.intervalo = 0;  
        this.intervaloDisparar = 0;
    }
    obtenerDiv(){
        return this.div;
    }
    obtenerVelocidad(){
        return 100-this.velocidad;
    }
    establecerIntervaloMovimiento(intervalo){
        this.intervalo=intervalo;
    }
    darClase(){
        this.div.classList.add("policia");
    }
    disparar(){
        this.intervaloDisparar = setInterval(() => {
            generarBalaDisparar(this.div, this.aparicion);
        }, randomIntFromInterval(800,1200));
    }
}
