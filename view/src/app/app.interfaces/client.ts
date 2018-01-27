import { IAccount } from "./account";

export interface IClient {
    name: string;
    document: number,
    accounts: IAccount[]
}
