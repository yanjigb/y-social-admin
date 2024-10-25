import { guidelines } from "./constants/guide-line-list";

export default function SupportGuideLine() {
  return (

    <div className="box rounded-lg shadow-sm p-6 mt-4 w-full">
      <h2 className="box-header text-2xl font-bold text-gray-900 mb-6 dark:text-white">Support Guidelines</h2>

      <div className="box-body grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {guidelines.map((section) => (
          <div key={section.title} className="space-y-4 text-base">
            <div className="flex items-center space-x-2">
              <section.icon className="h-6 w-6 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
            </div>
            <ul className="space-y-2">
              {section.rules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-600 mr-2">•</span>
                  <span className="text-gray-600">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="box-footer mt-8 p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold text-indigo-900 mb-2">Important Note</h4>
        <p className="text-primary text-base">
          Our support team is committed to providing the best possible assistance. Following these guidelines helps us serve you more efficiently.
        </p>
      </div>
    </div>
  )
}
