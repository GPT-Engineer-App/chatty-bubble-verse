import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const WhatsAppClone = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", sender: "other" },
    { id: 2, text: "Hi! How are you?", sender: "me" },
    { id: 3, text: "I'm good, thanks! How about you?", sender: "other" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-green-500 p-4 text-white">
        <h1 className="text-2xl font-bold">WhatsApp Clone</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === "me" ? "bg-green-500 text-white" : "bg-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 bg-white flex items-center">
        <Input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 mr-2"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default WhatsAppClone;
