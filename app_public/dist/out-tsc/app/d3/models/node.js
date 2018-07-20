import RACE_CONFIG from '../../race-info/race-info.config';
// Implementing SimulationNodeDatum interface into our custom Node class
var Node = /** @class */ (function () {
    function Node(id) {
        var _this = this;
        this.linkCount = 0;
        this.normal = function () {
            return Math.sqrt(_this.linkCount / RACE_CONFIG.N);
        };
        this.id = id;
    }
    Object.defineProperty(Node.prototype, "r", {
        get: function () {
            return 50 * this.normal() + 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "fontSize", {
        get: function () {
            return (30 * this.normal() + 10) + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "color", {
        get: function () {
            var index = Math.floor(RACE_CONFIG.SPECTRUM.length * ((this.linkCount - 1) / RACE_CONFIG.N));
            return RACE_CONFIG.SPECTRUM[index];
        },
        enumerable: true,
        configurable: true
    });
    return Node;
}());
export { Node };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/d3/models/node.js.map