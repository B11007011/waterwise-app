import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-teal-700 mx-auto" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">載入中</h3>
        <p className="mt-1 text-sm text-gray-500">正在載入全國水資源數據...</p>
      </div>
    </div>
  )
}
