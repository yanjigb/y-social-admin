import { useState } from 'react';
import axios from 'axios';

interface QRResponse {
  data: {
    qrDataURL: string;
  }
}

const useQRPayment = () => {
  const [qrData, setQrData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateQRCode = async (
    accountNo: string,
    accountName: string,
    acqId: string,
    addInfo: string,
    amount: string,
    template: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<QRResponse>(import.meta.env.VITE_VIETQR_BASE_URL, {
        accountNo,
        accountName,
        acqId,
        addInfo,
        amount,
        template,
      }, {
        headers: {
          'x-client-id': import.meta.env.VITE_VIETQR_CLIENT_ID,
          'x-api-key': import.meta.env.VITE_VIETQR_API_KEY,
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data.data)
      setQrData(response.data.data.qrDataURL);
    } catch (err: any) {
      setError(err.response ? err.response.data : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { qrData, loading, error, generateQRCode };
};

export default useQRPayment;
