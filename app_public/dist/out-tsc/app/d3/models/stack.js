import RACE_CONFIG from '../../race-info/race-info.config';
// Implementing SimulationNodeDatum interface into our custom Node class
var Stack = /** @class */ (function () {
    function Stack(id) {
        this.id = id;
    }
    Object.defineProperty(Stack.prototype, "color", {
        get: function () {
            var index = Math.floor(RACE_CONFIG.SPECTRUM.length * ((1) / RACE_CONFIG.N));
            return RACE_CONFIG.SPECTRUM[index];
        },
        enumerable: true,
        configurable: true
    });
    return Stack;
}());
export { Stack };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/d3/models/stack.js.map