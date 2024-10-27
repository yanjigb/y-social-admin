import { File } from "lucide-react";
import { sampleEmail } from "./constant/sample-email";
import { toast } from "sonner";

export default function SampleEmail() {
  const onCopy = () => {
    navigator.clipboard.writeText(sampleEmail)
    toast.success("Copy Success");
  }

  return (
    <div className="box border-t pt-6">
      <div className="box-header flex items-center space-x-2 mb-4">
        <File className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sample Email Template</h3>
      </div>

      <div className="box-body bg-gray-50 rounded-lg p-4">
        <p className="text-gray-600 mb-4">
          To help you write an effective support email, use this template as a guide. Copy and modify it according to your needs:
        </p>

        <div className="relative">
          <pre className="box-content text-base bg-white p-4 rounded-lg text-gray-700 whitespace-pre-wrap font-mono border border-gray-200">
            {sampleEmail}
          </pre>

          <button
            onClick={onCopy}
            className="px-3 py-1 mt-2 text-sm bg-primary text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Copy
          </button>
        </div>

      </div>

      <p className="box-footer text-base text-gray-500 mt-10">
        Pro tip: Replace all text in [brackets] with your specific information
      </p>
    </div>
  )
}
