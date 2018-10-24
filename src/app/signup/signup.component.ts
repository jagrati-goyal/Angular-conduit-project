import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Errors } from "../models/errors.model";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  model: any = {};
  errors: Errors = {errors: {}};

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  signUp(credentials) {
    console.log(credentials);
    this.userService
      .signUp(credentials)
      .subscribe(data => this.router.navigate(["/"]),
      err => this.errors = err);
  }
}
