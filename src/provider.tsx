import { ReactNode } from "react";
import { Toaster } from "sonner";
import Loader from "./components/common/loader/loader";
import 'rc-slider/assets/index.css';
import "yet-another-react-lightbox/styles.css";
import CopilotKitProvider from "./providers/copilot-kit-provider";

interface Props {
  children: ReactNode;
}

export default function MainProvider({ children }: Props) {
  return (
    <CopilotKitProvider>
      <Loader />
      {children}
      <Toaster closeButton expand={true} position="top-right" richColors toastOptions={{
        classNames: {
          title: "text-xl"
        }
      }} />
    </CopilotKitProvider>
  );
}
