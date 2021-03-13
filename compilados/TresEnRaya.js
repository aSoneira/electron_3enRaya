"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TresEnRaya = void 0;
var Coordenadas_1 = require("./Coordenadas");
var constantes_1 = require("./constantes");
var TresEnRaya = /** @class */ (function () {
    function TresEnRaya() {
    }
    TresEnRaya.prototype.inicializar = function () {
        this.b_partidaTerminada = false;
        this.lo_casillasLibres = [];
        this.lli_tablero = [];
        var i = 0;
        while (i < constantes_1.ALTO) {
            var li_fila = [];
            var j = 0;
            while (j < constantes_1.ANCHO) {
                li_fila.push(0);
                var co = { i_x: i, i_y: j };
                this.lo_casillasLibres.push(new Coordenadas_1.Coordenadas(co));
                j++;
            }
            this.lli_tablero.push(li_fila);
            i++;
        }
    };
    //devuelve false si la casilla ya esta ocupada
    TresEnRaya.prototype.intentaPonerFicha = function (coordenada, i_jugador) {
        if (this.estaLaCasillaLibre(coordenada)) {
            this.ponFicha(coordenada, i_jugador);
            return true;
        }
        else {
            return false;
        }
    };
    TresEnRaya.prototype.daCasillaLibreAzar = function () {
        var i_indiceAleatorio = Math.floor(Math.random() * this.lo_casillasLibres.length);
        var o_casillaAlAzar = this.lo_casillasLibres[i_indiceAleatorio];
        return o_casillaAlAzar;
    };
    TresEnRaya.prototype.darTableroEnFormatoStringJSON = function () {
        var o_estadoTableroJSON = { lli_tablero: this.lli_tablero };
        return JSON.stringify(o_estadoTableroJSON);
    };
    //se entiende que no se va a cargar nunca un tablero con una partida de tres en raya terminada, siempre partidas a medias
    TresEnRaya.prototype.cargarTableroDesdeStringJSON = function (s_estadoTableroJSON) {
        var o_estadoTableroJSON = JSON.parse(s_estadoTableroJSON);
        this.b_partidaTerminada = false;
        this.lo_casillasLibres = [];
        this.lli_tablero = o_estadoTableroJSON['lli_tablero'];
        var i = 0;
        while (i < constantes_1.ALTO) {
            var j = 0;
            while (j < constantes_1.ANCHO) {
                var co = { i_x: i, i_y: j };
                var coordenada = new Coordenadas_1.Coordenadas(co);
                if (this.estaLaCasillaLibre(coordenada)) {
                    this.lo_casillasLibres.push(coordenada);
                }
                j++;
            }
            i++;
        }
    };
    //PRIVADAS    
    TresEnRaya.prototype.ponFicha = function (coordenada, i_jugador) {
        this.lli_tablero[coordenada.getI_x()][coordenada.getI_y()] = i_jugador;
        this.quitaCasillaLibre(coordenada);
    };
    //devuelve true si la casilla esta libre
    TresEnRaya.prototype.estaLaCasillaLibre = function (coordenada) {
        return this.lli_tablero[coordenada.getI_x()][coordenada.getI_y()] == 0;
    };
    //devuelve true si las coordenadas a quitar (i_x,i_y) estaban en la lista lo_casillasLibres
    //version funcional
    TresEnRaya.prototype.quitaCasillaLibre = function (coordenada) {
        var lo_casQuitar = this.lo_casillasLibres.filter(function (o_casLib) {
            if (o_casLib.getI_x() == coordenada.getI_x() && o_casLib.getI_y() == coordenada.getI_y()) {
                return true;
            }
            else {
                return false;
            }
        });
        if (lo_casQuitar.length > 0) {
            var o_casillaAquitar = lo_casQuitar[0];
            var i_indiceCasillaAquitar = this.lo_casillasLibres.indexOf(o_casillaAquitar);
            this.lo_casillasLibres.splice(i_indiceCasillaAquitar, 1); //lo elimina de la lista
            if (this.lo_casillasLibres.length == 0) {
                this.b_partidaTerminada = true; //si no quedan casillas libres la partida ha terminado
            }
            return true;
        }
        else {
            return false;
        }
    };
    //version iterativa
    TresEnRaya.prototype.quitaCasillaLibre2 = function (i_x, i_y) {
        var b_encontrada = false;
        var i = 0;
        while (i < this.lo_casillasLibres.length && !b_encontrada) {
            var o_coordaux = this.lo_casillasLibres[i];
            if (o_coordaux.getI_x() == i_x && o_coordaux.getI_y() == i_y) {
                b_encontrada = true;
                this.lo_casillasLibres.splice(i, 1); //lo elimina de la lista
                if (this.lo_casillasLibres.length == 0) {
                    this.b_partidaTerminada = true; //si no quedan casillas libres la partida ha terminado
                }
            }
        }
        return b_encontrada;
    };
    //GETTERs y SETTERs
    TresEnRaya.prototype.getLli_tablero = function () {
        return this.lli_tablero;
    };
    TresEnRaya.prototype.setLli_tablero = function (lli_tablero) {
        this.lli_tablero = lli_tablero;
    };
    TresEnRaya.prototype.getLo_casillasLibres = function () {
        return this.lo_casillasLibres;
    };
    TresEnRaya.prototype.setLo_casillasLibres = function (lo_casillasLibres) {
        this.lo_casillasLibres = lo_casillasLibres;
    };
    TresEnRaya.prototype.isB_partidaTerminada = function () {
        return this.b_partidaTerminada;
    };
    TresEnRaya.prototype.setB_partidaTerminada = function (b_partidaTerminada) {
        this.b_partidaTerminada = b_partidaTerminada;
    };
    return TresEnRaya;
}());
exports.TresEnRaya = TresEnRaya;
//# sourceMappingURL=TresEnRaya.js.map