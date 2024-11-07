import { Button } from "@mui/material";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import useQRPayment from "../../../hooks/use-qr-payment";
import { useCopyToClipboard } from 'usehooks-ts'
import { PAYMENT_DESCRIPTION } from "./constant";
import useCheckPaid from "../../../hooks/use-check-paid";
import { GetUserPaid } from "../../../services/payment.service";
import AppMarquee from "../../../components/features/app-marquee";
import { getDynamicRoute } from "../../../lib/get-dynamic-route";
import { RouteNames } from "../../../constants/routes";
import useCurrentUser from "../../../hooks/use-current-user";

export default function Payment() {
  const [_, copy] = useCopyToClipboard();
  const { qrData, loading, error, generateQRCode } = useQRPayment();
  const { data, isPaid, errors } = useCheckPaid();
  const { user } = useCurrentUser();

  useEffect(() => {
    data.map((transaction: any) => {
      console.log(transaction)
    })

    console.log(data)
  }, [data, isPaid, errors]);


  useEffect(() => {
    setInterval(async () => {
      await GetUserPaid();
    }, 1000000)
  }, [])

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
  if (error) {
    toast.error("Something went wrong");
  }

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.getAttribute("data-value")!;
    copy(text)
    toast.success("Copy successfully");
  }

  return (
    <div className="flex flex-col gap-4 mb-4">
      <AppMarquee content='If our feature has any problems or mistakes, please contact us as soon as possible. We’re glad to hear from you 🤠' />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <LazyLoadImage src="/images/brands/timo-bank-logo.png" width="160" height="160" className="aspect-square object-cover" />

          <ul className="flex flex-col gap-1 list-none">
            <li className="flex items-center gap-2 text-base">
              <span>STK: </span>
              <b>9021111132068</b>
            </li>
            <li className="flex items-center gap-2 text-base">
              <span>Người nhận: </span>
              <b>Nguyễn Trần Gia Bảo</b>
            </li>
            <li className="text-base">
              <span>Nội dung chuyển khoản: </span>
              <div className="flex items-center gap-2 flex-wrap">
                <b className="text-primary text-xl">TK USER {user?._id}</b>
                <Button data-value={`TK USER ${user?._id}`} variant="contained" name="button" type="button" onClick={(e) => { handleCopy(e) }}>Copy</Button>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center gap-3">
          {
            qrData ? (
              <>
                <p className="text-center text-danger">Quét mã QR Code để nội dung chuyển khoản chính xác</p>
                <LazyLoadImage src={qrData} width="460" height="460" className="aspect-square object-cover" />
              </>
            ) : (
              <>
                <LazyLoadImage src="/images/404-square-sm.jpg" width="460" height="460" className="aspect-square object-cover" />
                <p className="text-center text-danger">Something went wrong with QR Code. Please contact our support to fix it.</p>
                <Link to={getDynamicRoute(RouteNames.SUPPORT_TICKET)} className="font-bold text-primary hover:underline">
                  Contact Support Here
                </Link>
              </>
            )
          }
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-danger font-bold">
          Lưu ý:
        </span>

        <ul className="list-disc px-4">
          <li>
            <span className="text-danger">Vui lòng điền chính xác nội dung chuyển khoản để thực hiện nạp tiền tự động.</span>
          </li>
          <li>
            <span className="text-danger">
              Sau 1-2 phút nếu tiền chưa vào tài khoản, vui lòng tải lại trang để cập nhật lại số dư tài khoản.
            </span>
          </li>
          <li>
            <span>
              Tiền sẽ vào tài khoản trong vòng 1-20 phút kể từ khi giao dịch thành công. Tuy nhiên đôi lúc do một vài lỗi khách quan, tiền có thể sẽ vào chậm hơn một chút.
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
              <Link to={getDynamicRoute(RouteNames.SUPPORT_TICKET)} className="font-bold text-primary hover:underline">
                Tại đây
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

Payment.displayName = "Payment";
