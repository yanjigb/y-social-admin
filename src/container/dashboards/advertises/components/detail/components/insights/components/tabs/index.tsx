import { memo, useState } from "react"
import isEqual from "react-fast-compare"
import { useParams } from "react-router-dom"

import Overview from "./overview"
import Ctr from "./ctr"
import Cpc from "./cpc"
import Cost from "./cost"
import Cpi from "./cpi"

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { id } = useParams();

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {['Overview', 'CTR', 'CPC', 'CPI', 'Cost'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleActiveTab(tab.toLowerCase())}
              className={`py-4 px-6 text-sm font-medium ${activeTab === tab.toLowerCase()
                ? 'border-b-2 border-blue-500 text-secondary border-secondary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && <Overview advertiseID={id!} />}
      {activeTab === 'ctr' && <Ctr advertiseID={id!} />}
      {activeTab === 'cpc' && <Cpc advertiseID={id!} />}
      {activeTab === 'cpi' && <Cpi advertiseID={id!} />}
      {activeTab === 'cost' && <Cost advertiseID={id!} />}
    </div>
  )
}

export default memo(Tabs, isEqual)
