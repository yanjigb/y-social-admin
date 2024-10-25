import { memo } from "react"
import isEqual from "react-fast-compare"
import Pageheader from "../../../components/common/pageheader/pageheader";
import Stats from '../../../components/business/dashboards/support-ticket/stats';
import SupportTicketTable from "../../../components/business/dashboards/support-ticket/support-ticket-table";

const SupportTicket = () => {
  return (
    <>
      <Pageheader
        currentpage="Support Ticket"
        activepage="Dashboards"
        mainpage="Support Ticket"
      />

      <div className="grid grid-cols-12 gap-x-6">
        <div className="xl:col-col-12 col-span-12">
          <div className="xxl:col-span-12 xl:col-span-12 col-span-12 flex flex-col gap-5">
            <Stats />

            <div className="box">
              <div className="box-body">
                <SupportTicketTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(SupportTicket, isEqual);
