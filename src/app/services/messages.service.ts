import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


export interface IMessage {
    subject: string;
    textmessage: string;
    to: string[];
}

@Injectable({ providedIn: "root" })
export class MessagesService {

    constructor(private httpClient: HttpClient) { }

    sendEmail(message: IMessage): Observable<Object> {
        const body: any = {
            "subject": message.subject,
            "bodyparts": {
                "textmessage": message.textmessage,
                "htmlmessage": ""
            },
            "to": message.to,
            "attachment": [],
        };
        return this.httpClient.post("https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/messaging/email", JSON.stringify(body));
    }
}
