var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var OrdinalPipe = /** @class */ (function () {
    function OrdinalPipe() {
    }
    OrdinalPipe.prototype.transform = function (finish) {
        var _isNumeric = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        var s = ["th", "st", "nd", "rd"];
        if (finish) {
            if (finish && _isNumeric(finish)) {
                var v = finish % 100;
                if (finish === 1) {
                    return finish + (s[(v - 20) % 10] || s[v] || s[0]);
                }
                else if (finish === 2) {
                    return finish + (s[(v - 20) % 10] || s[v] || s[0]);
                }
                else if (finish === 3) {
                    return finish + (s[(v - 20) % 10] || s[v] || s[0]);
                }
                else {
                    return finish + (s[(v - 20) % 10] || s[v] || s[0]);
                }
            }
            else {
                return finish;
            }
        }
        else {
            return '-';
        }
    };
    OrdinalPipe = __decorate([
        Pipe({
            name: 'ordinal'
        })
    ], OrdinalPipe);
    return OrdinalPipe;
}());
export { OrdinalPipe };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/ordinal.pipe.js.map