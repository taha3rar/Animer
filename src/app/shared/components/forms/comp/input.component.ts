import { Component, Input, OnChanges, OnInit } from "@angular/core";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit, OnChanges {
  @Input() label: string = "Field Name";
  @Input() type: "text" | "number";
  @Input() isDisabled: boolean;
  @Input() required: boolean;
  @Input() col: number = 6;
  @Input() color: string = "#000";
  @Input() tooltip: string;
  constructor() {}
  ngOnInit(): void {}
  ngOnChanges(changes: any): void {
  
  }
}
