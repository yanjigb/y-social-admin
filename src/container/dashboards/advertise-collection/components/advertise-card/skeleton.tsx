export default function Skeleton() {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col animate-pulse">
      <div className="relative h-40 bg-gray-300"></div>
      <div className="p-4 flex-grow">
        <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="p-4 pt-0">
        <div className="h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}
