"use client"
import { MessageCircle, Users, Send } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
export const SupportsData = () => {

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

    return (
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
        </CardContent>
    )
}
