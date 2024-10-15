export default function Skeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 animate-pulse">
      <div className="box">
        <div className="box-body flex flex-col gap-3">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="box">
        <div className="box-body flex flex-col gap-3">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}
