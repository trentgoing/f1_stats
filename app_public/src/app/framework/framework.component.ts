import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  constructor() { }

  public formVisible: boolean = false;

  public toggleMenu() {
    if (this.formVisible === true) {
      this.formVisible = false;
    } else if (this.formVisible === false) {
      this.formVisible = true;
    }
  }

  ngOnInit() {
  }

}
