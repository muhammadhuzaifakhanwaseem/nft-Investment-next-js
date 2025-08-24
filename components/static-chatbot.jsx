"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowLeft, Bot, User, Globe } from "lucide-react"

const chatDataEnglish = [
  {
    id: "deposits",
    text: "How to Deposit Money",
    children: [
      {
        id: "deposit-methods",
        text: "What deposit methods are available?",
        answer: "You can deposit money using Bank Transfer, Easypaisa, or JazzCash.",
      },
      {
        id: "deposit-limits",
        text: "What are the deposit limits?",
        answer: "There is no limit on deposits. The more you deposit, the more profit and rewards you can earn.",
      },
      {
        id: "deposit-fees",
        text: "Are there any deposit fees?",
        answer: "There are no fees on deposits.",
      },
      {
        id: "deposit-process",
        text: "How do I deposit money step by step?",
        answer:
          "1. Click on Deposit in your portal.\n2. Select the method (Bank, Easypaisa, JazzCash).\n3. Send the payment to the company's given account details.\n4. Upload the screenshot of your payment.\n5. Wait for 30 minutes.\n6. Once approved, your deposit will reflect in your dashboard balance.",
      },
    ],
  },
  {
    id: "withdrawals",
    text: "How to Withdraw Money",
    children: [
      {
        id: "withdrawal-process",
        text: "How can I withdraw money?",
        answer:
          "1. Click on the Withdraw button.\n2. Click on Edit Info.\n3. Select your method (Bank Account or Wallet).\n4. Enter your Account Number, Account Name, and optionally your IBAN.\n5. Once saved, your account will be bind.\n6. Enter the withdrawal amount.\n7. A 5% withdrawal fee will be charged.\n8. You can withdraw only once in 24 hours.",
      },
      {
        id: "withdrawal-unbind",
        text: "How can I unbind my account?",
        answer: "Click on Edit Info again, remove the old account, and add your new account details to bind it.",
      },
      {
        id: "withdrawal-timing",
        text: "When will I receive my withdrawal?",
        answer: "Your withdrawal will be received within 24 hours.",
      },
    ],
  },
  {
    id: "investment",
    text: "Investment Guide",
    children: [
      {
        id: "how-to-invest",
        text: "How can I invest money?",
        answer:
          "1. Go to your dashboard and check plans (Hourly, Weekly, Monthly).\n2. Each plan has a Buy button. Click it to start your investment.\n3. Use the Investment Calculator in the plan to check your expected profit.\n4. Enter the investment amount and confirm.\n5. Your investment will start immediately, and profit will be credited according to the plan.",
      },
      {
        id: "track-profit",
        text: "Where can I track my profit?",
        answer:
          "Live Earning: Shows your profit in real-time, updating continuously as you earn from all active investments.\n\nHourly Profit: Displays profit earned every hour from hourly-based investment plans.\n\nDaily Profit: Shows profit earned each day from all your investments.\n\nAccumulated Profit: This is the profit plus the capital you get when a plan expires. Appears in the Live Earning tab after plan completion.\n\nTotal Profit: Displays your combined earnings from Hourly, Daily, and Accumulated profits.",
      },
      {
        id: "investment-limits",
        text: "Is there any minimum or maximum investment limit?",
        answer: "The minimum investment is PKR 500, and there is no maximum limit.",
      },
    ],
  },
  {
    id: "team",
    text: "My Team",
    children: [
      {
        id: "what-is-team",
        text: "What is My Team?",
        answer:
          "My Team shows all the members you have referred and your network structure. It helps you track team performance and your referral rewards.",
      },
      {
        id: "team-details",
        text: "What details are visible in My Team?",
        answer:
          "In your dashboard, you can see:\n\nTotal Deposit: Total money deposited by your team.\nTotal Withdrawal: Total money withdrawn by your team.\nTotal Commission: Total referral rewards you have earned.\nTotal Users: Total number of team members.\nLevel 1, Level 2, Level 3 Users: Number of users in each level.\nUser Balance: Each user's current balance is shown.",
      },
      {
        id: "track-members",
        text: "How can I track my team members?",
        answer:
          "Go to the My Team section in your dashboard. You will see a list of users under each level with their balance, deposit, withdrawal, and plan info.",
      },
      {
        id: "referral-link",
        text: "How can I get my referral link?",
        answer: "Your referral link is available at the bottom of the dashboard. Share it to invite new members.",
      },
    ],
  },
  {
    id: "referral",
    text: "Referral Commission",
    children: [
      {
        id: "what-is-referral",
        text: "What is referral commission?",
        answer: "Referral commission is the reward you earn when your referrals deposit and invest in a plan.",
      },
      {
        id: "commission-rates",
        text: "How much commission can I earn per level?",
        answer: "Level 1: 6% 💰\nLevel 2: 3% 💰\nLevel 3: 1% 💰",
      },
      {
        id: "how-to-earn",
        text: "How do I get referral commission?",
        answer:
          "1. Share your referral link with others.\n2. When they deposit money and invest in a plan, you automatically earn your commission.\n3. Level 1, 2, 3 percentages are calculated based on the referred user's investment.",
      },
      {
        id: "check-commission",
        text: "Where can I see my referral commission?",
        answer: "Open the sidebar → Click Referral Commission\n\nYour total earned commission will be displayed.",
      },
    ],
  },
]

const chatDataUrdu= [
  {
    id: "deposits",
    text: "پیسے جمع کرنے کا طریقہ",
    children: [
      {
        id: "deposit-methods",
        text: "کون سے ڈپازٹ کے طریقے دستیاب ہیں؟",
        answer: "آپ بینک ٹرانسفر، ایزی پیسہ یا جاز کیش کے ذریعے ڈپازٹ کر سکتے ہیں۔",
      },
      {
        id: "deposit-limits",
        text: "ڈپازٹ کی حد کیا ہے؟",
        answer: "ڈپازٹ پر کوئی حد نہیں ہے۔ جتنا زیادہ ڈپازٹ کریں گے، اتنا زیادہ منافع اور انعامات حاصل کریں گے۔",
      },
      {
        id: "deposit-fees",
        text: "کیا ڈپازٹ پر کوئی فیس ہے؟",
        answer: "نہیں، ڈپازٹ بالکل فری ہے۔",
      },
      {
        id: "deposit-process",
        text: "ڈپازٹ کرنے کا طریقہ کیا ہے؟",
        answer:
          "1. اپنے پورٹل میں ڈپازٹ پر کلک کریں۔\n2. طریقہ منتخب کریں (بینک، ایزی پیسہ یا جاز کیش).\n3. کمپنی کے فراہم کردہ اکاؤنٹ نمبر پر رقم بھیجیں۔\n4. اپنی ادائیگی کا سکرین شاٹ اپلوڈ کریں۔\n5. تقریباً 30 منٹ انتظار کریں۔\n6. منظوری کے بعد آپ کا ڈپازٹ ڈیش بورڈ بیلنس میں نظر آئے گا۔",
      },
    ],
  },
  {
    id: "withdrawals",
    text: "پیسے نکالنے کا طریقہ",
    children: [
      {
        id: "withdrawal-process",
        text: "پیسے نکالنے کا طریقہ کیا ہے؟",
        answer:
          "1. ویڈرا بٹن پر کلک کریں۔\n2. ایڈٹ انفارمیشن پر کلک کریں۔\n3. اپنا طریقہ منتخب کریں (بینک اکاؤنٹ یا والٹ).\n4. اپنا اکاؤنٹ نمبر، اکاؤنٹ کا نام اور اگر چاہیں تو IBAN درج کریں۔\n5. سیو کرنے کے بعد آپ کا اکاؤنٹ بائنڈ ہو جائے گا۔\n6. اس کے بعد اپنی مطلوبہ ویڈرا رقم ڈالیں۔\n7. ہر ویڈرا پر 5% فیس لاگو ہوگی۔\n8. آپ 24 گھنٹوں میں صرف ایک بار ویڈرا کر سکتے ہیں۔",
      },
      {
        id: "withdrawal-unbind",
        text: "اکاؤنٹ ان بائنڈ کیسے کریں؟",
        answer:
          "دوبارہ ایڈٹ انفارمیشن پر کلک کریں، پرانا اکاؤنٹ ہٹا کر نیا اکاؤنٹ کی تفصیلات درج کریں اور بائنڈ کر لیں۔",
      },
      {
        id: "withdrawal-timing",
        text: "ویڈرا کب ملے گا؟",
        answer: "آپ کو ویڈرا 24 گھنٹوں کے اندر موصول ہو جائے گا۔",
      },
    ],
  },
  {
    id: "investment",
    text: "سرمایہ کاری کی رہنمائی",
    children: [
      {
        id: "how-to-invest",
        text: "سرمایہ کاری کیسے کی جاتی ہے؟",
        answer:
          "1. ڈیش بورڈ میں اپنے پلانز (گھنٹہ وار، ہفتہ وار، ماہانہ) دیکھیں۔\n2. ہر پلان میں Buy بٹن ہوتا ہے، اس پر کلک کرکے سرمایہ کاری شروع کریں۔\n3. پلان میں موجود انویسٹمنٹ کیلکولیٹر استعمال کرکے منافع کا حساب لگائیں۔\n4. رقم درج کریں اور کنفرم کریں۔\n5. آپ کی سرمایہ کاری فوراً شروع ہو جائے گی اور منافع پلان کے مطابق ملتا رہے گا۔",
      },
      {
        id: "track-profit",
        text: "منافع کہاں ٹریک کیا جا سکتا ہے؟",
        answer:
          "لائیو ارننگ: آپ کا منافع ریئل ٹائم میں دکھاتا ہے، جو تمام فعال سرمایہ کاری سے مسلسل اپ ڈیٹ ہوتا رہتا ہے۔\n\nگھنٹہ وار منافع: یہ آپ کا ہر گھنٹے کا منافع دکھاتا ہے جو گھنٹہ وار پلانز سے حاصل ہوتا ہے۔\n\nروزانہ منافع: روزانہ کا منافع دکھایا جاتا ہے جو آپ کی تمام سرمایہ کاری سے ملتا ہے۔\n\nجمع شدہ منافع: یہ وہ منافع ہے جو پلان مکمل ہونے پر ملتا ہے، اس کے ساتھ آپ کی لگائی گئی رقم بھی واپس ملتی ہے۔\n\nکل منافع: آپ کا کل منافع یہاں نظر آتا ہے۔",
      },
      {
        id: "investment-limits",
        text: "کم از کم اور زیادہ سے زیادہ سرمایہ کاری کی حد کیا ہے؟",
        answer: "کم از کم سرمایہ کاری 500 روپے ہے، اور زیادہ سے زیادہ کوئی حد نہیں (لا محدود)۔",
      },
    ],
  },
  {
    id: "team",
    text: "میری ٹیم",
    children: [
      {
        id: "what-is-team",
        text: "My Team کیا ہے؟",
        answer:
          "My Team میں وہ تمام ممبرز دکھائے جاتے ہیں جنہیں آپ نے ریفر کیا ہے اور آپ کے نیٹ ورک کا سٹرکچر دکھاتا ہے۔ یہ آپ کو ٹیم کی کارکردگی اور ریفرل ریوارڈز ٹریک کرنے میں مدد دیتا ہے۔",
      },
      {
        id: "team-details",
        text: "My Team میں کون سی تفصیلات دکھائی جاتی ہیں؟",
        answer:
          "ڈیش بورڈ میں آپ دیکھ سکتے ہیں:\n\nکل ڈپازٹ: آپ کی ٹیم نے کتنا کل ڈپازٹ کیا۔\nکل ویڈرا: ٹیم نے کل کتنا نکالا۔\nکل کمیشن: آپ کے ریفرل ریوارڈز کا کل۔\nکل یوزرز: ٹیم ممبرز کی کل تعداد۔\nلیول 1، 2، 3 یوزرز: ہر لیول میں کتنے یوزرز ہیں۔\nیوزرز کا بیلنس: ہر یوزر کا موجودہ بیلنس دکھایا جاتا ہے۔",
      },
      {
        id: "track-members",
        text: "ٹیم ممبرز کیسے ٹریک کریں؟",
        answer:
          "ڈیش بورڈ میں My Team سیکشن میں جائیں۔ ہر لیول کے یوزرز کی فہرست دکھائی دے گی، ان کا بیلنس، ڈپازٹ، ویڈرا اور پلان انفارمیشن کے ساتھ۔",
      },
      {
        id: "referral-link",
        text: "ریفرل لنک کیسے ملے گا؟",
        answer: "آپ کا ریفرل لنک ڈیش بورڈ کے نیچے ملے گا۔ اسے شیئر کریں اور نئے ممبرز کو invite کریں۔",
      },
    ],
  },
  {
    id: "referral",
    text: "ریفرل کمیشن",
    children: [
      {
        id: "what-is-referral",
        text: "ریفریل کمیشن کیا ہے؟",
        answer: "جب آپ کے ریفرلز ڈیپازٹ اور پلان میں سرمایہ کاری کریں تو آپ کو کمیشن ملتا ہے۔",
      },
      {
        id: "commission-rates",
        text: "ہر لیول کا کمیشن کتنا ہے؟",
        answer: "Level 1: 6% 💰\nLevel 2: 3% 💰\nLevel 3: 1% 💰",
      },
      {
        id: "how-to-earn",
        text: "ریفریل کمیشن کیسے حاصل کریں؟",
        answer:
          "1. اپنا ریفریل لنک شیئر کریں\n2. جب وہ ڈیپازٹ اور پلان میں سرمایہ کاری کریں تو آپ کمیشن حاصل کریں گے\n3. Level 1, 2, 3 کے مطابق کمیشن calculate ہوگا",
      },
      {
        id: "check-commission",
        text: "کمیشن کہاں دیکھیں؟",
        answer: "Sidebar کھولیں → Referral Commission\n\nآپ کا total earned commission وہاں دکھائی دے گا",
      },
    ],
  },
]

export function StaticChatbot() {
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [currentLevel, setCurrentLevel] = useState([])
  const [breadcrumb, setBreadcrumb] = useState(["Help Center"])
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "bot",
      content: "Hi! Please select your preferred language / سلام! براہ کرم اپنی پسندیدہ زبان منتخب کریں",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [showLanguageSelection, setShowLanguageSelection] = useState(true)

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language)
    setShowLanguageSelection(false)

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: language === "english" ? "English" : "اردو",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    const chatData = language === "english" ? chatDataEnglish : chatDataUrdu
    const welcomeMessage =
      language === "english"
        ? "Great! I'm here to help you with any questions. What would you like to know about?"
        : "بہترین! میں آپ کے کسی بھی سوال میں مدد کے لیے حاضر ہوں۔ آپ کیا جاننا چاہتے ہیں؟"

    simulateTyping(welcomeMessage, () => {
      setCurrentLevel(chatData)
      setShowOptions(true)
    })
  }

  const simulateTyping = (message, callback) => {
    setIsTyping(true)
    setTimeout(
      () => {
        setIsTyping(false)
        const newMessage = {
          id: Date.now().toString(),
          type: "bot",
          content: message,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, newMessage])
        callback()
      },
      1500 + Math.random() * 1000,
    )
  }

  const handleQuestionClick = (question) => {
    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: question.text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setShowOptions(false)

    if (question.answer) {
      simulateTyping(question.answer, () => {
        setTimeout(() => {
          const followUpMessage =
            selectedLanguage === "english"
              ? "Is there anything else I can help you with?"
              : "کیا کوئی اور چیز ہے جس میں میں آپ کی مدد کر سکوں؟"

          simulateTyping(followUpMessage, () => {
            setShowOptions(true)
            const chatData = selectedLanguage === "english" ? chatDataEnglish : chatDataUrdu
            setCurrentLevel(chatData)
            setBreadcrumb(["Help Center"])
          })
        }, 1000)
      })
    } else if (question.children) {
      const responseMessage =
        selectedLanguage === "english"
          ? "Here are some specific questions about " + question.text.toLowerCase() + ":"
          : "یہاں " + question.text + " کے بارے میں کچھ مخصوص سوالات ہیں:"

      simulateTyping(responseMessage, () => {
        setCurrentLevel(question.children)
        setBreadcrumb([...breadcrumb, question.text])
        setShowOptions(true)
      })
    }
  }

  const resetChat = () => {
    setSelectedLanguage(null)
    setShowLanguageSelection(true)
    setMessages([
      {
        id: "1",
        type: "bot",
        content: "Hi! Please select your preferred language / سلام! براہ کرم اپنی پسندیدہ زبان منتخب کریں",
        timestamp: new Date(),
      },
    ])
    setCurrentLevel([])
    setBreadcrumb(["Help Center"])
    setShowOptions(false)
    setIsTyping(false)
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm max-w-md mx-auto flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-400" />
            Help Assistant
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={resetChat} className="text-green-400 hover:bg-green-400/10">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              {message.type === "bot" && (
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-green-500 text-white rounded-br-sm"
                    : "bg-slate-800 text-slate-200 rounded-bl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                <span className="text-xs opacity-60 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              {message.type === "user" && (
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-slate-800 text-slate-200 rounded-lg rounded-bl-sm p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {showLanguageSelection && !isTyping && (
          <div className="space-y-2 border-t border-slate-700 pt-4">
            <Button
              onClick={() => handleLanguageSelection("english")}
              className="w-full justify-start text-left bg-green-600 hover:bg-green-700 text-white h-auto py-3 px-4"
            >
              <Globe className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">English</span>
            </Button>
            <Button
              onClick={() => handleLanguageSelection("urdu")}
              className="w-full justify-start text-left bg-blue-600 hover:bg-blue-700 text-white h-auto py-3 px-4"
            >
              <Globe className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">اردو</span>
            </Button>
          </div>
        )}

        {showOptions && !isTyping && !showLanguageSelection && (
          <div className="space-y-2 border-t border-slate-700 pt-4">
            {currentLevel.map((question) => (
              <Button
                key={question.id}
                variant="outline"
                onClick={() => handleQuestionClick(question)}
                className="w-full justify-start text-left border-slate-600 text-slate-900 hover:bg-slate-800 hover:border-green-500/50 hover:text-white h-auto py-2 px-3"
              >
                <span className="text-sm">{question.text}</span>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
