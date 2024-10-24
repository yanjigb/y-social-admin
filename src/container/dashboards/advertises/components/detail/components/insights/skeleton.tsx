export default function Skeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="box">
          <div className="box-body">
            <div className="flex flex-col gap-4">
              <div className="h-5 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="box-body">
            <div className="flex flex-col gap-4">
              <div className="h-5 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="box-body">
            <div className="flex flex-col gap-4">
              <div className="h-5 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
