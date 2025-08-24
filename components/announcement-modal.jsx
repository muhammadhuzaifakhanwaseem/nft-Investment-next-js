"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch("https://stocktitan.site/api/announcement")
        const data = await response.json()
        setAnnouncement(data.announcement)
      } catch (error) {
        console.error("Failed to fetch announcement:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnnouncement()

    const timer = setTimeout(() => {
      if (!isLoading && announcement) {
        setIsOpen(true)
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [isLoading, announcement])

  if (!isOpen || !announcement) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 text-slate-400 hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-green-400 mb-4">Note:</h2>

          <div className="text-slate-200 leading-relaxed mb-6">{announcement}</div>

          <div className="flex justify-end gap-3">
            <Button onClick={() => setIsOpen(false)} className="bg-green-600 hover:bg-green-700 text-white">
              Got it
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
