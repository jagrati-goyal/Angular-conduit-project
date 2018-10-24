import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  model: any = {};

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  signUp(credentials) {
    console.log(credentials);
    this.userService
      .signUp(credentials)
      .subscribe(data => this.router.navigate(["/"]));
  }
}
