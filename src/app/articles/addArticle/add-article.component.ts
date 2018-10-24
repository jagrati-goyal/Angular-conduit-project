import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Article } from 'src/app/models/article.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  article: Article = {} as Article;
  model : any = {};

  constructor(private apiService : ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit() {
    this.route.data.subscribe((data: { article: Article }) => {
      if (data.article) {
        this.article = data.article;
      }
    });
  }

  addArticle(value : any){
    if(value.slug){
      this.apiService.put('/articles/' + value.slug, {article: value}).pipe(map(data => data.article))
        .subscribe(
          article => this.router.navigateByUrl('/article/' + article.slug));
    }
    else{
      this.apiService.post('/articles', {article : value}).pipe(map(data => data.article))
      .subscribe(
        article => this.router.navigateByUrl('/article/' + article.slug)  );
    }
  }

}
