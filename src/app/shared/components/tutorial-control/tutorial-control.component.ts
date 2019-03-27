import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-tutorial-control',
  template: ''
})
export class TutorialControlComponent implements OnInit {
  currentSlide = 1;
  numberOfSlides = 3;
  constructor() {}

  ngOnInit() {}

  nextSlide() {
    if (this.currentSlide < this.numberOfSlides) {
      $('div.active').removeClass('active');
      this.currentSlide++;
      $('div#' + this.currentSlide).addClass('active');
    }
  }

  prevSlide() {
    if (this.currentSlide <= this.numberOfSlides && this.currentSlide > 1) {
      $('div.active').removeClass('active');
      this.currentSlide--;
      $('div#' + this.currentSlide).addClass('active');
    }
  }

  onClose() {
    $('div#' + this.currentSlide).removeClass('active');
    this.currentSlide = 1;
    $('div#' + this.currentSlide).addClass('active');
  }
}
