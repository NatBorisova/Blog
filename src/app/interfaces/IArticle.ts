import { ISection } from "./ISection";
import { IUser } from "./IUser";

export interface IArticle {
    created: string;
    title: string;
    text: string;
    author: IUser;
    section: ISection;
    canComment: IUser[];
    canWatch: IUser[];
    isDisabled: boolean;
    objectId: string;
}
