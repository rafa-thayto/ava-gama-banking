import { IClient } from "./client";
import { IDocument } from "./document";

export interface IAccount extends IDocument{
    client: Partial<IClient>,
    ag: number,
    account_number: number,
    balance: number,
    password: string,
    debit: number,
    credit: number
}
