import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[hover]",
})
export class HoverDirective {
  @HostListener("mouseenter") onMouseEnter() {
    return true;
  }

  @HostListener("mouseleave") onMouseLeave() {
    return false;
  }

  constructor(private el: ElementRef) {}
}
