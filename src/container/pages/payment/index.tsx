import { Button } from "@mui/material";
import { MouseEvent, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import useQRPayment from "../../../hooks/use-qr-payment";
import { useCopyToClipboard } from 'usehooks-ts'
import { PAYMENT_DESCRIPTION } from "./constant";
import useCheckPaid from "../../../hooks/use-check-paid";

export default function Payment() {
  const [_, copy] = useCopyToClipboard();
  const { qrData, loading, error, generateQRCode } = useQRPayment();
  const { data, isPaid, errors } = useCheckPaid();

  useEffect(() => {
    generateQRCode(
      PAYMENT_DESCRIPTION.accountNo,
      PAYMENT_DESCRIPTION.accountName,
      PAYMENT_DESCRIPTION.bankId,
      PAYMENT_DESCRIPTION.description,
      PAYMENT_DESCRIPTION.additionalInfo,
      PAYMENT_DESCRIPTION.template
    );
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.getAttribute("data-value")!;

    copy(text)
      .then(() => {
        toast.success("Copy successfully")
      })
      .catch(() => {
        toast.error("Something went wrong")
      })
  }

  return (
    <div className="container-lg p-3">
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <LazyLoadImage src="/images/brands/timo-bank-logo.png" width="160" height="160" className="aspect-square object-cover" />

            <ul className="flex flex-col gap-1 list-disc">
              <li className="flex items-center gap-2 text-base">
                <span>STK: </span>
                <b>123456789</b>
              </li>
              <li className="flex items-center gap-2 text-base">
                <span>Người nhận: </span>
                <b>example user</b>
              </li>
              <li className="flex items-center gap-2 text-base flex-wrap">
                <span>Nội dung chuyển khoản: </span>
                <b className="text-primary text-xl">abc 123</b>
                <Button variant="contained" name="button" type="button" onClick={(e) => { handleCopy(e) }}>Copy</Button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-danger">Quét mã QR Code để nội dung chuyển khoản chính xác</p>
            {qrData && <LazyLoadImage src={qrData} width="460" height="460" className="aspect-square object-cover" />}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-danger font-bold">
            Lưu ý:
          </span>

          <ul className="list-disc">
            <li>
              <span className="text-danger">Vui lòng điền chính xác nội dung chuyển khoản để thực hiện nạp tiền tự động.</span>
            </li>
            <li>
              <span>
                Tiền sẽ vào tài khoảng trong vòng 1-20 phút kể từ khi giao dịch thành công. Tuy nhiên đôi lúc do một vài lỗi khách quan, tiền có thể sẽ vào chậm hơn một chút.
              </span>
            </li>
            <li>
              <span className="text-danger">Vietcombank trong khoảng 23-3h không thể kiểm tra lịch sử giao dịch</span>
              <span>
                , các giao dịch trong khung giờ này có thể mất từ 15 phút đến 2 giờ tiền mới vào tài khoản. Bạn có thể tránh nạp tiền trong khung giờ này để đỡ mất thời gian chờ đợi nhé.
              </span>
            </li>
            <li>
              <div className="flex items-center gap-1 flex-wrap">
                <span>
                  Nếu quá lâu không thấy cập nhật số dư, Vui lòng liên hệ hỗ trợ viên:
                </span>
                <Link to="#" className="font-bold text-primary">
                  Tại đây
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

Payment.displayName = "Payment";
