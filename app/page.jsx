"use client"

import { Button } from "@/components/ui/button"
import {
  HelpCircle,
  Lock,
  Fingerprint,
  Banknote,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

export default function page() {
  return (
    <div className="h-[92vh] bg-gradient-to-br from-[gray-500] to-[gray-800] relative overflow-hidden flex flex-col">
      {/* Background Video */}
      <video
        src="/bg-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay (optional blur/tint) */}
      <div className="absolute inset-0 z-0" />
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between flex-1 px-4 pb-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 mt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#008080] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">FB</span>
            </div>
            <div>
              <h1 className="text-[#008080] font-bold text-xl">faysalbank</h1>
              <p className="text-gray-200 text-sm">12.0.44</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/50 text-gray-700 hover:bg-white/70"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
        <div>
          {/* Login Section */}
          <div className="w-full max-w-xs mx-auto flex flex-col items-center gap-4 mb-4">
            <div className="w-full flex justify-center gap-3 items-center">
              <Link href={'/login'} className="flex-1">
                <Button className="w-full bg-green-400 text-white text-lg font-semibold py-7 rounded-xl shadow-lg hover:bg-[#006666]">
                  Login
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-12 h-14 rounded-xl bg-gray-900/80 border-none shadow-lg flex items-center justify-center text-white hover:bg-white/70"
              >
                <Lock className="h-8 w-8" />
              </Button>
              <Button
                variant="outline"
                className="w-12 h-14 rounded-xl bg-gray-900/80 border-none shadow-lg flex items-center justify-center text-white hover:bg-white/70"
              >
                <Fingerprint className="h-8 w-8" />
              </Button>
            </div>
          </div>
          {/* Register Section */}
          <div className="w-full max-w-xs mx-auto flex flex-col items-center gap-4 mb-4">
            <div className="w-full flex justify-center gap-3 items-center">
              <Link href={'/register'} className="flex-1">
                <Button className="w-full bg-gray-800 hover:bg-gray-800/30 py-7 border-b-amber-50 text-white border border-gray-800/30">
                  Register
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-12 h-14 rounded-xl bg-gray-900/80 border-none shadow-lg flex items-center justify-center text-white hover:bg-white/70"
              >
                <Banknote className="h-8 w-8" />
              </Button>
              <Button
                variant="outline"
                className="w-12 h-14 rounded-xl bg-gray-900/80 border-none shadow-lg flex items-center justify-center text-white hover:bg-white/70"
              >
                <MessageCircle className="h-8 w-8" />
              </Button>
            </div>
          </div>
          {/* Social Buttons */}
          <div className="w-full max-w-xs mx-auto flex flex-col gap-3">
            <Button
              variant="outline"
              disabled
              className="w-full border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Sign up with Apple
            </Button>
            <Button
              variant="outline"
              disabled
              className="w-full border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Sign up with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
