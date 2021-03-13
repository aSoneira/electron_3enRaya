"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coordenadas = void 0;
var Coordenadas = /** @class */ (function () {
    function Coordenadas(co) {
        this.i_x = co['i_x'];
        this.i_y = co['i_y'];
    }
    Coordenadas.prototype.getI_x = function () {
        return this.i_x;
    };
    Coordenadas.prototype.getI_y = function () {
        return this.i_y;
    };
    Coordenadas.prototype.setI_x = function (i_x) {
        this.i_x = i_x;
    };
    Coordenadas.prototype.setI_y = function (i_y) {
        this.i_y = i_y;
    };
    return Coordenadas;
}());
exports.Coordenadas = Coordenadas;
//# sourceMappingURL=Coordenadas.js.map