"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useRef, useEffect, Suspense } from "react";
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
  MdLocalShipping,
  MdMail,
  MdCheckCircle,
  MdDoneAll,
  MdArrowBack,
  MdOutlinePushPin,
  MdStar,
  MdPerson,
} from "react-icons/md";

const initialMessages = {};

export default function SenderMessages() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-lg font-semibold">Loading...</div>}>
      <SenderMessagesContent />
    </Suspense>
  );
}

function SenderMessagesContent() {
  const searchParams = useSearchParams();
  const conversationParam = searchParams.get("conversation");
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [allMessages, setAllMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  function formatTime(date) {
    if (!date) return "";
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    if (diff < 86400000) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  function mapConversation(c) {
    const other = c.otherUser || {};
    const shipment = c.shipment || {};
    return {
      id: c._id,
      name: [other.firstName, other.lastName].filter(Boolean).join(" ") || "Unknown",
      avatar: (other.firstName?.[0] || "?").toUpperCase(),
      lastMessage: c.lastMessage || "",
      unread: 0,
      online: other.isOnline || false,
      role: other.role === "driver" ? "Driver" : other.role === "sender" ? "Sender" : "",
      rating: other.rating ? other.rating.toFixed(2) : "—",
      load: shipment.trackingId || "",
      trip: "",
      time: formatTime(c.lastMessageTime),
      typing: false,
      _original: c,
    };
  }

  useEffect(() => {
    fetch("/api/sender/messages")
      .then((r) => r.json())
      .then((d) => {
        const mapped = (d.conversations || []).map(mapConversation);
        setConversations(mapped);
        if (mapped.length > 0) {
          if (conversationParam) {
            const match = mapped.find((c) => c.id === conversationParam);
            if (match) setSelectedChat(match);
            else setSelectedChat(mapped[0]);
          } else if (!selectedChat) {
            setSelectedChat(mapped[0]);
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [conversationParam]);

  useEffect(() => {
    if (!selectedChat) return;
    const fetchMessages = () => {
      fetch(`/api/sender/messages/${selectedChat.id}`)
        .then((r) => r.json())
        .then((d) => {
          const msgs = (d.messages || []).map((m, i) => ({
            id: m._id || i,
            sender: m.sender?._id === selectedChat._original?.otherUser?._id ? "other" : "me",
            text: m.text,
            time: m.createdAt
              ? new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "",
            status: m.status || "sent",
          }));
          setAllMessages((prev) => ({ ...prev, [selectedChat.id]: msgs }));
        })
        .catch(() => {});
    };
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [selectedChat?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, selectedChat]);

  const currentMessages = selectedChat ? allMessages[selectedChat.id] || [] : [];

  const handleSend = () => {
    if (newMessage.trim() && selectedChat) {
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
      fetch(`/api/sender/messages/${selectedChat.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newMessage }),
      });
      setNewMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-lg font-semibold">Loading...</div>;

  if (!selectedChat && conversations.length === 0) {
    return (
      <div className="h-screen flex bg-white">
        <div className="w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col">
          <div className="p-4 bg-primary-container text-white">
            <h2 className="text-xl font-bold">Messages</h2>
          </div>
          <div className="flex-1 flex items-center justify-center text-slate-500">No conversations yet</div>
        </div>
      </div>
    );
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (conv.lastMessage && conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (conv.load && conv.load.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!selectedChat && conversations.length > 0) {
    setSelectedChat(conversations[0]);
  }

  return (
    <div className="h-screen flex bg-white">
      {/* Left Panel - Conversation List */}
      <div className={`${showMobileChat ? 'hidden' : 'flex'} md:flex w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex-col flex-shrink-0`}>
        {/* Header */}
        <div className="p-4 bg-primary-container text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link
                href="/sender/dashboard"
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
                <p className="text-[10px] text-slate-400 font-medium">{conv.role} • {conv.rating} <MdStar className="inline text-yellow-500 text-[10px]" /></p>
                <p className={`text-xs mt-0.5 truncate ${conv.unread > 0 ? "font-bold text-primary-container" : "text-slate-500"}`}>
                  {conv.typing ? (
                    <span className="text-secondary-container italic">Typing...</span>
                  ) : (
                    conv.lastMessage
                  )}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{conv.load} • {conv.trip}</p>
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
                {selectedChat.load && (
                  <span className="text-primary-container ml-1">• {selectedChat.load}</span>
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
              <span className="bg-slate-200/60 text-slate-500 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">Today, May 14, 2026</span>
            </div>

            {currentMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mb-4">
                  <MdOutlinePushPin className="text-primary-container text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-primary-container mb-1">No messages yet</h3>
                <p className="text-sm text-slate-500 max-w-xs">Start a conversation to coordinate shipments and deliveries.</p>
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
                <h4 className="text-sm font-bold text-primary-container uppercase tracking-wider">Shipment Details</h4>
                <button onClick={() => setShowDetails(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                  <MdClose className="text-sm" />
                </button>
              </div>
              <div className="p-5 space-y-6">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Load ID</p>
                  <p className="text-sm font-bold text-primary-container">{selectedChat.load || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Route</p>
                  <div className="relative pl-5 space-y-3">
                    <div className="absolute left-[5px] top-1 bottom-1 w-[2px] bg-slate-200"></div>
                    <div className="relative">
                      <span className="absolute -left-5 top-0.5 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-white"></span>
                      <p className="text-xs font-bold text-on-surface">Pickup</p>
                      <p className="text-xs text-slate-500">
                        {[
                          selectedChat._original?.shipment?.origin?.city,
                          selectedChat._original?.shipment?.origin?.state,
                        ].filter(Boolean).join(", ") || "—"}
                      </p>
                    </div>
                    <div className="relative">
                      <span className="absolute -left-5 top-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white"></span>
                      <p className="text-xs font-bold text-on-surface">Delivery</p>
                      <p className="text-xs text-slate-500">
                        {[
                          selectedChat._original?.shipment?.destination?.city,
                          selectedChat._original?.shipment?.destination?.state,
                        ].filter(Boolean).join(", ") || "—"}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Rate</p>
                  <p className="text-lg font-bold text-secondary">
                    {selectedChat._original?.shipment?.pricing?.amount
                      ? `$${selectedChat._original.shipment.pricing.amount.toLocaleString()}`
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Carrier</p>
                  <p className="text-sm text-on-surface">{selectedChat.name}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        {selectedChat && (
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
