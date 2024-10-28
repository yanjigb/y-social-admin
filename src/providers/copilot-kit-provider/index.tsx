import { ReactNode } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

export default function CopilotKitProvider({ children }: { children: ReactNode }) {
  return (
    <CopilotKit
      publicApiKey={import.meta.env.VITE_COPILOT_API_KEY}
      headers={{
        "X-CopilotCloud-Public-API-Key": `Bearer ${import.meta.env.VITE_COPILOT_API_KEY}`,
        "Content-Type": "application/json"
      }}
    >
        {children}
    </CopilotKit>
  )
}
