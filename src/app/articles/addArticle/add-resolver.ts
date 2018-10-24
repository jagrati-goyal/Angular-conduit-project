import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Article } from "src/app/models/article.model";
import { UserService } from "src/app/services/user.service";
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { map } from "rxjs/operators";

@Injectable()
export class AddArticleResolver implements Resolve<Article> {
  constructor(
      private apiService : ApiService,
    private router: Router,
    private userService: UserService
  ) { }

  resolve( route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any>{
       return this.apiService.get('/articles/'+ route.params['slug']).pipe(map(data => data.article))
        .pipe(map(
            article => {
                if (this.userService.getCurrentUser().username === article.author.username) {
                    return article;
                  } else {
                    this.router.navigateByUrl('/');
                  }
            }
        ))
  }

}
