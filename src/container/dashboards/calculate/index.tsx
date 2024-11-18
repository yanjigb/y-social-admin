
import Pageheader from '../../../components/common/pageheader/pageheader'
import Formula from './components/formula'
import Sample from './components/sample'
import Explain from './components/explain'

export default function Calculate() {
  return (
    <>
      <Pageheader
        currentpage="Ad Insights Calculation System"
        activepage="Dashboards"
        mainpage="Ad Insights Calculation System"
      />

      <div className="grid grid-cols-12 gap-x-6 mb-6">
        <div className="xl:col-col-12 col-span-12">
          <div className="xxl:col-span-12 xl:col-span-12 col-span-12">
            <div className="flex flex-col gap-6">
              <div className="box !mb-0">
                <div className="box-header flex flex-wrap">
                  <h1 className="text-3xl font-bold">Ad Insights Calculation System</h1>
                  <p className="text-lg text-gray-500">
                    This document outlines how our system calculates ad insights in the admin page, providing a comprehensive view of ad performance metrics.
                  </p>
                </div>
              </div>

              <Formula />
              <Sample />
              <Explain />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
