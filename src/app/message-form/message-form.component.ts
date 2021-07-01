import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IMessage } from "../interfaces/IMessage";
import { MessagesService } from "../services/messages.service";

@Component({
    selector: "message-form-app",
    templateUrl: "./message-form.component.html",
    styleUrls: ["./message-form.component.less"]
})

export class MessageFormComponent implements OnInit, OnDestroy {

    emails: string = "";
    message: IMessage;
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private messagesService: MessagesService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.message = this.messagesService.createNewMessage();
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                (queryParam) => {
                    this.emails = queryParam.emails;
                },
            );
    }

    sendEmail(): void {
        this.message.to = this.emails.split(",");
        this.messagesService.sendEmail(this.message)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => { this.router.navigate(["/administration"]); },
                (e) => { console.log(e); },
            );
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
