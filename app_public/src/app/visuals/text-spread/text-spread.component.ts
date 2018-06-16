import { Component, OnInit, ChangeDetectionStrategy, HostListener, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { D3Service } from '../../d3/d3.service';
import { Streamgraph } from '../../d3/models'

@Component({
  selector: 'app-text-spread',
  templateUrl: './text-spread.component.html',
  styleUrls: ['./text-spread.component.css']
})


export class TextSpreadComponent implements OnInit {

  private _options: { width, height } = { width: 200, height: 150 };
  graph: Streamgraph;
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initialize(this.options);
  }

  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) { }
  
  ngOnInit() {
    this.graph = this.d3Service.getStreamgraph(this.options);
  }

  ngAfterViewInit() {
    var words = "Goodbye, it’s you\nI am sure that before some of those days I'd want to meet".split(/\s+/g);

    var canvas = document.querySelector("canvas"),
        canvas2 = <HTMLCanvasElement>canvas.cloneNode(),
        context = canvas.getContext("2d"),
        context2 = canvas2.getContext("2d"),
        width = this.options.width,
        height = this.options.height;

    console.log(width, height);
    
    context.font = context2.font = "300px Helvetica Neue";
    context.textAlign = context2.textAlign = "center";
    context.lineJoin = context2.lineJoin = "round";
    
    (function next() {
      var i = 0.5, text = words.shift();
      context.clearRect(0, 0, width, height);
      context.fillText(text, width / 2, height / 2 + 100);
      var timer = d3.timer(function() {
        if (text === undefined) {
          return;
        }
        if (++i > text.length * 20) return timer.stop(), next();
        context2.save();
        context2.clearRect(0, 0, width, height);
        context2.lineWidth = i & 1 ? i * 5 + 3 : i * 5;
        context2.strokeStyle = i & 1 ? "white" : "black";
        context2.strokeText(text, width / 2, height / 2 + 100);
        context2.restore();
        context2.drawImage(canvas, 0, 0);
        context.drawImage(canvas2, 0, 0);
      });
    })();
  }

  get options() {
    return this._options = {
      height: window.innerHeight * (3/5),
      width: document.getElementById("texttest").parentElement.clientWidth
    };
  }

}
