import * as sistemaArchivos from 'fs';
import { dialog } from 'electron';

export function leerArchivo():Promise<string>{
	let s_error1:string;
	return new Promise(function(resolver:Function, rechazar:Function){
		//'openDirectory', 'multiSelections'
		dialog.showOpenDialog({ properties: ['openFile'] },(ls_rutasArchivos:string[]) => {
			//rutasArchivos es la lista de archivos seleccionados
			if(ls_rutasArchivos === undefined){
				s_error1='No ha seleccionado ninguno archivo';
				console.log(s_error1);
				rechazar(s_error1);
			}
			else{
				let s_rutaArchivo : string = ls_rutasArchivos[0];//solo coge el primer archivo seleccionado
				console.log(s_rutaArchivo);
				try{
					let s_crudo = sistemaArchivos.readFileSync(s_rutaArchivo);//el string de datos en crudo
                    resolver(s_crudo);
				}catch(s_error1){
					rechazar(s_error1);
				}								
			}
		});
	});	
}

export async function guardarEnArchivo(s_crudo:string):Promise<string>{
	let s_error1:string;
	return new Promise(async function(resolver:Function, rechazar:Function){
		//'openDirectory', 'multiSelections'
		dialog.showOpenDialog({ properties: ['openFile'] },async function(ls_rutasArchivos:string[]) {
			//rutasArchivos es la lista de archivos seleccionados
			if(ls_rutasArchivos === undefined){
				s_error1='No ha seleccionado ninguno archivo';
				console.log(s_error1);
				rechazar(s_error1);
			}
			else{
				let s_rutaArchivo : string = ls_rutasArchivos[0];//solo coge el primer archivo seleccionado
				console.log(s_rutaArchivo);
				try{
					await f_aEscribeArchivoAsync(s_crudo,s_rutaArchivo);
                    resolver(s_crudo);
				}catch(s_error1){
					rechazar(s_error1);
				}								
			}
		});
	});	
}

async function f_aEscribeArchivoAsync(s_linea:string, s_ruta:string) : Promise<boolean>{
	return new Promise(
		function(
			resolver : ((b_resultado: boolean | PromiseLike<boolean>) => void), 
			rechazar:((razon?: any) => void)
		):void{

			sistemaArchivos.writeFile(s_ruta, s_linea, function(e_e1 : NodeJS.ErrnoException):void {
				if (e_e1) {
					rechazar(e_e1);
				} else {
					resolver(true);
				}
			});
			
		}
	);
}
