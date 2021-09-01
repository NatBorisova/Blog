import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IMessage } from "../interfaces/IMessage";
import { APPLICATION_ID, REST_API_KEY } from "./constants";

@Injectable({ providedIn: "root" })
export class MessagesService {

    constructor(private httpClient: HttpClient) { }
    
    createNewMessage(): IMessage {
        return {
            subject: "",
            textmessage: "",
            to: []
        };
    }

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
        return this.httpClient.post(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/messaging/email`, JSON.stringify(body));
    }
}
