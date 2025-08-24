"use client"
import { MessageCircle, Users, X, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CustomerSupportModal({ isOpen, onClose }) {
  const whatsappNumber = "+923001234567" // Replace with actual WhatsApp number if needed
  const whatsappChatLink = "https://wa.me/message/Y6URYZHN4UQNF1"
  const whatsappGroupLink = "https://chat.whatsapp.com/Cu7aLUqkrHKD3KmlLA8TFO?mode=ems_copy_t"
  const whatsappChannelLink = "https://whatsapp.com/channel/0029VbBQhkd1NCrStgSaGP1X"

  const telegramGroupLink = "https://t.me/+MQGeKfl-lZEyMDhk"
  const telegramChannelLink = "https://t.me/mepxx9"
  const telegramChatLink = "https://telegram.org/dl"

  const openWhatsAppChat = () => {
    window.open(whatsappChatLink, "_blank")
  }

  const joinWhatsAppGroup = () => {
    window.open(whatsappGroupLink, "_blank")
  }

  const joinWhatsAppChannel = () => {
    window.open(whatsappChannelLink, "_blank")
  }

  const joinTelegramGroup = () => {
    window.open(telegramGroupLink, "_blank")
  }

  const joinTelegramChannel = () => {
    window.open(telegramChannelLink, "_blank")
  }

  const openTelegramChat = () => {
    window.open(telegramChatLink, "_blank")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-green-800/50">
        <CardHeader className="border-b border-green-800/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-400" />
              Customer Support
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-green-400" />
              WhatsApp Support
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={openWhatsAppChat}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Chat Support
              </Button>
              <Button
                onClick={joinWhatsAppGroup}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Join Group
              </Button>
              <Button
                onClick={joinWhatsAppChannel}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Join Channel
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Send className="h-4 w-4 text-blue-400" />
              Telegram Support
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={openTelegramChat}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Get Telegram
              </Button>
              <Button
                onClick={joinTelegramGroup}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Join Group
              </Button>
              <Button
                onClick={joinTelegramChannel}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Join Channel
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-800/30">
            <h4 className="text-green-400 font-semibold mb-2">Still need help?</h4>
            <p className="text-gray-300 text-sm mb-3">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-green-400 border-green-400">
                Response time: 5-10 minutes
              </Badge>
              <Badge variant="outline" className="text-blue-400 border-blue-400">
                24/7 Available
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
