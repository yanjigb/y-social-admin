export interface ITransactionRecord {
    id: number;
    amount: number;
    tid: string;
    description: string;
    bankSubAccId: string;
    when: string;
}

export interface IFilteredTransaction {
    id: number;
    amount: number;
    tid: string;
    description: string;
    bankSubAccId: string;
    when: string;
}

