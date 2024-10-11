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

      setData(responseData);

      const records = responseData.records;

      const checkUserHasPaid = records.some((record: any) =>
        record.description.includes("Test")
      );

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
