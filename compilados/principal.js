"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var ruta = require("path");
var archivos_1 = require("./archivos");
var Coordenadas_1 = require("./Coordenadas");
var TresEnRaya_1 = require("./TresEnRaya");
var paginaPrincipal1;
var application = electron_1.app;
var s_mensaje;
var tresEnRaya = new TresEnRaya_1.TresEnRaya();
function createWindow() {
    paginaPrincipal1 = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    var rutaPaginaPrincipal = ruta.resolve('principal.html');
    paginaPrincipal1.loadFile(rutaPaginaPrincipal);
    tresEnRaya.inicializar();
    paginaPrincipal1.on('closed', function () {
        paginaPrincipal1 = null;
    });
}
application.on('ready', createWindow);
application.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        application.quit();
});
application.on('activate', function () {
    if (paginaPrincipal1 === null)
        createWindow();
});
electron_1.ipcMain.on('eventoExportarAarchivo', function (evento3enRaya) {
    var s_estadoTablero = tresEnRaya.darTableroEnFormatoStringJSON();
    archivos_1.guardarEnArchivo(s_estadoTablero)
        .then(function () {
        evento3enRaya.sender.send('actualizaPanelMensajes', 'se guardó con exito');
    })
        .catch(function () {
        evento3enRaya.sender.send('actualizaPanelMensajes', 'error al guardar');
    });
});
electron_1.ipcMain.on('seleccionCasilla', function (evento3enRaya, co) {
    var coordenada = new Coordenadas_1.Coordenadas(co);
    if (tresEnRaya.intentaPonerFicha(coordenada, 1)) {
        evento3enRaya.sender.send('marcaColorCasillaJugador', co, 1);
        if (!tresEnRaya.isB_partidaTerminada()) {
            var coordenadaAleatoria = tresEnRaya.daCasillaLibreAzar();
            if (tresEnRaya.intentaPonerFicha(coordenadaAleatoria, 2)) {
                evento3enRaya.sender.send('marcaColorCasillaJugador', coordenadaAleatoria, 2);
            }
            else {
                evento3enRaya.sender.send('actualizaPanelMensajes', 'error del modelo');
            }
        }
    }
    else {
        evento3enRaya.sender.send('actualizaPanelMensajes', 'casilla ya seleccionada');
    }
    //evento3enRaya.sender.send('actualizaPanelMensajes','manda algo');
});
electron_1.ipcMain.on('llamaBuscaPalabraMasLarga', function (evento1, s_texto) {
    var s_masLarga = '';
    console.log(s_texto);
    //Aquí se calcula la palabra más larga
    if (s_texto) {
        var ls_palabras = s_texto.split(' ');
        ls_palabras.forEach(function (s_palabra) {
            if (s_palabra.length > s_masLarga.length)
                s_masLarga = s_palabra;
        });
    }
    //Proceso para mandar al modelo cual es la palabra más larga
    console.log(s_masLarga);
    if (s_masLarga != '') {
        evento1.sender.send('actualizaPanelMensajes', 'la palabra mas larga es: ' + s_masLarga);
    }
    else {
        evento1.sender.send('actualizaPanelMensajes', 'el texto esta vacio');
    }
});
//# sourceMappingURL=principal.js.map