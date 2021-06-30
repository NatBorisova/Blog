import { ISection } from "./ISection";
import { IUser } from "./IUser";

export interface INewArticle {
    title: string;
    text: string;
    author: IUser;
    section: ISection;
    canComment: IUser[];
    canWatch: IUser[];
    isDisabled: boolean;
}
