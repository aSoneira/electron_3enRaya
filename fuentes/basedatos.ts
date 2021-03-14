import * as o_sqlite3 from 'sqlite3';

//creada con DB Browse for SQLite3
//let o_baseDatos : o_sqlite3.Database = new o_sqlite3.Database('basedatos.sqlite3');

//FUNCIONES PRIVADAS
async function f_bdPromesaConsulta(s_consulta:string,l_parametros:any[]) : Promise<any[]>{
    return new Promise(
		function(
			resolver : ((resultado: any[] | PromiseLike<any[]>) => void), 
			rechazar:((razon?: any) => void)
		):void{
            let o_baseDatos : o_sqlite3.Database = new o_sqlite3.Database('basedatos.sqlite3');
            o_baseDatos.all(s_consulta, l_parametros, function(e_e1 : Error, filas : any[]) {//ejecuta query tipo select
                if (e_e1) {                    
                    console.error(e_e1.message);
                    rechazar(e_e1);
                }
                else{
                    resolver(filas);
                }
            });
            o_baseDatos.close();
        }
    );
}

async function f_bdPromesaActuInserc(s_actuInserc:string,l_parametros:any[]) : Promise<o_sqlite3.RunResult>{
    return new Promise(
		function(
			resolver : ((resultado: o_sqlite3.RunResult | PromiseLike<o_sqlite3.RunResult>) => void), 
			rechazar:((razon?: any) => void)
		):void{
            let o_baseDatos : o_sqlite3.Database = new o_sqlite3.Database('basedatos.sqlite3');
            //ejecuta query de update o insert
            o_baseDatos.run(s_actuInserc, l_parametros, function(e_e1 : Error, o_resultado : o_sqlite3.RunResult) {
                if (e_e1) {                    
                    console.error(e_e1.message);
                    rechazar(e_e1);
                }
                else{
                    resolver(o_resultado);
                }
            });
            o_baseDatos.close();
        }
    );
}
//---------------------------------------------------------------------------------------

//consulta SQL que devuelve una partida guardada
export async function dameUnaPartidaGuardadaBD() : Promise<any[]>{
    return f_bdPromesaConsulta('SELECT * FROM PARTIDAS LIMIT 1',[]);
}

export async function guardaPartidaEnBD(s_estadoTablero:string) {
    return f_bdPromesaActuInserc('INSERT INTO PARTIDAS (estado_tablero) VALUES (?)',[s_estadoTablero]);
}