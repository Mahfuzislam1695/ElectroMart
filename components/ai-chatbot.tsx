"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User, Zap, ShoppingCart, Star } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  quickReplies?: string[]
  products?: any[]
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm your AI shopping assistant. I can help you find the perfect electronics based on your needs and budget. What are you looking for today?",
      timestamp: new Date(),
      quickReplies: [
        "Air Conditioner under 50k",
        "Best refrigerator brands",
        "EMI options available",
        "Track my order",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mock AI response generator
  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("ac") || lowerMessage.includes("air conditioner")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "I found some great air conditioners for you! Based on your query, here are my top recommendations:",
        timestamp: new Date(),
        products: [
          {
            id: "1",
            name: "LG 1.5 Ton 5 Star Inverter AC",
            price: 45000,
            image: "/lg-air-conditioner-white-modern.png",
            rating: 4.5,
            emi: 3750,
          },
          {
            id: "2",
            name: "Samsung 1.5 Ton 3 Star Split AC",
            price: 38000,
            image: "/samsung-ac-white-modern.png",
            rating: 4.2,
            emi: 3167,
          },
        ],
        quickReplies: ["Show more ACs", "Compare these models", "EMI details", "Installation service"],
      }
    } else if (lowerMessage.includes("refrigerator") || lowerMessage.includes("fridge")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "Here are some excellent refrigerator options within your budget:",
        timestamp: new Date(),
        products: [
          {
            id: "3",
            name: "Samsung 253L Double Door Refrigerator",
            price: 35000,
            image: "/samsung-refrigerator-silver-modern.png",
            rating: 4.3,
            emi: 2917,
          },
        ],
        quickReplies: ["Show more refrigerators", "Energy efficiency", "Capacity options", "Best brands"],
      }
    } else if (lowerMessage.includes("emi")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "EMI options are available for most products! Here's how it works:\n\n• 0% interest for 3-6 months\n• Low interest rates for 12-24 months\n• Instant approval with minimal documentation\n• EMI starts from as low as ৳2,000/month\n\nWhich product are you interested in for EMI?",
        timestamp: new Date(),
        quickReplies: ["AC EMI options", "Refrigerator EMI", "TV EMI plans", "Mobile EMI"],
      }
    } else if (lowerMessage.includes("track") || lowerMessage.includes("order")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "I can help you track your order! Please provide your order number, or I can connect you with our support team for assistance.",
        timestamp: new Date(),
        quickReplies: ["Contact support", "Order status", "Delivery info", "Return policy"],
      }
    } else if (lowerMessage.includes("budget") || lowerMessage.includes("price")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: "What's your budget range? I can recommend the best products within your price limit:",
        timestamp: new Date(),
        quickReplies: ["Under 25k", "25k - 50k", "50k - 1L", "Above 1L"],
      }
    } else {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "I can help you with:\n\n• Product recommendations based on your needs\n• Price comparisons and best deals\n• EMI options and calculations\n• Technical specifications\n• Order tracking and support\n\nWhat would you like to know more about?",
        timestamp: new Date(),
        quickReplies: ["Browse categories", "Best deals", "EMI options", "Contact support"],
      }
    }
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(message)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 z-50"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">!</span>
          </div>
        </Button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] glass-card rounded-2xl shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                <p className="text-xs text-green-600">Online • Ready to help</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div
                    className={`rounded-2xl p-3 ${
                      message.type === "user"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                        : "bg-white/70 text-gray-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>

                    {/* Product Recommendations */}
                    {message.products && (
                      <div className="mt-3 space-y-2">
                        {message.products.map((product) => (
                          <div key={product.id} className="bg-white/20 rounded-lg p-2 flex gap-2">
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={product.image || "/placeholder.svg?height=48&width=48&query=electronics"}
                                alt={product.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-medium line-clamp-1">{product.name}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs">{product.rating}</span>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs font-bold">৳{product.price.toLocaleString()}</span>
                                <Button size="sm" className="h-6 text-xs px-2">
                                  <ShoppingCart className="w-3 h-3 mr-1" />
                                  Add
                                </Button>
                              </div>
                              <p className="text-xs text-green-300 mt-1">
                                <Zap className="w-3 h-3 inline mr-1" />
                                EMI: ৳{product.emi}/mo
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Quick Replies */}
                  {message.quickReplies && message.type === "bot" && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 bg-white/50 hover:bg-white/70"
                          onClick={() => handleQuickReply(reply)}
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user"
                      ? "order-1 ml-2 bg-gray-200"
                      : "order-2 mr-2 bg-gradient-to-br from-blue-500 to-purple-600"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/70 rounded-2xl p-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">AI is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/50">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(inputValue)
              }}
              className="flex gap-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about electronics..."
                className="flex-1 glass-card"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>

            <div className="flex items-center justify-center mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500 hover:text-gray-700"
                onClick={() => {
                  // Simulate human handoff
                  const handoffMessage: Message = {
                    id: Date.now().toString(),
                    type: "bot",
                    content:
                      "I'm connecting you with our human support team. They'll be with you shortly!\n\n📞 Call: +880 1234-567890\n📧 Email: support@electromart.bd\n💬 Live Chat: Available 9 AM - 9 PM",
                    timestamp: new Date(),
                    quickReplies: ["Call now", "Send email", "Continue with AI"],
                  }
                  setMessages((prev) => [...prev, handoffMessage])
                }}
              >
                Need human support? Click here
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
