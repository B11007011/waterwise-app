"use client"

import { useState, useEffect, useRef } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface QRScannerProps {
  onScan: (result: string) => void
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const webcamRef = useRef<Webcam>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isCameraAvailable, setIsCameraAvailable] = useState(true)
  
  const videoConstraints = {
    width: { min: 320, ideal: 640, max: 1280 },
    height: { min: 240, ideal: 480, max: 720 },
    facingMode: facingMode
  }

  // For demo/mock purposes - in a real app, you would use a proper QR code scanner library
  const simulateScan = () => {
    const mockQRData = `{"merchantId": "A123456789", "items": [{"name": "環保洗衣精", "waterCredit": 120}, {"name": "有機蔬菜", "waterCredit": 85}], "totalWaterCredit": 205, "date": "${new Date().toISOString()}"}`
    onScan(mockQRData)
  }

  const switchCamera = () => {
    setFacingMode(prevMode => prevMode === "user" ? "environment" : "user")
  }

  useEffect(() => {
    // Check for camera permission
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        setIsLoading(false)
        setIsCameraAvailable(true)
      })
      .catch((err) => {
        console.error("Camera error:", err)
        setError("無法存取相機，請確認已授權使用相機權限。")
        setIsCameraAvailable(false)
        setIsLoading(false)
      })

    // Cleanup
    return () => {
      // Stop the video stream when component unmounts
      if (webcamRef.current && webcamRef.current.video) {
        const stream = webcamRef.current.video.srcObject as MediaStream
        if (stream) {
          const tracks = stream.getTracks()
          tracks.forEach(track => track.stop())
        }
      }
    }
  }, [])

  // Handle camera errors
  const handleCameraError = (error: string | DOMException) => {
    console.error("Camera error:", error)
    setError("相機錯誤，請重新嘗試或使用不同的相機。")
    setIsCameraAvailable(false)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-100">
        <div className="w-10 h-10 border-t-2 border-teal-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">載入相機中...</p>
      </div>
    )
  }

  if (error || !isCameraAvailable) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-100 p-4">
        <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
        <p className="text-center text-red-500 font-medium">{error || "相機不可用"}</p>
        <p className="text-center text-gray-500 mt-2">請確認相機權限或使用不同的裝置</p>
        <Button className="mt-4" onClick={simulateScan}>
          模擬掃描 (示範用)
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full bg-black">
        <div className="aspect-[4/3] max-h-[70vh] w-full overflow-hidden">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMediaError={handleCameraError}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Scanning overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2/3 max-w-[200px] aspect-square border-2 border-teal-500 rounded-lg bg-transparent relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-teal-500 rounded-tl"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-teal-500 rounded-tr"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-teal-500 rounded-bl"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-teal-500 rounded-br"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-teal-500/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 p-4">
        <Button variant="outline" onClick={switchCamera} className="flex items-center justify-center w-full sm:w-auto">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
          >
            <path d="M22 2H2" />
            <path d="M12 14v-2" />
            <path d="M12 22v-4" />
            <path d="M14 12h-4" />
            <path d="M22 18v-3a5 5 0 0 0-5-5" />
            <path d="M2 6v3a5 5 0 0 0 5 5" />
          </svg>
          切換相機
        </Button>
        <Button onClick={simulateScan} className="w-full sm:w-auto">模擬掃描 (示範用)</Button>
      </div>
    </div>
  )
}
