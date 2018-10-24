import { Component, OnInit, Input } from "@angular/core";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.settingsForm = this.formBuilder.group({
      image: "",
      username: "",
      bio: "",
      email: "",
      password: ""
    });
  }

  ngOnInit() {
    //Place editable form fields of the current user's object
    Object.assign(this.user, this.userService.getCurrentUser());
    //Fill the form
    this.settingsForm.patchValue(this.user);
  }

  update() {
    Object.assign(this.user, this.settingsForm.value);
    this.userService
      .update(this.user)
      .subscribe(updatedUser =>
        this.router.navigateByUrl("/profile/" + updatedUser.username)
      );
  }

  logout() {
    this.userService.clearAuthentication();
    this.router.navigateByUrl("/");
  }
}
