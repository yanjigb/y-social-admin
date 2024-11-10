import { ReactNode } from "react";
import { Toaster } from "sonner";
import Loader from "./components/common/loader/loader";
import 'rc-slider/assets/index.css';
import "yet-another-react-lightbox/styles.css";
import 'react-quill/dist/quill.snow.css';

interface Props {
  children: ReactNode;
}

export default function MainProvider({ children }: Props) {
  return (
    <>
      <Loader />
      {children}
      <Toaster closeButton expand={true} position="top-right" richColors toastOptions={{
        classNames: {
          title: "text-xl"
        }
      }} />
    </>
  );
}
