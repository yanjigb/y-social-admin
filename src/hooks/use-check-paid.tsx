import { IFilteredTransaction, ITransactionRecord } from "../types/interfaces/transaction.interface";
import { GetAllTransaction } from "../services/payment.service";
import { useEffect, useState } from "react";

const useCheckPaid = () => {
  const [data, setData] = useState<any>([]);
  const [errors, setErrors] = useState<any>(null);
  const [isPaid, setIsPaid] = useState<boolean>(false);

  const fetchTransactionList = async () => {
    try {
      const response = await GetAllTransaction();
      const { data: responseData, error: responseError } = response;

      if (responseError) {
        setErrors(responseError);
        return;
      }

      const records: ITransactionRecord[] = responseData.records;
      const filteredTransactionsIncome: IFilteredTransaction[] = records
        .filter((record: any) => record.amount > 0) // Filter for amounts greater than 0
        .map(({ id, amount, tid, description, bankSubAccId, when }) => ({
          id,
          amount,
          tid,
          description,
          bankSubAccId,
          when
        }));

      setData(filteredTransactionsIncome);

      const checkUserHasPaid = true

      if (checkUserHasPaid && !isPaid) {
        setIsPaid(true);
      }

    } catch (error) {
      setErrors(error);
    }
  };

  useEffect(() => {
    fetchTransactionList();
  }, []);

  return { data, errors, isPaid };
}

export default useCheckPaid;
