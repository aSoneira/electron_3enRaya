import { Coordenadas } from "./Coordenadas";
import { ALTO, ANCHO } from "./constantes";

export class TresEnRaya{
    private lli_tablero : number[][];
    private lo_casillasLibres : Coordenadas[];
    private b_partidaTerminada : boolean;

    constructor(){
    }

    public inicializar() : void{

        this.b_partidaTerminada = false;
        this.lo_casillasLibres = [];
        this.lli_tablero = [];
        let i : number = 0;

        while(i<ALTO){

            let li_fila : number[] = [];
            let j : number = 0;

            while(j<ANCHO){
                li_fila.push(0);
                let co:Object = {i_x:i,i_y:j}; 
                this.lo_casillasLibres.push(new Coordenadas(co));           
                j++;
            }
            this.lli_tablero.push(li_fila);
            i++;
        }
    }

    //devuelve false si la casilla ya esta ocupada
    public intentaPonerFicha(coordenada:Coordenadas, i_jugador:number):boolean{
        if(this.estaLaCasillaLibre(coordenada)){
            this.ponFicha(coordenada,i_jugador);
            return true;
        }
        else{
            return false;
        }
    }

    public daCasillaLibreAzar():Coordenadas{
        let i_indiceAleatorio : number = Math.floor(Math.random()*this.lo_casillasLibres.length);
		var o_casillaAlAzar : Coordenadas = this.lo_casillasLibres[i_indiceAleatorio];
        return o_casillaAlAzar;
    }

    public darTableroEnFormatoStringJSON() : string{
        let o_estadoTableroJSON : Object = {lli_tablero:this.lli_tablero};
        return JSON.stringify(o_estadoTableroJSON);
    }

    //se entiende que no se va a cargar nunca un tablero con una partida de tres en raya terminada, siempre partidas a medias
    public cargarTableroDesdeStringJSON(s_estadoTableroJSON : string):void{
        let o_estadoTableroJSON : Object = JSON.parse(s_estadoTableroJSON);
        this.b_partidaTerminada = false;
        this.lo_casillasLibres = [];
        this.lli_tablero = o_estadoTableroJSON['lli_tablero'];
        let i : number = 0;
        while(i<ALTO){
            let j : number = 0;
            while(j<ANCHO){    
                let co:Object = {i_x:i,i_y:j};
                let coordenada : Coordenadas = new Coordenadas(co);
                if(this.estaLaCasillaLibre(coordenada)){                    
                    this.lo_casillasLibres.push(coordenada);
                }                        
                j++;
            }
            i++;
        }
    }

    //PRIVADAS    
    public ponFicha(coordenada:Coordenadas, i_jugador:number){
        this.lli_tablero[coordenada.getI_x()][coordenada.getI_y()]=i_jugador;
        this.quitaCasillaLibre(coordenada);
    }
    //devuelve true si la casilla esta libre
    private estaLaCasillaLibre(coordenada:Coordenadas):boolean{
        return this.lli_tablero[coordenada.getI_x()][coordenada.getI_y()]==0;
    }

    //devuelve true si las coordenadas a quitar (i_x,i_y) estaban en la lista lo_casillasLibres
    //version funcional
    private quitaCasillaLibre(coordenada:Coordenadas):boolean{
        let lo_casQuitar : Coordenadas[] = this.lo_casillasLibres.filter((o_casLib)=>{
            if(o_casLib.getI_x()==coordenada.getI_x() && o_casLib.getI_y()==coordenada.getI_y()){
                return true;
            }
            else{
                return false;
            }
        });
        if(lo_casQuitar.length>0){
            let o_casillaAquitar : Coordenadas = lo_casQuitar[0];
            let i_indiceCasillaAquitar : number = this.lo_casillasLibres.indexOf(o_casillaAquitar);
            this.lo_casillasLibres.splice(i_indiceCasillaAquitar, 1);//lo elimina de la lista
            if(this.lo_casillasLibres.length==0){
                this.b_partidaTerminada=true;//si no quedan casillas libres la partida ha terminado
            }
            return true;
        }
        else{
            return false;
        }
    }

    //version iterativa
    private quitaCasillaLibre2(i_x:number,i_y:number):boolean{
        let b_encontrada : boolean = false;
        let i : number = 0;
        while(i<this.lo_casillasLibres.length && !b_encontrada){
            let o_coordaux : Coordenadas = this.lo_casillasLibres[i];
            if(o_coordaux.getI_x()==i_x && o_coordaux.getI_y()==i_y){
                b_encontrada=true;
                this.lo_casillasLibres.splice(i, 1);//lo elimina de la lista
                if(this.lo_casillasLibres.length==0){
                    this.b_partidaTerminada=true;//si no quedan casillas libres la partida ha terminado
                }
            }
        }
        return b_encontrada;
    }

    //GETTERs y SETTERs
    public getLli_tablero(): number[][] {
        return this.lli_tablero;
    }

    public setLli_tablero(lli_tablero: number[][]): void {
        this.lli_tablero = lli_tablero;
    }

    public getLo_casillasLibres(): Coordenadas[] {
        return this.lo_casillasLibres;
    }

    public setLo_casillasLibres(lo_casillasLibres: Coordenadas[]): void {
        this.lo_casillasLibres = lo_casillasLibres;
    }

    public isB_partidaTerminada(): boolean {
        return this.b_partidaTerminada;
    }

    public setB_partidaTerminada(b_partidaTerminada: boolean): void {
        this.b_partidaTerminada = b_partidaTerminada;
    }
}