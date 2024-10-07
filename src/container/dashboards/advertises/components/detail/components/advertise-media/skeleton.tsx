export default function Skeleton() {
  return (
    <div className="box animate-pulse">
      <div className="box-body">
        <div className="sm:flex items-center">
          <button type="button" className="flex-1" aria-labelledby="skeleton-button">
            <div className="object-cover aspect-video h-full w-full max-w-full max-h-[19.8125rem] bg-gray-200"></div>
          </button>
        </div>
      </div>
    </div>
  )
}
