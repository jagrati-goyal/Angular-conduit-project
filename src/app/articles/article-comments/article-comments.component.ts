import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user.model";
import { Comment } from "../../models/comment.model";

@Component({
  selector: "app-article-comments",
  templateUrl: "./article-comments.component.html",
  styleUrls: ["./article-comments.component.css"]
})
export class ArticleCommentsComponent implements OnInit {
  @Input()
  comment: Comment;
  @Output()
  deleteComment = new EventEmitter<boolean>();

  canModify: boolean;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Load the current user's data
    this.userService.currentUser.subscribe((userData: User) => {
      this.canModify = userData.username === this.comment.author.username;
    });
  }

  // To delete user's own comment
  onDelete() {
    this.deleteComment.emit(true);
  }
}
 