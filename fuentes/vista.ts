// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// include the ipc module to communicate with main process.
import {ipcRenderer} from 'electron';
import { ALTO, ANCHO, COLOR_0, COLOR_JUGADOR_1, COLOR_JUGADOR_2 } from './constantes';
import { Coordenadas } from './Coordenadas';

let o_parrafo1 : HTMLElement = document.getElementById('idParrafo1');
let o_tablero: HTMLElement = document.getElementById('idTablero');
let boton_exportaArchivo: HTMLElement = document.getElementById('idBotonExportarArchivo');
let boton_importaBD: HTMLElement = document.getElementById('idBotonImportarBD');
let boton_exportaBD: HTMLElement = document.getElementById('idBotonExportarBD');
let boton_importaArchivo: HTMLElement = document.getElementById('idBotonImportarArchivo');
let boton_reiniciarPartida: HTMLElement = document.getElementById('idBotonReiniciar');

ipcRenderer.on('actualizaPanelMensajes', function (evento1:Electron.Event, mensaje:string):void { 
    o_parrafo1.innerHTML=mensaje;
});

ipcRenderer.on('marcaColorCasillaJugador', function(evento2:Electron.Event, objetoCoordenada:Object, jugador:number):void{    
    let coordenadas : Coordenadas = new Coordenadas(objetoCoordenada);//objetoCoordenada['i_x'], objetoCoordenada['i_y']
    let casilla:HTMLElement = document.getElementById('idCasilla_'+coordenadas.getI_x()+'_'+coordenadas.getI_y());
    let micolor : string = COLOR_0;//caso 0

    switch(jugador){
        case 1:
            micolor=COLOR_JUGADOR_1;
            break;
        case 2:
            micolor=COLOR_JUGADOR_2;
            break;
        default:
    }
    casilla.style.backgroundColor=micolor;    
});

ipcRenderer.on('desmarcaCasillas', function(evento:Electron.Event):void{
    o_tablero.innerHTML = "";
    creaTableroTs();
})


function clicExportarAarchivo(){
    ipcRenderer.send('eventoExportarAarchivo');
}
function clicImportarBD(){
    ipcRenderer.send('eventoImportarBD');
}
function clicExportarBD(){
    ipcRenderer.send('eventoExportarAbd');
}
function clicImportarAarchivo(){
    ipcRenderer.send('eventoImportarArchivo');
}
function clicReiniciarPartida(){
    ipcRenderer.send('eventoReiniciarPartida');
}

boton_exportaArchivo.addEventListener('click',clicExportarAarchivo);
boton_importaBD.addEventListener('click',clicImportarBD);
boton_exportaBD.addEventListener('click',clicExportarBD);
boton_importaArchivo.addEventListener('click',clicImportarAarchivo);
boton_reiniciarPartida.addEventListener('click',clicReiniciarPartida);

//La misma funci??n de abajo, pero en TypeScript

function funcionClicCasilla(oc:Object) {
    ipcRenderer.send('seleccionCasilla', oc);
}


function creaTableroTs():void {
    let i:number = 0;
    while(i<ALTO){
        let o_fila:HTMLElement = document.createElement('DIV');
        o_fila.id='idFila_'+i;
        o_tablero.appendChild(o_fila);
        
        let j:number=0;
        while(j<ANCHO){
            let o_casilla:HTMLElement = document.createElement('BUTTON');
            let o_botonCasilla:HTMLButtonElement;

            try{
                o_botonCasilla = <HTMLButtonElement> o_casilla;
                o_botonCasilla.className = 'caja';

                let objetoCoordenada:Object = {i_x:i,i_y:j};
                o_botonCasilla.onclick = () => {funcionClicCasilla(objetoCoordenada)};

                o_botonCasilla.id = 'idCasilla_'+i+'_'+j;
                o_fila.appendChild(o_botonCasilla);

            }catch(err1:any){console.error('Error tal: '+err1.message)};
            j++;
        }
        i++;
    }
}

creaTableroTs();

//funci??n **JavaScript** para crear el tablero
/* function creaTablero() {  
	const alto=3;
	const ancho=3;	
  var tablero = document.getElementById('idTablero');
  var i = 0;
  while(i<3){
	var fila = document.createElement('div');
	fila.id='idFila'+i;
    tablero.appendChild(fila);
  	var j = 0;
    while(j<3){
    	var casilla = document.createElement('BUTTON');
		casilla.x=i;casilla.y=j;
        casilla.className='caja1';
		casilla.onclick=function(){intelArtificial(this.x,this.y)};
		casilla.id='idCasilla'+i+''+j;
        fila.appendChild(casilla);
		casillasLibres.push({'x':i,'y':j});
    	j++;
    }
  	i++;
  }
} */

