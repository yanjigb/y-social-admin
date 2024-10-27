import { memo } from "react"
import isEqual from "react-fast-compare"
import Pageheader from "../../../components/common/pageheader/pageheader";
import Stats from '../../../components/business/dashboards/support-ticket/stats';
import SupportTicketTable from "../../../components/business/dashboards/support-ticket/support-ticket-table";
import SampleEmail from "../../../components/business/dashboards/support-ticket/sample-email";
import EmailSupport from "../../../components/business/dashboards/support-ticket/email-support";
import SupportGuideLine from "../../../components/business/dashboards/support-ticket/support-guide-line";

const SupportTicket = () => {
  return (
    <>
      <Pageheader
        currentpage="Support Ticket"
        activepage="Dashboards"
        mainpage="Support Ticket"
      />

      <SupportGuideLine />
      <SampleEmail />
      <EmailSupport />
    </>
  )
}

export default memo(SupportTicket, isEqual);
