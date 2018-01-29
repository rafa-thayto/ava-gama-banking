import { IAccount } from "./account";

type TransactionStatus = "pendente" | "completado" | "abortado";

export interface ITransaction {
    _id?: string,
    from: Partial<IAccount>,
    to: Partial<IAccount>,
    date: Date,
    value: number,
    status: TransactionStatus,
    msg: string,
    isCredit?: boolean,
    password?: string
}
