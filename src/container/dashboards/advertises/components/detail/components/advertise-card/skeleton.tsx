export default function Skeleton() {
  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
      <div className="object-cover aspect-video h-full w-full max-w-full max-h-[19.8125rem] bg-gray-200"></div>

      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="w-full h-10 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}
