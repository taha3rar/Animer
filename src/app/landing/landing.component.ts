import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed = 1;

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

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }
  ngOnInit() {}
}
