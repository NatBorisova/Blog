import { IArticle } from "./IArticle";
import { IUser } from "./IUser";

export interface IComment {
    created: string;
    text: string;
    author: IUser;
    article: IArticle;
    isDisabled: boolean;
    objectId: string;
}
