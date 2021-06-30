import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IComment } from "../interfaces/IComment";
import { IUser } from "../interfaces/IUser";
import { CommentsService } from "../services/comments.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "comments-app",
    templateUrl: "./comments.component.html",
    styleUrls: ["./comments.component.less"]
})

export class CommentsComponent implements OnInit, OnDestroy {

    @Input() articleObjectId: string = "";
    @Input() canUserComment: boolean = false;
    comments: IComment[] = [];
    isUserAdmin: boolean = false;
    user: IUser;
    newComment: string = "";
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private commentsService: CommentsService, private router: Router, private userService: UserService) {
        this.user = userService.createUser();
    }

    ngOnInit(): void {
        this.userService.isUserAdmin
            .pipe(takeUntil(this._onDestroy))
            .subscribe(v => this.isUserAdmin = v);
        this.userService.user
            .pipe(takeUntil(this._onDestroy))
            .subscribe((v) => { this.user = v; });
        this.updateComments();
    }

    updateComments(): void {
        this.commentsService.getCommentsForArticle(this.articleObjectId)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                (v: IComment[]) => { this.comments = v; },
                (e) => console.log(e),
            );

    }

    addComment(): void {
        const comment: any = {
            text: this.newComment,
            author: { objectId: this.user.objectId },
            article: { objectId: this.articleObjectId },
        };
        this.commentsService.addComment(JSON.stringify(comment))
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => {
                    this.updateComments();
                    this.newComment = "";
                },
            );
    }

    deleteComment(objectId: string): void {
        this.commentsService.deleteComment(objectId)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => this.updateComments(),
            );
    }

    changeCommentStatus(comment: IComment): void {
        this.commentsService.changeStatus(comment.objectId, !comment.isDisabled)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => this.updateComments(),
            );
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
