import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Article } from '../models/article.model';
import { ArticleListConfig } from '../models/article-list-config.model';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles : Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];
  query : ArticleListConfig;
  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.getArticles();
    }
  }

  constructor(private apiService : ApiService) { }

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.getArticles();
  }

  ngOnInit() {
  }

  getArticles(){
    const params ={};
    this.articles = [];
    Object.keys(this.query.filters)
    .forEach((key) => {
      params[key] = this.query.filters[key];
    });
    this.loading = true;
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }
    this.apiService.get('/articles' + ((this.query.type === 'feed') ? '/feed' : ''),new HttpParams({ fromObject: params }))
    .subscribe(data => {
      this.loading = false;
      this.articles = data.articles;
      this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), 
      (val, index) => index + 1);
    })
  }
}
