import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/models/profile.model';
import { ArticleListConfig } from 'src/app/models/article-list-config.model';

@Component({
  selector: 'app-profile-favorite',
  templateUrl: './profile-favorite.component.html',
  styleUrls: ['./profile-favorite.component.css']
})
export class ProfileFavoriteComponent implements OnInit {
  profile: Profile;
  favoritesConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  constructor(
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.favoritesConfig.filters.favorited = this.profile.username;
      }
    );
  }

}
