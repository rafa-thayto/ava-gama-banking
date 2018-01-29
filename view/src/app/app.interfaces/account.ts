import { IClient } from "./client";

export interface IAccount {
    client: Partial<IClient>,
    ag: number,
    account_number: number,
    balance: number,
    password: string,
    debit: number,
    credit: number
}
