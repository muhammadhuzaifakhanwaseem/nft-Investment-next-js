"use client"

import { useEffect, useState } from "react"
import { X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HelpButtonGuide({ onClose }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Show the guide after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 animate-in fade-in duration-300" />

            {/* Spotlight effect on help button */}
            <div
                className="absolute bottom-40 right-4 w-12 h-12 rounded-full bg-white/20 animate-pulse"
                style={{ boxShadow: "0 0 0 20px rgba(255,255,255,0.1), 0 0 0 40px rgba(255,255,255,0.05)" }}
            />

            {/* Guide tooltip */}
            <div className="absolute bottom-56 right-4 pointer-events-auto animate-in slide-in-from-bottom-4 duration-500">
                <div className="bg-gray-900 border border-green-500/40 rounded-2xl p-4 max-w-xs shadow-2xl">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-green-600 rounded-lg">
                                <MessageCircle className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="text-white font-semibold text-sm">Need Help?</h3>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClose}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>

                    <p className="text-gray-300 text-xs mb-3 leading-relaxed">
                        Click this button anytime to get instant help with deposits, withdrawals, investments, and more!
                    </p>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleClose}
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs h-8"
                        >
                            Got it!
                        </Button>
                    </div>
                </div>

                {/* Arrow pointing to help button */}
                <div className="absolute -bottom-2 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900" />
            </div>

            {/* Pulsing ring around help button */}
            <div className="absolute bottom-40 right-4 w-12 h-12 rounded-full border-2 border-green-400 animate-ping" />
            <div className="absolute bottom-40 right-4 w-12 h-12 rounded-full border-2 border-green-400/50 animate-ping animation-delay-75" />
        </div>
    )
}
