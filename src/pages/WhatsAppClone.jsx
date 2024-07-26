import React, { useState, useEffect } from 'react';
import { Send, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const contacts = [
  { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/150?img=1", online: true },
  { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/150?img=2", online: false },
  { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3", online: true },
  { id: 4, name: "David", avatar: "https://i.pravatar.cc/150?img=4", online: false },
];

const initialMessages = {
  1: [
    { id: 1, text: "Hey Alice!", sender: "me" },
    { id: 2, text: "Hi! How are you?", sender: "other" },
  ],
  2: [
    { id: 1, text: "Hello Bob!", sender: "me" },
    { id: 2, text: "What's up?", sender: "other" },
  ],
  3: [
    { id: 1, text: "Hi Charlie!", sender: "me" },
    { id: 2, text: "Long time no see!", sender: "other" },
  ],
  4: [
    { id: 1, text: "Hey David!", sender: "me" },
    { id: 2, text: "How's it going?", sender: "other" },
  ],
};

const WhatsAppClone = () => {
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [contactList, setContactList] = useState(contacts);

  useEffect(() => {
    const interval = setInterval(() => {
      setContactList(prevContacts => 
        prevContacts.map(contact => ({
          ...contact,
          online: Math.random() > 0.5
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updatedActiveContact = contactList.find(contact => contact.id === activeContact.id);
    if (updatedActiveContact) {
      setActiveContact(updatedActiveContact);
    }
  }, [contactList]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const updatedMessages = {
        ...messages,
        [activeContact.id]: [
          ...messages[activeContact.id],
          { id: messages[activeContact.id].length + 1, text: newMessage, sender: "me" },
        ],
      };
      setMessages(updatedMessages);
      setNewMessage("");
    }
  };

  const filteredContacts = contactList.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r">
        <div className="p-4 bg-gray-200">
          <Input
            type="text"
            placeholder="Search contacts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="overflow-y-auto h-[calc(100vh-60px)]">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${
                activeContact.id === contact.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveContact(contact)}
            >
              <div className="relative">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>{contact.name[0]}</AvatarFallback>
                </Avatar>
                {contact.online && (
                  <span className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <span>{contact.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-col flex-1">
        <div className="bg-green-500 p-4 text-white flex items-center">
          <div className="relative">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
              <AvatarFallback>{activeContact.name[0]}</AvatarFallback>
            </Avatar>
            {activeContact.online && (
              <span className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold">{activeContact.name}</h1>
            <p className="text-sm">{activeContact.online ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages[activeContact.id].map((message) => (
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
    </div>
  );
};

export default WhatsAppClone;
