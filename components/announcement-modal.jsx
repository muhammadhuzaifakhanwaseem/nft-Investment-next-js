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
    }, 8000)

    return () => clearTimeout(timer)
  }, [isLoading, announcement])

  if (!isOpen || !announcement) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-2 sm:px-4">
      <Button
        size="icon"
        className="absolute bg-red-700 z-50 top-2 right-2 text-slate-200 hover:text-white"
        onClick={() => setIsOpen(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="relative w-full max-w-lg mx-auto bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close button */}

        {/* Content */}
        <section className="w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-4 sm:p-6">
          <div className="w-full text-center bg-white/5 backdrop-blur-md rounded-lg sm:rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-8">
            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Welcome to <span className="text-emerald-300">MEPx99.com</span>
              <span className="block text-base sm:text-lg md:text-xl mt-2 font-semibold text-emerald-200/90">
                Magic Energy Provider
              </span>
            </h1>

            {/* Social / Update Note */}
            <p className="mt-4 text-slate-300 text-sm sm:text-base">
              Stay updated by joining our official platforms:
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://whatsapp.com/channel/0029VbBQhkd1NCrStgSaGP1X"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-emerald-200 hover:bg-emerald-500/20 transition text-center"
              >
                <span className="text-sm font-semibold">👉 WhatsApp Channel</span>
                <span className="text-xs opacity-80 group-hover:opacity-100">
                  Daily updates & announcements
                </span>
              </a>

              <a
                href="https://t.me/mepxx99"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-lg sm:rounded-xl border border-sky-400/40 bg-sky-500/10 px-4 py-3 text-sky-200 hover:bg-sky-500/20 transition text-center"
              >
                <span className="text-sm font-semibold">👉 Telegram Channel</span>
                <span className="text-xs opacity-80 group-hover:opacity-100">
                  Global investment news & announcement
                </span>
              </a>
            </div>

            {/* Support */}
            <div className="mt-6 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 p-4 sm:p-5 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-slate-200 font-semibold">📞 Customer Service</p>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    24/7 Support — we’ve got you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full sm:w-auto">
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/30 px-3 py-2 sm:px-4 sm:py-3">
                    <p className="text-emerald-300 text-xs">Deposit Time</p>
                    <p className="text-white font-medium text-sm">10 AM – 12 PM</p>
                  </div>
                  <div className="rounded-lg bg-sky-500/10 border border-sky-400/30 px-3 py-2 sm:px-4 sm:py-3">
                    <p className="text-sky-300 text-xs">Withdrawal Time</p>
                    <p className="text-white font-medium text-sm">12 PM – 9 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA / Tagline */}
            <p className="mt-6 sm:mt-8 text-emerald-200 font-semibold tracking-wide text-sm sm:text-base">
              💡 Invest with Trust — Grow with Energy
            </p>

            {/* Optional subtle footer */}
            <div className="mt-4 sm:mt-6 text-[10px] sm:text-[11px] text-slate-400">
              MEPx99 • Magic Energy Provider
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
