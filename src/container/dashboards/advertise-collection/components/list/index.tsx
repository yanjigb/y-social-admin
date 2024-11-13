import { memo, useState } from "react";
import isEqual from "react-fast-compare";
import AdvertiseCard from "../advertise-card";
import { IAdvertise } from "../../../../../types/advertise";

interface AdvertiseCollectionListProps {
  list: IAdvertise[];
}

const AdvertiseCollectionList = ({ list }: AdvertiseCollectionListProps) => {
  const [visibleItems, setVisibleItems] = useState(5);
  const [statusFilter, setStatusFilter] = useState('all');

  const showMoreItems = () => {
    setVisibleItems(prevVisibleItems => Math.min(prevVisibleItems + 5, filteredAds.length))
  }

  const filteredAds = list.filter(ad => {
    if (statusFilter === 'all') return true
    return ad.status === statusFilter
  })

  return (
    <>
      <div className="flex items-center mb-6">
        <label htmlFor="status-filter" className="mr-2 text-gray-700">Filter by status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setVisibleItems(5)
          }}
          className="bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredAds.slice(0, visibleItems).map((ad) => (
          <AdvertiseCard ad={ad} />
        ))}
      </div>

      {
        visibleItems < filteredAds.length && (
          <div className="mt-8 text-center mx-auto">
            <button
              onClick={showMoreItems}
              className="bg-primary/20 hover:bg-primary hover:text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Show More
            </button>
          </div>
        )
      }
    </>
  )
}

export default memo(AdvertiseCollectionList, isEqual);
