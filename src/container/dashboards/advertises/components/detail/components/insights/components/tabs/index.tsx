import { memo, useState, useMemo } from "react"
import isEqual from "react-fast-compare"
import { useParams } from "react-router-dom"

import Overview from "./overview"
import Ctr from "./ctr"
import Cpc from "./cpc"
import Cost from "./cost"
import Cpi from "./cpi"

enum TabType {
  OVERVIEW = 'overview',
  CTR = 'ctr',
  CPC = 'cpc',
  CPI = 'cpi',
  COST = 'cost'
}

const TAB_CONFIG = [
  { id: TabType.OVERVIEW, label: 'Overview' },
  { id: TabType.CTR, label: 'CTR' },
  { id: TabType.CPC, label: 'CPC' },
  { id: TabType.CPI, label: 'CPI' },
  { id: TabType.COST, label: 'Cost' },
] as const;

const TAB_COMPONENTS = {
  [TabType.OVERVIEW]: Overview,
  [TabType.CTR]: Ctr,
  [TabType.CPC]: Cpc,
  [TabType.CPI]: Cpi,
  [TabType.COST]: Cost,
} as const;

const Tabs = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>(TabType.OVERVIEW);
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  const tabButtons = useMemo(() => (
    TAB_CONFIG.map(({ id, label }) => (
      <button
        key={id}
        onClick={() => setActiveTab(id)}
        className={`py-4 px-6 text-sm font-medium ${activeTab === id
            ? 'border-b-2 border-blue-500 text-secondary border-secondary'
            : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
      >
        {label}
      </button>
    ))
  ), [activeTab]);

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabButtons}
        </nav>
      </div>
      <ActiveComponent advertiseID={id!} />
    </div>
  )
}

export default memo(Tabs, isEqual)
