import { CopilotPopup } from "@copilotkit/react-ui";

export default function AppCopilotPopup() {
  return (
    <CopilotPopup
      instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
      labels={{
        title: "YANJI SOCIAL BOT",
        initial: 'Welcome to the Yanji Social Admin! How can I help you?',
      }}
      clickOutsideToClose={false}
    />
  )
}
