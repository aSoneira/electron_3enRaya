import {ipcMain, app, BrowserWindow } from 'electron';
import * as ruta from 'path';
import { guardarEnArchivo, leerArchivo } from './archivos';
import { dameUnaPartidaGuardadaBD, guardaPartidaEnBD } from './basedatos';
import { ALTO, ANCHO } from './constantes';
import { Coordenadas } from './Coordenadas';
import { TresEnRaya } from './TresEnRaya';

let paginaPrincipal1: Electron.BrowserWindow;
let application: Electron.App = app;
let s_mensaje : void | string;
let tresEnRaya: TresEnRaya = new TresEnRaya();

function createWindow ():void {
  paginaPrincipal1 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
	});
	const rutaPaginaPrincipal:string = ruta.resolve('principal.html');
	paginaPrincipal1.loadFile(rutaPaginaPrincipal);
	tresEnRaya.inicializar();
  	paginaPrincipal1.on('closed', function ():void {
    	paginaPrincipal1 = null;		
  	});
}

application.on('ready', createWindow);

application.on('window-all-closed', function ():void {
  if (process.platform !== 'darwin') application.quit();
});

application.on('activate', function ():void {
  if (paginaPrincipal1 === null) createWindow();
});

function actualizarVistaAlCargarPartida(evento:Electron.IpcMainEvent){
	let lli_tablero : number[][] = tresEnRaya.getLli_tablero();
	let i : number = 0;
	while(i<ALTO){
		let j : number = 0;
		while(j<ANCHO){
			let i_jug : number = lli_tablero[i][j];
			let co : Object = {i_x:i,i_y:j};
			evento.sender.send('marcaColorCasillaJugador',co,i_jug);
			j++;
		}
		i++;
	}
}

ipcMain.on('eventoExportarAarchivo',function(evento3enRaya:Electron.IpcMainEvent){
	let s_estadoTablero : string = tresEnRaya.darTableroEnFormatoStringJSON();
	guardarEnArchivo(s_estadoTablero)
	.then(()=>{
		evento3enRaya.sender.send('actualizaPanelMensajes','se guardó con exito');
	})
	.catch(()=>{
		evento3enRaya.sender.send('actualizaPanelMensajes','error al guardar');
	});	
});

ipcMain.on('eventoImportarBD',function(evento3enRaya:Electron.IpcMainEvent){
	dameUnaPartidaGuardadaBD()
	.then((filas)=>{
		if(filas!=null && filas.length>0){
			let s_estadoTablero : string = filas[0]['estado_tablero'];
			tresEnRaya.cargarTableroDesdeStringJSON(s_estadoTablero);
			evento3enRaya.sender.send('actualizaPanelMensajes','se cargo con exito');
			actualizarVistaAlCargarPartida(evento3enRaya);
		}		
		else{
			evento3enRaya.sender.send('actualizaPanelMensajes','no hay partidas guardadas en BD');
		}
	})
	.catch(()=>{
		evento3enRaya.sender.send('actualizaPanelMensajes','error al guardar');
	});	
});

ipcMain.on('eventoExportarAbd',function(evento3enRaya:Electron.IpcMainEvent){
	let s_estadoTablero : string = tresEnRaya.darTableroEnFormatoStringJSON();
	guardaPartidaEnBD(s_estadoTablero)
	.then(()=>{
		evento3enRaya.sender.send('actualizaPanelMensajes','se guardó con exito');
	})
	.catch(()=>{
		evento3enRaya.sender.send('actualizaPanelMensajes','error al guardar');
	});	
});

ipcMain.on('eventoImportarArchivo',function(evento3enRaya:Electron.IpcMainEvent){
	leerArchivo()
	.then((s_estadoTablero:string)=>{
		tresEnRaya.cargarTableroDesdeStringJSON(s_estadoTablero);
		evento3enRaya.sender.send('actualizaPanelMensajes','se cargo con exito');
		actualizarVistaAlCargarPartida(evento3enRaya);
	})
	.catch(()=>{
		evento3enRaya.sender.send('actualizaPanelMensajes','error al guardar');
	});	
});

ipcMain.on('seleccionCasilla', function(evento3enRaya:Electron.IpcMainEvent, co:Object){
	let coordenada:Coordenadas = new Coordenadas(co);
	if(tresEnRaya.intentaPonerFicha(coordenada,1)){
		evento3enRaya.sender.send('marcaColorCasillaJugador',co,1);

		if(!tresEnRaya.isB_partidaTerminada()){
			let coordenadaAleatoria:Coordenadas = tresEnRaya.daCasillaLibreAzar();
			if(tresEnRaya.intentaPonerFicha(coordenadaAleatoria,2)){
				evento3enRaya.sender.send('marcaColorCasillaJugador',coordenadaAleatoria,2);
			}else{
				evento3enRaya.sender.send('actualizaPanelMensajes','error del modelo');
			}
		}
	}else{
		evento3enRaya.sender.send('actualizaPanelMensajes','casilla ya seleccionada');
	}
	//evento3enRaya.sender.send('actualizaPanelMensajes','manda algo');

	
});



ipcMain.on('llamaBuscaPalabraMasLarga',function (evento1:Electron.IpcMainEvent, s_texto : string):void {
	let s_masLarga :string = '';
	console.log(s_texto);

	//Aquí se calcula la palabra más larga
	if(s_texto){
		let ls_palabras : string[] = s_texto.split(' ');		
		ls_palabras.forEach((s_palabra)=>{
			if(s_palabra.length>s_masLarga.length)s_masLarga=s_palabra;
		});
	}

	//Proceso para mandar al modelo cual es la palabra más larga
	console.log(s_masLarga);
	if(s_masLarga!=''){
		evento1.sender.send('actualizaPanelMensajes','la palabra mas larga es: '+s_masLarga);
	}
	else{
		evento1.sender.send('actualizaPanelMensajes','el texto esta vacio');
	}
});
