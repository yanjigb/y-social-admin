import { Mail } from "lucide-react";

export default function EmailSupport() {
  return (
    <div className="box">
      <div className="box-body">
        <div className="border-t">
          <div className="box-header flex items-center space-x-2 mb-4 dark:text-white">
            <Mail className="h-6 w-6 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Support</h3>
          </div>

          <div className="box-body bg-gray-50 rounded-lg p-4 text-base">
            <p className="text-gray-600 mb-2">For non-urgent inquiries or detailed technical issues, you can reach our support team via email:</p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">General Support:</span>
                <a href="mailto:support@company.com" className="text-primary hover:underline">
                  support@yanjisocial.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-700">Technical Issues:</span>
                <a href="mailto:tech@company.com" className="text-primary hover:underline">
                  tech@yanjisocial.com
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Email response time: Within 1-2 hours during business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
