import { IClient } from "./client";

export interface IAccount {
    client: IClient,
    ag: number,
    account_number: number,
    balance: number,
    password: string
}
