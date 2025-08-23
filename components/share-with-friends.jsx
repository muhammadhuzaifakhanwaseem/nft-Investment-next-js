"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Share2, Users } from "lucide-react"
import { toast } from "sonner"

export function ShareWithFriends({ user }) {
  const [copied, setCopied] = useState(false)

  const domain = typeof window !== "undefined" ? window.location.origin : ""
  const referralLink = `${domain}/register?referred_by=${user?.id}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      toast("Link copied!", {
        description: "Referral link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy:", err)
      toast({
        title: "Copy failed",
        description: "Please copy the link manually.",
        variant: "destructive",
      })
    }
  }

  const shareNatively = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join MEP-X",
          text: "Check out MEP-X investment app!",
          url: referralLink,
        })
      } catch (err) {
        console.error("[v0] Native share failed:", err)
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <Card className="bg-slate-900 border-slate-800 shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
          <Users className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-white text-xl">Share With Friends</CardTitle>
        <CardDescription className="text-slate-400">Invite your friends and earn rewards together</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-green-400">Your Referral Link</label>
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="bg-slate-800 border-slate-700 text-slate-300 font-mono text-sm"
            />
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="icon"
              className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white bg-transparent"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button onClick={shareNatively} className="bg-green-600 hover:bg-green-700 text-white">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white bg-transparent"
          >
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>

        <div className="bg-slate-800 rounded-lg p-4 border border-green-600/20">
          <h4 className="text-green-400 font-medium mb-2">Referral Benefits</h4>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Get bonus points for each friend who joins</li>
            <li>• Unlock exclusive achievement levels</li>
            <li>• Earn additional investment rewards</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
