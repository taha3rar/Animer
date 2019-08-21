import { Component, OnInit, AfterViewInit, AfterViewChecked, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public lottieConfig: Object;
  private anim: any;

  constructor() {
    this.lottieConfig = {
      path: 'data/data.json',
      renderer: 'svg',
      autoplay: true,
      loop: true,
      rendererSettings: {
        className: 'svgClass'
      }
    };
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  ngOnInit() {}
}
