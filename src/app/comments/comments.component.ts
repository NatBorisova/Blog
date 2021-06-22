import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IUser, UserService } from "../services/user.service";
import { CommentsService, IComment } from "./comments.service";

@Component({
    selector: "comments-app",
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.less']
})

export class CommentsComponent implements OnInit {

    @Input() articleObjectId: string = "";
    @Input() canUserComment: boolean = false;
    comments: IComment[] = [];
    isUserAdmin: boolean = false;
    user: IUser;
    newComment: string = "";

    constructor(private commentsService: CommentsService, private router: Router, private userService: UserService) {
        userService.isUserAdmin.subscribe(v => this.isUserAdmin = v);
        this.user = userService.createUser();
        userService.user.subscribe(v => this.user = v);
        console.log(this.canUserComment);
    }

    ngOnInit() {
        this.updateComments();
    }

    updateComments() {
        this.commentsService.getCommentsForArticle(this.articleObjectId).subscribe(
            (v: any) => {
                this.comments = v;
            },
            (e) => console.log(e)
        );

    }

    addComment() {
        let comment: any = {
            text: this.newComment,
            author: { objectId: this.user.objectId },
            article: { objectId: this.articleObjectId }
        }
        this.commentsService.addComment(JSON.stringify(comment)).subscribe(
            () => this.updateComments()
        );
    }

    deleteComment(objectId: string) {

        this.commentsService.deleteComment(objectId).subscribe(
            () => this.updateComments()
        );
    }

    changeCommentStatus(comment: IComment) {
        this.commentsService.changeStatus(comment.objectId, !comment.isDisabled).subscribe(
            () => this.updateComments()
        );
    }
}
