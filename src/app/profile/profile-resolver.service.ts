import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Profile } from '../models/profile.model';
import { Observable } from "rxjs";
import { ApiService } from '../services/api.service';
import { map } from "rxjs/operators";

@Injectable()
export class ProfileResolver implements Resolve<Profile>{
    constructor(
        private router : Router,
        private apiService : ApiService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>{
        return this.apiService.get('/profiles/'+ route.params['username'] )
        .pipe(map((data: {profile: Profile}) => data.profile));
    }
}