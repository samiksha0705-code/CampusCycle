import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, 
  MapPin, 
  ShoppingBag, 
  ArrowLeftRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCheck,
  Calendar,
  DollarSign
} from 'lucide-react';

export const ChatView: React.FC = () => {
  const { 
    chatConversations, 
    activeChatId, 
    setActiveChatId, 
    sendMessageInChat, 
    currentUser, 
    setSelectedItem, 
    marketplaceItems 
  } = useApp();

  const [messageInput, setMessageInput] = useState('');

  const activeConversation = chatConversations.find(c => c.id === activeChatId) || chatConversations[0];
  const linkedItem = marketplaceItems.find(i => i.id === activeConversation?.itemId);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || messageInput;
    if (!text.trim() || !activeConversation) return;
    sendMessageInChat(activeConversation.id, text);
    setMessageInput('');
  };

  const quickReplies = [
    "Is this still available for meetup?",
    "Can we meet at Central Library entrance at 4:30 PM?",
    "Would you accept ₹50 less for a fast cash deal?",
    "I have my student ID ready for verified handoff."
  ];

  return (
    <div id="campus-chat-view" className="bg-white border border-emerald-100 rounded-3xl overflow-hidden shadow-sm h-[75vh] flex flex-col md:flex-row pb-0">
      
      {/* LEFT SIDEBAR: CONVERSATIONS LIST */}
      <div className="w-full md:w-80 border-r border-emerald-100 flex flex-col h-full bg-emerald-50/20">
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-emerald-100 bg-white">
          <h2 className="text-base font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
            Campus Messages
          </h2>
          <p className="text-[11px] text-emerald-700">Safe peer chats with verified students</p>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto divide-y divide-emerald-50">
          {chatConversations.length === 0 ? (
            <div className="p-6 text-center text-xs text-emerald-700">
              No active conversations yet. Click "Message Seller" on any marketplace card.
            </div>
          ) : (
            chatConversations.map(conv => {
              const isSelected = activeConversation?.id === conv.id;
              const lastMsg = conv.messages[conv.messages.length - 1];
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveChatId(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-all ${
                    isSelected ? 'bg-emerald-100/70 border-l-4 border-emerald-600' : 'hover:bg-emerald-50/50'
                  }`}
                >
                  <img
                    src={conv.participantAvatar}
                    alt={conv.participantName}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-emerald-300 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-emerald-950 truncate flex items-center gap-1">
                        <span>{conv.participantName}</span>
                      </h4>
                      {lastMsg && (
                        <span className="text-[9px] text-emerald-700">{lastMsg.timestamp}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-emerald-800/80 font-medium truncate mt-0.5">
                      {conv.itemTitle}
                    </p>
                    <p className="text-[10px] text-emerald-650 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : 'Started a conversation'}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* RIGHT CHAT AREA */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col h-full bg-white">
          
          {/* Active Conversation Top Bar */}
          <div className="p-3.5 px-5 border-b border-emerald-100 flex items-center justify-between bg-emerald-50/40">
            <div className="flex items-center gap-3">
              <img
                src={activeConversation.participantAvatar}
                alt=""
                className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-400"
              />
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-emerald-950 flex items-center gap-1">
                  <span>{activeConversation.participantName}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </h3>
                <span className="text-[10px] text-emerald-700 font-semibold">
                  Online • NIET Campus Verified Student
                </span>
              </div>
            </div>

            {/* Linked Item Preview Pill */}
            {linkedItem && (
              <button
                onClick={() => setSelectedItem(linkedItem)}
                className="flex items-center gap-2 p-1.5 px-3 rounded-xl bg-white border border-emerald-200 hover:border-emerald-400 text-left shadow-2xs transition-all cursor-pointer"
              >
                <img src={linkedItem.images[0]} alt="" className="w-7 h-7 rounded-lg object-cover" />
                <div className="hidden sm:block">
                  <p className="text-[10px] font-bold text-emerald-950 line-clamp-1">{linkedItem.title}</p>
                  <p className="text-[9px] text-emerald-700 font-semibold">
                    {linkedItem.type === 'donate' ? 'Free Gift' : `₹${linkedItem.price}`}
                  </p>
                </div>
              </button>
            )}
          </div>

          {/* Quick Action Helper Banner */}
          <div className="px-4 py-2 bg-emerald-50/60 border-b border-emerald-100 flex items-center justify-between text-[11px] text-emerald-900">
            <div className="flex items-center gap-1.5 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Recommended Meetup: Central Library Ground Entrance</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
              Verified Zone
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 bg-emerald-50/15">
            {activeConversation.messages.map(msg => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-md rounded-2xl p-3.5 text-xs shadow-2xs space-y-1 ${
                      isMe 
                        ? 'bg-emerald-600 text-white rounded-br-none' 
                        : 'bg-white text-emerald-950 border border-emerald-100 rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 text-[9px] ${isMe ? 'text-emerald-100' : 'text-emerald-600'}`}>
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Replies Chips */}
          <div className="p-2 px-4 border-t border-emerald-50 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(reply)}
                className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <div className="p-3.5 border-t border-emerald-100 bg-white">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                placeholder="Type a message or proposed meetup time…"
                className="flex-1 px-4 py-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-emerald-50/30"
              />
              <button
                type="submit"
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-xs text-emerald-700">
          Select a chat to begin messaging.
        </div>
      )}

    </div>
  );
};
