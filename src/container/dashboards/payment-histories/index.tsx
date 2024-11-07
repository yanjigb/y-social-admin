import { memo } from "react";
import isEqual from "react-fast-compare";
import PaymentHistoryTable from "./components/payment-history-table";

const PaymentHistories = () => {
  return <PaymentHistoryTable />;
};

export default memo(PaymentHistories, isEqual);
