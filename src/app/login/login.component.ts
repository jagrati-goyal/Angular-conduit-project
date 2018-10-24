import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Errors } from '../models/errors.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model : any = {};
  errors: Errors = {errors: {}};

  constructor(private userService: UserService,
              private router : Router) { }

  ngOnInit() {
   
  }
  
  login(credentials : any){
    this.userService.login(credentials).subscribe(
      data => this.router.navigate(['/']),
      err => {
        this.errors = err;
      }
    );
  }
}
