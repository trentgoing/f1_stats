import { EventEmitter } from '@angular/core';
import { Link } from './link';
import * as d3 from 'd3';
var FORCES = {
    LINKS: 1 / 50,
    COLLISION: 1,
    CHARGE: -100
};
var ForceDirectedGraph = /** @class */ (function () {
    function ForceDirectedGraph(nodes, links, options) {
        this.ticker = new EventEmitter();
        this.nodes = [];
        this.links = [];
        this.nodes = nodes;
        this.links = links;
        this.initSimulation(options);
    }
    ForceDirectedGraph.prototype.connectNodes = function (source, target) {
        var link;
        if (!this.nodes[source] || !this.nodes[target]) {
            throw new Error('One of the nodes does not exist');
        }
        link = new Link(source, target);
        this.simulation.stop();
        this.links.push(link);
        this.simulation.alphaTarget(0.3).restart();
        this.initLinks();
    };
    ForceDirectedGraph.prototype.initNodes = function () {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }
        this.simulation.nodes(this.nodes);
    };
    ForceDirectedGraph.prototype.initLinks = function () {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }
        // Initializing the links force simulation
        this.simulation.force('links', d3.forceLink(this.links).id(function (d) { return d['id']; }).strength(FORCES.LINKS));
    };
    ForceDirectedGraph.prototype.initSimulation = function (options) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }
        /** Creating the simulation */
        if (!this.simulation) {
            var ticker_1 = this.ticker;
            // Creating the force simulation and defining the charges
            this.simulation = d3.forceSimulation()
                .force("charge", d3.forceManyBody()
                .strength(FORCES.CHARGE));
            // Connecting the d3 ticker to an angular event emitter
            this.simulation.on('tick', function () {
                ticker_1.emit(this);
            });
            this.initNodes();
            this.initLinks();
        }
        /** Updating the central force of the simulation */
        this.simulation.force("centers", d3.forceCenter(options.width / 2, options.height / 2));
        /** Restarting the simulation internal timer */
        this.simulation.restart();
    };
    return ForceDirectedGraph;
}());
export { ForceDirectedGraph };
//# sourceMappingURL=/Users/trentgoing/Code/f1_project/f1_v2/app_public/src/app/d3/models/force-directed-graph.js.map