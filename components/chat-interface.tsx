"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "sure. Ask me something else?" },
    { role: "user", content: "powerizade by ?" },
    { role: "bot", content: "Hmm, that's a good one. I'm not sure. Ask me something else?" },
  ])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Mark RoBot</h2>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-[#FFD700] text-black"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <form className="flex gap-2">
          <Input
            placeholder="How can I hack my turret"
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  )
}

