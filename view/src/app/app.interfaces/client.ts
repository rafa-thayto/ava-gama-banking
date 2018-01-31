import { IAccount } from "./account";
import { IDocument } from "./document";

export interface IClient extends IDocument {
    name: string;
    document: number,
    accounts: IAccount[]
}
