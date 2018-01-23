import { IClient } from "./client";

export interface IAccount {
    client: IClient,
    ag: number,
    number: number,
    balance: number,
    password: string
}
