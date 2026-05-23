"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  MdSearch,
  MdSend,
  MdMoreVert,
  MdAttachFile,
  MdEmojiEmotions,
  MdCall,
  MdVideoCall,
  MdClose,
  MdInfo,
  MdPinDrop,
  MdPhone,
  MdMail,
  MdCheckCircle,
  MdDoneAll,
  MdArrowBack,
  MdOutlinePushPin,
} from "react-icons/md";

const conversations = [
  { id: 1, name: "Alex Reynolds", role: "Heavy-Haul Driver", rating: 4.98, avatar: "AR", lastMessage: "Can we do $450? Ready at 2:30 PM", time: "10:48 AM", unread: 1, online: true, typing: false, trip: "Chicago → Detroit" },
  { id: 2, name: "Sarah Mitchell", role: "Fleet Coordinator", rating: 4.92, avatar: "SM", lastMessage: "Shipment ready at dock 7", time: "9:15 AM", unread: 0, online: true, typing: false, trip: "Kigali → Huye" },
  { id: 3, name: "Marcus Chen", role: "Logistics Manager", rating: 4.85, avatar: "MC", lastMessage: "Confirm the delivery address?", time: "Yesterday", unread: 2, online: false, typing: false, trip: "Muhanga → Kigali" },
  { id: 4, name: "Route Dispatch", role: "Official Dispatch", rating: 5.0, avatar: "RD", lastMessage: "New trip: Denver → Salt Lake City", time: "Yesterday", unread: 0, online: true, typing: false, trip: "System" },
  { id: 5, name: "Jessica Park", role: "Freight Broker", rating: 4.76, avatar: "JP", lastMessage: "Thanks for the quick delivery!", time: "Mon", unread: 0, online: false, typing: false, trip: "Cleveland → Chicago" },
  { id: 6, name: "David Omondi", role: "Independent Driver", rating: 4.91, avatar: "DO", lastMessage: "I can take the return trip tomorrow", time: "Sun", unread: 0, online: false, typing: false, trip: "Huye → Butare" },
];

const initialMessages = {
  1: [
    { id: 1, sender: "other", text: "Hi, I'm interested in the Chicago to Detroit route. I have a 53' reefer trailer. Can you confirm the package dimensions?", time: "10:42 AM", status: "read" },
    { id: 2, sender: "me", text: "Sure! It's one standard pallet, 48x40x36. Weighs about 1,200 lbs. Needs to be in Detroit by 9 PM tonight.", time: "10:45 AM", status: "read" },
    { id: 3, sender: "other", text: "Got it. I can make that window. Since it's a rush delivery and LTL, can we do $450? I'm ready to pick it up at 2:30 PM.", time: "10:48 AM", status: "read" },
  ],
};

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [allMessages, setAllMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, selectedChat]);

  const currentMessages = allMessages[selectedChat.id] || [];

  const handleSend = () => {
    if (newMessage.trim()) {
      const msg = {
        id: (currentMessages.length || 0) + 1,
        sender: "me",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "sent",
      };
      setAllMessages((prev) => ({
        ...prev,
        [selectedChat.id]: [...(prev[selectedChat.id] || []), msg],
      }));
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-white">
      {/* Left Panel - Conversation List */}
      <div className={`${showMobileChat ? 'hidden' : 'flex'} md:flex w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex-col flex-shrink-0`}>
        {/* Header */}
        <div className="p-4 bg-primary-container text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link
                href="/driver/dashboard"
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Back to Dashboard"
              >
                <MdArrowBack className="text-xl" />
              </Link>
              <h2 className="text-xl font-bold">Messages</h2>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <MdMoreVert className="text-xl" />
            </button>
          </div>
          {/* Search */}
          <div className="relative">
            <input
              className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/60 focus:bg-white/20 focus:outline-none transition-all"
              placeholder="Search conversations..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MdSearch className="absolute left-3.5 top-3 text-white/60 text-base" />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => {
                setSelectedChat(conv);
                setShowMobileChat(true);
              }}
              className={`w-full p-4 flex items-start gap-3 hover:bg-slate-50 transition-all text-left border-b border-slate-50 ${
                selectedChat.id === conv.id ? "bg-primary-container/5 border-l-[3px] border-l-secondary-container" : ""
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${
                  conv.online ? "bg-primary-container text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {conv.avatar}
                </div>
                {conv.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-sm font-bold text-on-surface truncate">{conv.name}</h3>
                  <span className={`text-[10px] font-medium flex-shrink-0 ml-2 ${conv.unread > 0 ? "text-secondary-container font-bold" : "text-slate-400"}`}>
                    {conv.time}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">{conv.role} • {conv.rating} ★</p>
                <p className={`text-xs mt-0.5 truncate ${conv.unread > 0 ? "font-bold text-primary-container" : "text-slate-500"}`}>
                  {conv.typing ? (
                    <span className="text-secondary-container italic">Typing...</span>
                  ) : (
                    conv.lastMessage
                  )}
                </p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 bg-secondary-container text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Area */}
      <div className={`${!showMobileChat ? 'hidden' : 'flex'} md:flex flex-1 flex-col bg-slate-50 min-w-0`}>
        {/* Chat Header */}
        <div className="px-4 md:px-5 py-3 border-b border-slate-200 bg-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 -ml-2 text-slate-600"
              onClick={() => setShowMobileChat(false)}
            >
              <MdArrowBack className="text-xl" />
            </button>
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                selectedChat.online ? "bg-primary-container text-white" : "bg-slate-200 text-slate-500"
              }`}>
                {selectedChat.avatar}
              </div>
              {selectedChat.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            <div>
              <h3 className="font-bold text-on-surface text-sm">{selectedChat.name}</h3>
              <p className="text-xs text-slate-500">
                {selectedChat.online ? (
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                    Online
                  </span>
                ) : (
                  "Offline"
                )}
                {selectedChat.trip && (
                  <span className="text-primary-container ml-1">• {selectedChat.trip}</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors" title="Call">
              <MdCall className="text-lg" />
            </button>
            <button className="hidden sm:block p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors" title="Video Call">
              <MdVideoCall className="text-lg" />
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`p-2 rounded-full transition-colors ${
                showDetails ? "bg-primary-container/10 text-primary-container" : "text-slate-500 hover:bg-slate-100"
              }`}
              title="Trip Details"
            >
              <MdInfo className="text-lg" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4">
            <div className="flex justify-center">
              <span className="bg-slate-200/60 text-slate-500 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">Today, May 11, 2024</span>
            </div>

            {currentMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mb-4">
                  <MdOutlinePushPin className="text-primary-container text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-primary-container mb-1">No messages yet</h3>
                <p className="text-sm text-slate-500 max-w-xs">Start a conversation to coordinate trips and deliveries.</p>
              </div>
            ) : (
              currentMessages.map((msg) => (
                <div key={msg.id} className={`flex gap-2.5 max-w-[85%] md:max-w-[80%] ${msg.sender === "me" ? "ml-auto flex-row-reverse" : ""}`}>
                  {msg.sender === "other" && (
                    <div className="w-7 h-7 rounded-full bg-primary-container/10 flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-primary-container mt-auto">
                      {selectedChat.avatar}
                    </div>
                  )}
                  <div className={`space-y-1 ${msg.sender === "me" ? "items-end flex flex-col" : ""}`}>
                    <div
                      className={`px-4 py-2.5 shadow-sm ${
                        msg.sender === "me"
                          ? "bg-primary-container text-white rounded-2xl rounded-tr-md"
                          : "bg-white border border-slate-200 text-on-surface rounded-2xl rounded-tl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
                      <p className="text-[10px] text-slate-400 font-bold">{msg.time}</p>
                      {msg.sender === "me" && (
                        msg.status === "read" ? (
                          <MdDoneAll className="text-xs text-primary-container" />
                        ) : (
                          <MdCheckCircle className="text-xs text-slate-400" />
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Right Panel: Trip Details */}
          {showDetails && (
            <div className="hidden md:flex w-80 bg-white border-l border-slate-200 flex-col overflow-y-auto flex-shrink-0">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h4 className="text-sm font-bold text-primary-container uppercase tracking-wider">Trip Details</h4>
                <button onClick={() => setShowDetails(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                  <MdClose className="text-sm" />
                </button>
              </div>
              <div className="p-5">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">No active trip</p>
                <p className="text-sm text-slate-500">Trip information will appear when linked to an active route.</p>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        {currentMessages.length > 0 && (
          <div className="px-4 py-3 bg-white border-t border-slate-200 flex-shrink-0">
            <div className="flex gap-2 mb-2.5 overflow-x-auto pb-1">
              {["Sounds good", "Can we do $400?", "Confirming details", "On my way"].map((reply) => (
                <button
                  key={reply}
                  onClick={() => setNewMessage(reply)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:border-secondary-container hover:text-secondary-container hover:bg-secondary-container/5 transition-all whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>

            <div className="flex items-end gap-2">
              <button className="p-2 text-slate-400 hover:bg-slate-100 hover:text-primary-container rounded-full transition-colors flex-shrink-0">
                <MdAttachFile className="text-lg" />
              </button>
              <div className="flex-1 bg-slate-50 rounded-2xl px-4 py-2.5 flex items-center gap-2 border-2 border-transparent focus-within:border-secondary-container/40 focus-within:bg-white transition-all">
                <input
                  className="bg-transparent border-none focus:ring-0 w-full text-sm placeholder:text-slate-400 outline-none"
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  value={newMessage}
                />
                <button className="p-1 text-slate-400 hover:text-primary-container transition-colors flex-shrink-0">
                  <MdEmojiEmotions className="text-lg" />
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg transition-all flex-shrink-0 ${
                  newMessage.trim()
                    ? "bg-primary-container hover:scale-105 active:scale-95"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                <MdSend className="text-base" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
