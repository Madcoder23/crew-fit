import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { chatMessages as initialMessages, type ChatMessage } from '@/lib/mockData';

const ChatScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'user1',
      senderName: 'You',
      message: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-lg mx-auto">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-display font-bold text-foreground">💬 Crew Chat</h1>
        <p className="text-xs text-muted-foreground">Iron Wolves 🐺 • 5 members</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 space-y-3 pb-2">
        {messages.map((msg, i) => {
          const isMe = msg.senderId === 'user1';
          const isAI = msg.isAI;
          return (
            <motion.div
              key={msg.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                isMe
                  ? 'gradient-fire text-primary-foreground rounded-br-md'
                  : isAI
                    ? 'bg-muted/80 border border-ember/30 rounded-bl-md'
                    : 'glass rounded-bl-md'
              }`}>
                {!isMe && (
                  <p className={`text-[10px] font-medium mb-0.5 ${isAI ? 'gradient-fire-text' : 'text-muted-foreground'}`}>
                    {msg.senderName}
                  </p>
                )}
                <p className={`text-sm ${isMe ? '' : 'text-foreground'}`}>{msg.message}</p>
                <p className={`text-[9px] mt-1 ${isMe ? 'text-primary-foreground/60' : 'text-muted-foreground/60'}`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 glass rounded-2xl px-4 py-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            placeholder="Hype up your crew..."
          />
          <button
            onClick={sendMessage}
            className="w-8 h-8 rounded-full gradient-fire flex items-center justify-center shadow-fire"
          >
            <Send className="w-3.5 h-3.5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
