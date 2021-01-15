import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-ecosystem-generator",
  templateUrl: "./form-lister.component.html",
  styleUrls: ["./form-lister.component.scss"],
})
export class FormListerComponent implements OnInit {
  name = "Contact Generator Form";
  forms: any;
  constructor(private router: Router) {}
  ngOnInit() {
    this.forms = JSON.parse(localStorage.getItem("forms"));
  }
  editForm() {}
  viewForm(form: any) {
    localStorage.setItem("currentForm", JSON.stringify(form));
    this.router.navigate(["form-view"]);
  }
}
