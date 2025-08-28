"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Bot } from "lucide-react"

interface AIChatbotProps {
  productName: string
}

const predefinedQuestions = [
  "What is the power consumption?",
  "Is installation included?",
  "What's the warranty period?",
  "Is EMI available?",
  "What's the room size coverage?",
  "How energy efficient is this model?",
]

export default function AIChatbot({ productName }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! I'm here to help you with questions about the ${productName}. What would you like to know?`,
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date(),
    }

    // Simulate bot response
    const botResponse = {
      id: messages.length + 2,
      text: getBotResponse(message),
      isBot: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage, botResponse])
    setInputMessage("")
  }

  const getBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes("power") || lowerQuestion.includes("consumption")) {
      return "This AC has a power consumption of 1560W. With its 5-star energy rating and inverter technology, it's very energy efficient and can help reduce your electricity bills."
    }

    if (lowerQuestion.includes("installation")) {
      return "Yes, professional installation is available for ৳2,500. Our certified technicians will handle the complete installation including mounting, piping, and testing."
    }

    if (lowerQuestion.includes("warranty")) {
      return "This product comes with a comprehensive 1-year warranty and an extended 10-year warranty on the compressor. All manufacturing defects and electrical failures are covered."
    }

    if (lowerQuestion.includes("emi")) {
      return "Yes, EMI options are available! You can choose from 3, 6, 9, or 12-month tenures. The 12-month EMI starts from ৳4,083 per month with no processing fee on select cards."
    }

    if (lowerQuestion.includes("room") || lowerQuestion.includes("size")) {
      return "This 1.5 ton AC is perfect for rooms up to 180 sq ft. It provides excellent cooling performance for medium-sized bedrooms and living rooms."
    }

    if (lowerQuestion.includes("energy") || lowerQuestion.includes("efficient")) {
      return "This AC has a 5-star energy rating, making it highly energy efficient. The dual inverter technology adjusts cooling based on room temperature, saving up to 40% on electricity bills."
    }

    return "I'd be happy to help! Could you please be more specific about what you'd like to know about this product? You can ask about specifications, pricing, warranty, or any other features."
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bot className="w-5 h-5 text-blue-600" />
            Product Assistant
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="w-8 h-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  message.isBot ? "bg-gray-100 text-gray-900" : "bg-blue-600 text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Predefined Questions */}
        <div className="p-4 border-t">
          <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-1">
            {predefinedQuestions.slice(0, 3).map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-7 bg-transparent"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about this product..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputMessage)}
              className="text-sm"
            />
            <Button size="sm" onClick={() => handleSendMessage(inputMessage)} disabled={!inputMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
