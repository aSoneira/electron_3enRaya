"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guardarEnArchivo = exports.leerArchivo = void 0;
var sistemaArchivos = require("fs");
var electron_1 = require("electron");
function leerArchivo() {
    return __awaiter(this, void 0, void 0, function () {
        var s_error1;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolver, rechazar) {
                    //'openDirectory', 'multiSelections'
                    electron_1.dialog.showOpenDialog({ properties: ['openFile'] })
                        .then(function (o_respuesta) {
                        var ls_rutasArchivos = o_respuesta['filePaths'];
                        //rutasArchivos es la lista de archivos seleccionados
                        if (ls_rutasArchivos === undefined) {
                            s_error1 = 'No ha seleccionado ninguno archivo';
                            console.log(s_error1);
                            rechazar(s_error1);
                        }
                        else {
                            var s_rutaArchivo = ls_rutasArchivos[0]; //solo coge el primer archivo seleccionado
                            console.log(s_rutaArchivo);
                            try {
                                var s_crudo = sistemaArchivos.readFileSync(s_rutaArchivo); //el string de datos en crudo
                                resolver(s_crudo);
                            }
                            catch (s_error1) {
                                rechazar(s_error1);
                            }
                        }
                    }).catch(function (error1) {
                        rechazar(error1);
                    });
                })];
        });
    });
}
exports.leerArchivo = leerArchivo;
function guardarEnArchivo(s_crudo) {
    return __awaiter(this, void 0, void 0, function () {
        var s_error1;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolver, rechazar) {
                    //'openDirectory', 'multiSelections'
                    electron_1.dialog.showOpenDialog({ properties: ['openFile'] })
                        .then(function (o_respuesta) {
                        return __awaiter(this, void 0, void 0, function () {
                            var ls_rutasArchivos, s_rutaArchivo, s_error1_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        ls_rutasArchivos = o_respuesta['filePaths'];
                                        if (!(ls_rutasArchivos === undefined)) return [3 /*break*/, 1];
                                        s_error1 = 'No ha seleccionado ninguno archivo';
                                        console.log(s_error1);
                                        rechazar(s_error1);
                                        return [3 /*break*/, 5];
                                    case 1:
                                        s_rutaArchivo = ls_rutasArchivos[0];
                                        console.log(s_rutaArchivo);
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 5]);
                                        return [4 /*yield*/, f_aEscribeArchivoAsync(s_crudo, s_rutaArchivo)];
                                    case 3:
                                        _a.sent();
                                        resolver(s_crudo);
                                        return [3 /*break*/, 5];
                                    case 4:
                                        s_error1_1 = _a.sent();
                                        rechazar(s_error1_1);
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        });
                    }).catch(function (error1) {
                        rechazar(error1);
                    });
                })];
        });
    });
}
exports.guardarEnArchivo = guardarEnArchivo;
function f_aEscribeArchivoAsync(s_linea, s_ruta) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolver, rechazar) {
                    sistemaArchivos.writeFile(s_ruta, s_linea, function (e_e1) {
                        if (e_e1) {
                            rechazar(e_e1);
                        }
                        else {
                            resolver(true);
                        }
                    });
                })];
        });
    });
}
//# sourceMappingURL=archivos.js.map