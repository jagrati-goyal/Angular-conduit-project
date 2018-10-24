import { Component, OnInit } from "@angular/core";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  listConfig: ArticleListConfig = {
    type: "all",
    filters: {}
  };
  isAuthenticated: boolean;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(authenticated => {
      this.isAuthenticated = authenticated;

      if (authenticated) {
        this.setListTo("feed");
      } else {
        this.setListTo("all");
      }
    });
  }

  // To set the list object
  setListTo(type: string = "", filters: Object = {}) {
    this.listConfig = { type: type, filters: filters };
  }
}
