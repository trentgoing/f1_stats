import { Component, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, Input, OnInit, AfterViewInit } from '@angular/core';
import { ForceDirectedGraph, Node, Link } from '../../d3/models';
import { D3Service } from '../../d3/d3.service';

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [attr.zoomableOf]="svg">
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes" [draggableNode]="node" [draggableInGraph]="graph"></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  @Input() nodes: Node[];
  @Input() links: Link[];
  graph: ForceDirectedGraph;
  private _options: { width, height } = { width: 200, height: 150 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
   return this._options = {
      height: window.innerHeight * (3/5),
      width: document.getElementById("positions").parentElement.clientWidth
    };
  }

}
