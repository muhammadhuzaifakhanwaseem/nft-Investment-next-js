"use client"

import { ThumbsUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SuccessAlert(isOpen) {
    return (
        <>
            {isOpen ?
                <>
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-xs z-30"
                    />
                    <Card className="fixed z-40 top-[30%] left-[12%] w-full max-w-xs bg-gray-900 rounded-2xl shadow-lg p-6 text-center">
                        <CardContent className="flex flex-col items-center justify-center p-0">
                            <div className="relative mb-6">
                                <div className="relative w-24 h-24 flex items-center justify-center">
                                    <ThumbsUp className="w-20 h-20 text-green-500 fill-green-500" />
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                                        <div className="absolute w-4 h-4 bg-green-400 rounded-full -top-2 left-1/4 animate-pulse" />
                                        <div className="absolute w-3 h-3 bg-green-400 rounded-full top-1/4 right-1/4 animate-pulse" />
                                        <div className="absolute w-5 h-5 bg-green-400 rounded-full bottom-1/4 left-1/3 animate-pulse" />
                                        <div className="absolute w-3 h-3 bg-green-400 rounded-full top-1/3 left-3/4 animate-pulse" />
                                    </div>
                                    <Star className="absolute top-4 left-4 w-6 h-6 text-yellow-400 fill-yellow-400 rotate-12" />
                                    <Star className="absolute bottom-6 right-4 w-5 h-5 text-yellow-400 fill-yellow-400 -rotate-12" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-green-300 mb-2">Great, all set!</h2>
                            <p className="text-white text-sm mb-6">Your changes were successfully saved.</p>
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-xl">
                                Okay!
                            </Button>
                        </CardContent>
                    </Card>
                </>
                : ""}
        </>
    )
}
