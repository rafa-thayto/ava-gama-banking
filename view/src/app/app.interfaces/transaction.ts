import { IAccount } from "./account";
import { IDocument } from "./document";

type TransactionStatus = "pendente" | "completado" | "abortado";

export interface ITransaction extends IDocument{
    from: Partial<IAccount>,
    to: Partial<IAccount>,
    date: Date,
    value: number,
    status: TransactionStatus,
    msg: string,
    isCredit?: boolean,
    password?: string
}
