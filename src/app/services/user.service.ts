import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { map, distinctUntilChanged } from "rxjs/operators";
import { JwtService } from "./jwt.service";
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get("/user").subscribe(data => {
        this.jwtService.saveToken(data.user.token);
        this.currentUserSubject.next(data.user);
        this.isAuthenticatedSubject.next(true);
      },
      err => {
        this.clearAuthentication();
      });
    } else {
      this.clearAuthentication();    
    }
  }

  clearAuthentication(){
    this.jwtService.destroyToken();
      this.currentUserSubject.next({} as User);
      this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  login(credentials: any) {
    return this.apiService
      .post("/users/login", {
        user: credentials
      })
      .pipe(
        map(data => {
          this.jwtService.saveToken(data.user.token);
          this.currentUserSubject.next(data.user);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  signUp(credentials: any) {
    console.log();
    return this.apiService.post("/users", {
      user: {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password
      }
    }).pipe(
      map(data => {
        this.jwtService.saveToken(data.user.token);
        this.currentUserSubject.next(data.user);
        this.isAuthenticatedSubject.next(true);
      }))}

  update(user): Observable<User>{
    console.log(user);
    return this.apiService.put('/user', { user }).pipe(map(data => {
      this.currentUserSubject.next(data.user);
      return data.user;
    }))
  }
}
