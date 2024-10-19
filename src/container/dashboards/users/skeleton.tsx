export default function Skeleton() {
  return (
    <div className="hidden fixed inset-0 z-50 overflow-hidden max-w-[25rem] border-0 right-0 bg-white dark:bg-gray-800">
      <div className="p-0">
        <div className="flex items-start p-6 border-b border-dashed border-gray-300 dark:border-gray-700">
          <div>
            <div className="avatar avatar-xxl rounded-full me-3 bg-gray-200 p-2">
              <img src="/images/default-avatar.svg" alt="" className="object-cover aspect-square rounded-full" />
            </div>
          </div>
          <div className="flex-grow w-full">
            <div className="flex items-center justify-between">
              <div className="font-semibold mb-1 text-gray-900 dark:text-white"></div>
              <div className="flex-shrink-0 p-0 transition-opacity text-gray-900 dark:text-white opacity-70 hover:opacity-100">
                <span className="sr-only"></span>
                <i className="ri-close-line leading-none text-lg"></i>
              </div>
            </div>
            <div className="mb-1 text-gray-700 dark:text-gray-300"></div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-4">
              <span>
                <i className="ri-map-pin-line me-1 align-middle"></i>
              </span>
            </div>
            <div className="flex mb-0">
              <div className="me-4">
                <div className="font-bold text-xl text-gray-900 dark:text-white mb-0"></div>
                <div className="mb-0 text-xs text-gray-600 dark:text-gray-400"></div>
              </div>
              <div className="me-4">
                <div className="font-bold text-xl text-gray-900 dark:text-white mb-0"></div>
                <div className="mb-0 text-xs text-gray-600 dark:text-gray-400"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 pt-6 flex flex-col gap-2 border-b border-dashed border-gray-300 dark:border-gray-700">
          <div>
            <div className="text-sm mb-1 font-semibold"></div>
            <div className="text-gray-600 dark:text-gray-400 mb-0"></div>
          </div>
          <div>
            <div className="text-sm mb-1 font-semibold"></div>
            <div className="text-gray-600 dark:text-gray-400 mb-0"></div>
          </div>
        </div>
        <div className="p-6 border-b border-dashed border-gray-300 dark:border-gray-700">
          <div className="mb-0">
            <div className="text-sm mb-2 font-semibold"></div>
            <div className="text-gray-600 dark:text-gray-400 mb-0"></div>
          </div>
        </div>
        <div className="p-6 border-b border-dashed border-gray-300 dark:border-gray-700">
          <div className="text-sm mb-2 me-4 font-semibold"></div>
          <div>
            <div className="flex items-center mb-2">
              <div className="me-2">
                <div className="avatar avatar-sm rounded-full bg-gray-200">
                  <i className="ri-mail-line align-middle text-sm"></i>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex items-center mb-2">
              <div className="me-2">
                <div className="avatar avatar-sm rounded-full bg-gray-200">
                  <i className="ri-phone-line align-middle text-sm"></i>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex items-center mb-0">
              <div className="me-2">
                <div className="avatar avatar-sm rounded-full bg-gray-200">
                  <i className="ri-map-pin-line align-middle text-sm"></i>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="p-6 border-b border-dashed border-gray-300 dark:border-gray-700 flex flex-col gap-2">
          <div className="text-sm mb-0 me-4 font-semibold"></div>
          <div className="flex gap-1">
            <div className="bg-gray-200 rounded p-2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
