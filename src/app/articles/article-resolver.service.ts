import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ApiService } from '../services/api.service';
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ArticleResolver implements Resolve<Article>{
    constructor(
        private router : Router,
        private apiService : ApiService,
        private userService : UserService
    ){}

    resolve(
        route : ActivatedRouteSnapshot,
        state : RouterStateSnapshot
    ): Observable<any>{
        return this.apiService.get('/articles/' + route.params['slug'])
        .pipe(map(data => data.article));
    }
}