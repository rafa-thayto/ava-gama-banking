import { IAccount } from "./account";

type TransactionStatus = "pendente" | "completado" | "abortado";

export interface ITransaction {
    from: IAccount,
    to: IAccount,
    date: Date,
    value: number,
    status: TransactionStatus,
    msg: string
}
