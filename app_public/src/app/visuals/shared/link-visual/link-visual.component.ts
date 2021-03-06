import { Component, Input } from '@angular/core';
import { Link } from '../../../d3/models/';

@Component({
  selector: 'g[linkVisual]',
  templateUrl: './link-visual.component.html',
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent {
  
  @Input('linkVisual') link: Link;

}
