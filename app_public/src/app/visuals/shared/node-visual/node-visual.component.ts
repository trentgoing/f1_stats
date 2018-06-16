import { Component, OnInit, Input } from '@angular/core';
import { Node } from '../../../d3/models/';

@Component({
  selector: 'g[nodeVisual]',
  templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent implements OnInit {

  @Input('nodeVisual') node: Node;

  constructor() { }

  ngOnInit() {
  }

}
