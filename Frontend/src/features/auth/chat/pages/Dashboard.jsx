import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

const initialChats = [
  { id: 1, title: "Planning a weekend trip", preview: "Here are a few ideas for your itinerary...", time: "10:42 AM" },
  { id: 2, title: "Explain quantum computing", preview: "The simplest way to understand it is...", time: "Yesterday" },
  { id: 3, title: "Best books to read", preview: "I would start with these five picks...", time: "Mon" },
  { id: 4, title: "Healthy dinner recipes", preview: "A quick, colorful meal you can make...", time: "Sun" },
];

const Dashboard = () => {
  const { initializeSocket } = useChat();
  const { user } = useSelector((state) => state.auth);
  const [selectedChat, setSelectedChat] = useState(initialChats[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, role: "user", content: "Can you help me plan a relaxed weekend trip?" },
    { id: 2, role: "assistant", content: "Absolutely. Tell me your destination, budget, and what kind of pace you would enjoy, and I will put together a thoughtful itinerary." },
  ]);

  useEffect(() => {
    const socket = initializeSocket();
    return () => socket?.disconnect?.();
  }, [initializeSocket]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), role: "user", content: trimmedMessage },
    ]);
    setMessage("");
  };

  const displayName = user?.name || user?.username || user?.email?.split("@")[0] || "Guest";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <main className="min-h-screen bg-[#f6f8f7] px-3 py-3 font-sans text-[#182322] sm:px-6 sm:py-6">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1440px] overflow-hidden rounded-[28px] border border-[#dce5e1] bg-white shadow-[0_24px_70px_rgba(27,57,48,0.10)] sm:min-h-[calc(100vh-3rem)]">
        <aside className="hidden w-[290px] shrink-0 flex-col border-r border-[#e5ece9] bg-[#fbfcfb] md:flex">
          <div className="flex items-center gap-3 px-7 py-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#154c42] text-lg font-bold text-white">P</div>
            <div><p className="text-[17px] font-bold tracking-[-0.02em] text-[#123d35]">Perplexity</p><p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8b9c96]">AI workspace</p></div>
          </div>
          <div className="px-4"><button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e4f1ed] px-4 py-3 text-sm font-semibold text-[#185a4c] transition hover:bg-[#d8ebe5]"><span className="text-lg leading-none">+</span> New thread</button></div>
          <div className="mt-8 flex-1 overflow-y-auto px-3">
            <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#9aa9a4]">Recent chats</p>
            <nav aria-label="Recent chats" className="space-y-1">
              {initialChats.map((chatItem) => (
                <button key={chatItem.id} type="button" onClick={() => setSelectedChat(chatItem)} className={`w-full rounded-xl px-3 py-3 text-left transition ${selectedChat.id === chatItem.id ? "bg-white shadow-[0_3px_14px_rgba(26,66,55,0.08)] ring-1 ring-[#e3ebe7]" : "hover:bg-[#f1f6f3]"}`}>
                  <div className="flex items-center justify-between gap-2"><span className="truncate text-sm font-semibold text-[#28423b]">{chatItem.title}</span><span className="shrink-0 text-[10px] text-[#9aa9a4]">{chatItem.time}</span></div>
                  <p className="mt-1 truncate text-xs text-[#8b9c96]">{chatItem.preview}</p>
                </button>
              ))}
            </nav>
          </div>
          <div className="border-t border-[#e5ece9] p-4"><div className="flex items-center gap-3 rounded-xl px-2 py-2"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8ece5] text-xs font-bold text-[#185a4c]">{initials}</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-[#28423b]">{displayName}</p><p className="text-xs text-[#8b9c96]">Personal workspace</p></div><span className="ml-auto text-[#90a39c]">•••</span></div></div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col bg-white">
          <header className="flex items-center justify-between border-b border-[#edf1ef] px-5 py-5 sm:px-10"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf6f2] text-sm font-bold text-[#185a4c] md:hidden">P</div><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b9c96]">Conversation</p><h1 className="mt-1 truncate text-lg font-bold tracking-[-0.02em] text-[#183a33] sm:text-xl">{selectedChat.title}</h1></div></div><button type="button" aria-label="More conversation options" className="rounded-lg px-3 py-2 text-lg tracking-widest text-[#78908a] transition hover:bg-[#f2f6f4]">•••</button></header>
          <div className="flex flex-1 flex-col justify-end overflow-y-auto px-5 py-8 sm:px-16 lg:px-28"><div className="mx-auto w-full max-w-3xl space-y-7">{messages.map((item) => (<article key={item.id} className={`flex gap-3 ${item.role === "user" ? "justify-end" : "justify-start"}`}>{item.role === "assistant" && <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#154c42] text-xs font-bold text-white">P</div>}<div className={item.role === "user" ? "max-w-[85%] rounded-2xl rounded-br-md bg-[#edf6f2] px-5 py-3.5 text-sm leading-6 text-[#31524a]" : "max-w-[85%] pt-1 text-[15px] leading-7 text-[#49635c]"}>{item.content}</div>{item.role === "user" && <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d8ece5] text-[10px] font-bold text-[#185a4c]">{initials}</div>}</article>))}</div></div>
          <div className="px-5 pb-5 sm:px-10 sm:pb-8"><form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-[#dce8e3] bg-[#fbfdfc] p-2 pl-5 shadow-[0_8px_26px_rgba(28,69,57,0.06)] focus-within:border-[#7eb5a5] focus-within:ring-4 focus-within:ring-[#e7f3ef]"><textarea value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); handleSubmit(event); } }} rows="1" placeholder="Ask anything..." aria-label="Chat message" className="max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2.5 text-sm text-[#28423b] outline-none placeholder:text-[#a0b0aa]" /><button type="submit" aria-label="Send message" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#154c42] text-xl text-white transition hover:bg-[#0f3b33] disabled:cursor-not-allowed disabled:opacity-40" disabled={!message.trim()}>↑</button></form><p className="mt-3 text-center text-[11px] text-[#a2afaa]">Perplexity can make mistakes. Check important information.</p></div>
        </section>
      </div>
    </main>
  )

};

export default Dashboard;
