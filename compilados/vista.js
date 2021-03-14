"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// include the ipc module to communicate with main process.
var electron_1 = require("electron");
var constantes_1 = require("./constantes");
var Coordenadas_1 = require("./Coordenadas");
var o_parrafo1 = document.getElementById('idParrafo1');
var o_tablero = document.getElementById('idTablero');
var boton_exportaArchivo = document.getElementById('idBotonExportarArchivo');
var boton_importaBD = document.getElementById('idBotonImportarBD');
var boton_exportaBD = document.getElementById('idBotonExportarBD');
var boton_importaArchivo = document.getElementById('idBotonImportarArchivo');
electron_1.ipcRenderer.on('actualizaPanelMensajes', function (evento1, mensaje) {
    o_parrafo1.innerHTML = mensaje;
});
electron_1.ipcRenderer.on('marcaColorCasillaJugador', function (evento2, objetoCoordenada, jugador) {
    var coordenadas = new Coordenadas_1.Coordenadas(objetoCoordenada); //objetoCoordenada['i_x'], objetoCoordenada['i_y']
    var casilla = document.getElementById('idCasilla_' + coordenadas.getI_x() + '_' + coordenadas.getI_y());
    var micolor = 'lightgray'; //caso 0
    switch (jugador) {
        case 1:
            micolor = 'green';
            break;
        case 2:
            micolor = 'red';
            break;
        default:
    }
    casilla.style.backgroundColor = micolor;
});
function clicExportarAarchivo() {
    electron_1.ipcRenderer.send('eventoExportarAarchivo');
}
function clicImportarBD() {
    electron_1.ipcRenderer.send('eventoImportarBD');
}
function clicExportarBD() {
    electron_1.ipcRenderer.send('eventoExportarAbd');
}
function clicImportarAarchivo() {
    electron_1.ipcRenderer.send('eventoImportarArchivo');
}
boton_exportaArchivo.addEventListener('click', clicExportarAarchivo);
boton_importaBD.addEventListener('click', clicImportarBD);
boton_exportaBD.addEventListener('click', clicExportarBD);
boton_importaArchivo.addEventListener('click', clicImportarAarchivo);
//La misma función de abajo, pero en TypeScript
function funcionClicCasilla(oc) {
    electron_1.ipcRenderer.send('seleccionCasilla', oc);
}
function creaTableroTs() {
    var i = 0;
    while (i < constantes_1.ALTO) {
        var o_fila = document.createElement('DIV');
        o_fila.id = 'idFila_' + i;
        o_tablero.appendChild(o_fila);
        var j = 0;
        var _loop_1 = function () {
            var o_casilla = document.createElement('BUTTON');
            var o_botonCasilla = void 0;
            try {
                o_botonCasilla = o_casilla;
                o_botonCasilla.className = 'caja';
                var objetoCoordenada_1 = { i_x: i, i_y: j };
                o_botonCasilla.onclick = function () { funcionClicCasilla(objetoCoordenada_1); };
                o_botonCasilla.id = 'idCasilla_' + i + '_' + j;
                o_fila.appendChild(o_botonCasilla);
            }
            catch (err1) {
                console.error('Error tal: ' + err1.message);
            }
            ;
            j++;
        };
        while (j < constantes_1.ANCHO) {
            _loop_1();
        }
        i++;
    }
}
creaTableroTs();
//función **JavaScript** para crear el tablero
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
//# sourceMappingURL=vista.js.map