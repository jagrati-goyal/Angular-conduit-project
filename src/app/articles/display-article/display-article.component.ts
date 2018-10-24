import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { Article } from "src/app/models/article.model";
import { User } from "src/app/models/user.model";
import { ApiService } from '../../services/api.service';
import { map } from "rxjs/operators";
import { Comment } from '../../models/comment.model';
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-display-article",
  templateUrl: "./display-article.component.html",
  styleUrls: ["./display-article.component.css"]
})
export class DisplayArticleComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  data: Comment;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private apiService : ApiService
  ) {}

  ngOnInit() {
    // To fetch the articles and it's comments
    this.route.data.subscribe((data: { article: Article }) => {
      this.article = data.article;
      this.getComments();
    });
    // To fetch current user's data
    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
      this.canModify =
        this.currentUser.username === this.article.author.username;
    });
  }

  addComment(form: NgForm){
    this.data = form.value.comment; 
    this.apiService.post(`/articles/${this.article.slug}/comments`, {
      comment : { body: form.value.comment}
    }).pipe(map(data => data.comment)).subscribe(
      comment => {
        this.comments.unshift(comment);
        form.reset();
      }
    )
  }

  getComments(){
    this.apiService.get(`/articles/${this.article.slug}/comments`).pipe(map(
      data => data.comments
    )).subscribe(
      comments => this.comments = comments
    )
  }

  deleteArticle(){
    this.apiService.delete('/articles/' + this.article.slug).subscribe(
      done => { this.router.navigateByUrl('/') }
    )
  }

  onDeleteComment(comment){
    this.apiService.delete(`/articles/${this.article.slug}/comments/${comment.id}`).subscribe(
      success => {
        this.comments = this.comments.filter((item) => item !== comment);
      }
    )
  }
}
