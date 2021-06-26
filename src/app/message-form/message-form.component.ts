import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IMessage, MessagesService } from "../services/messages.service";

@Component({
    selector: "message-form-app",
    templateUrl: "./message-form.component.html",
    styleUrls: ["./message-form.component.less"]
})

export class MessageFormComponent implements OnInit {

    emails: string = "";
    message: IMessage;

    constructor(private messagesService: MessagesService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.message = this.createNewMessage();
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.emails = queryParam.emails;
            },
        );
    }

    createNewMessage(): IMessage {
        return {
            subject: "",
            textmessage: "",
            to: []
        };
    }

    sendEmail(): void {
        this.message.to = this.emails.split(",");
        this.messagesService.sendEmail(this.message).subscribe(
            (v) => {
                this.router.navigate(["/administration"]);
            },
            (e) => { console.log(e); },
        );
    }
}
