export default function Skeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
      <div className="flex justify-between items-center mb-2">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-4"></div>
      </div>
      <div className="text-2xl font-bold text-gray-900">
        <div className="h-6 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}
