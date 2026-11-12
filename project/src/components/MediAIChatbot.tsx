import { useEffect, useRef, useState } from 'react';
import { Bot, Send, X, Sparkles, Loader2 } from 'lucide-react';
import { submitToGoogleSheets } from '@/lib/booking';

type Stage = 'greeting' | 'name' | 'phone' | 'symptoms' | 'saving' | 'done';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
}

let msgId = 0;
const nextId = () => ++msgId;

export default function MediAIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('greeting');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [collected, setCollected] = useState<{ name?: string; phone?: string; symptoms?: string }>({});

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seed greeting when first opened
  useEffect(() => {
    if (open && messages.length === 0) {
      pushBot('Hi! I\'m MediAI, your virtual assistant. I can help collect your details so our doctors can assist you.');
      setTimeout(() => pushBot('Let\'s get started — what\'s your full name?'), 700);
      setStage('name');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Auto-scroll to newest message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when chat opens or stage changes
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, stage]);

  const pushBot = (text: string) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: nextId(), from: 'bot', text }]);
    }, 650);
  };

  const pushUser = (text: string) => {
    setMessages((m) => [...m, { id: nextId(), from: 'user', text }]);
  };

  const handleSend = async () => {
    const value = input.trim();
    if (!value || stage === 'saving' || stage === 'done' || stage === 'greeting') return;

    pushUser(value);
    setInput('');

    if (stage === 'name') {
      setCollected((c) => ({ ...c, name: value }));
      setStage('phone');
      setTimeout(() => pushBot(`Nice to meet you, ${value.split(' ')[0]}! What's the best phone number to reach you on?`), 300);
    } else if (stage === 'phone') {
      setCollected((c) => ({ ...c, phone: value }));
      setStage('symptoms');
      setTimeout(() => pushBot('Thanks. Could you briefly describe your symptoms or reason for visiting?'), 300);
    } else if (stage === 'symptoms') {
      const finalData = { ...collected, symptoms: value };
      setCollected(finalData);
      setStage('saving');
      setTimeout(() => pushBot('Sending your details to our team...'), 300);

      try {
        await submitToGoogleSheets({
          fullName: finalData.name!,
          phoneNumber: finalData.phone!,
          preferredDoctor: 'No preference',
          symptoms: finalData.symptoms!,
        });
      } catch {
        setStage('done');
        pushBot('I couldn\'t send your details right now due to a technical issue. Please call us on (02) 9000 0000 or use the Book Appointment button.');
        return;
      }

      setStage('done');
      setTimeout(() => pushBot('Your details have been recorded. Please consult doctor. Our team will contact you shortly to confirm your appointment.'), 400);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const reset = () => {
    setMessages([]);
    setCollected({});
    setStage('greeting');
    setInput('');
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-[90] w-15 h-15 p-4 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-transform"
        aria-label="Open MediAI chat"
      >
        {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 ring-2 ring-white animate-pulse" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-5 z-[90] w-[calc(100vw-2.5rem)] max-w-sm bg-white rounded-2xl shadow-2xl ring-1 ring-slate-200 flex flex-col overflow-hidden animate-[slideUp_0.2s_ease-out] max-h-[70vh] sm:max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3.5 flex items-center gap-3 text-white">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 ring-2 ring-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-bold leading-tight">MediAI</p>
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              </div>
              <p className="text-xs text-blue-100 leading-tight">Online · Virtual Assistant</p>
            </div>
            <button
              onClick={() => { setOpen(false); reset(); }}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.from === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200 rounded-bl-md shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-700 ring-1 ring-slate-200 rounded-2xl rounded-bl-md px-3.5 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            {stage === 'done' && (
              <div className="pt-1">
                <button
                  onClick={reset}
                  className="w-full px-4 py-2.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100 transition-colors"
                >
                  Start new conversation
                </button>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-3 bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={stage === 'saving' || stage === 'done'}
                placeholder={
                  stage === 'done'
                    ? 'Conversation complete'
                    : stage === 'saving'
                    ? 'Saving...'
                    : 'Type your answer...'
                }
                className="flex-1 px-4 py-2.5 rounded-full bg-slate-100 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || stage === 'saving' || stage === 'done'}
                className="w-10 h-10 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {stage === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
