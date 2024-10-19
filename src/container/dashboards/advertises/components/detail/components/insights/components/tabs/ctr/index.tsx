import { memo } from "react";
import isEqual from "react-fast-compare";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockDailyData = [
  { name: "Mon", impressions: 4000, clicks: 400, conversions: 40, spend: 1000 },
  { name: "Tue", impressions: 3000, clicks: 300, conversions: 30, spend: 800 },
  { name: "Wed", impressions: 2000, clicks: 200, conversions: 20, spend: 600 },
  { name: "Thu", impressions: 2780, clicks: 278, conversions: 27, spend: 750 },
  { name: "Fri", impressions: 1890, clicks: 189, conversions: 18, spend: 500 },
  { name: "Sat", impressions: 2390, clicks: 239, conversions: 23, spend: 650 },
  { name: "Sun", impressions: 3490, clicks: 349, conversions: 34, spend: 900 },
]

const CTR = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Click-Through Rate (CTR)</h3>
      <p className="text-sm text-gray-600 mb-4">Daily CTR for the past week</p>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockDailyData.map(day => ({ ...day, ctr: (day.clicks / day.impressions) * 100 }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ctr" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default memo(CTR, isEqual);
