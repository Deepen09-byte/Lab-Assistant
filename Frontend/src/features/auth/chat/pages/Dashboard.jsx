import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { setCurrentChatId } from "../chat.slice";


const Dashboard = () => {
  const { handleSendMessage, initializeSocket } = useChat();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const chats = useSelector((state) => state.chat.chats);

  const currentChatId = useSelector((state) => state.chat.currentChatId);

  // const selectedChat = chats?.[currentChatId];

  const currentChat = chats?.[currentChatId];

  const [message, setMessage] = useState("");

  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = initializeSocket();
    return () => socket?.disconnect?.();
  }, [initializeSocket]);

  // useEffect(() => {
  //       if (!selectedChat && chats.length > 0) {
  //           selectedChat(chats[0]);
  //       }
  //   }, [chats, selectedChat]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    await handleSendMessage({ message: trimmedMessage, chatId: currentChatId });

    setMessage("");
  };

  const displayName =
    user?.name || user?.username || user?.email?.split("@")[0] || "Guest";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <main className="min-h-screen bg-[#080a0b] px-3 py-3 font-sans text-[#d9dfe1] sm:px-6 sm:py-6">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-360 overflow-hidden rounded-[28px] border border-[#2c3235] bg-[#15191b] shadow-[0_24px_70px_rgba(0,0,0,0.42)] sm:min-h-[calc(100vh-3rem)]">
        <aside className="hidden w-72.5 shrink-0 flex-col border-r border-[#2c3235] bg-[#111416] md:flex">
          <div className="flex items-center gap-3 px-7 py-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3b4548] text-lg font-bold text-white">
              P
            </div>
            <div>
              <p className="text-[17px] font-bold tracking-[-0.02em] text-[#e7eaeb]">
                Lab Assistant
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8a9497]">
                AI workspace
              </p>
            </div>
          </div>
          <div className="px-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2b3437] px-4 py-3 text-sm font-semibold text-[#d3d8da] transition hover:bg-[#364146]"
            >
              <span className="text-lg leading-none">+</span> New thread
            </button>
          </div>
          <div className="mt-8 flex-1 overflow-y-auto px-3">
            <p className="px-3 pb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#7d878a]">
              Recent chats
            </p>
            <nav aria-label="Recent chats" className="space-y-1">
              {Object.values(chats).map((chat) => (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => dispatch(setCurrentChatId(chat.id))}
                  className={`w-full rounded-xl px-3 py-3 text-left transition ${
                    currentChatId === chat.id
                      ? "bg-[#20272a] shadow-[0_3px_14px_rgba(0,0,0,0.16)] ring-1 ring-[#4a565a]"
                      : "hover:bg-[#1a2023]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-[#d8dddf]">
                      {chat.title}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
          <div className="border-t border-[#2c3235] p-4">
            <div className="flex items-center gap-3 rounded-xl px-2 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#384247] text-xs font-bold text-[#d3d8da]">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#d8dddf]">
                  {displayName}
                </p>
                <p className="text-xs text-[#8a9497]">Personal workspace</p>
              </div>
              <span className="ml-auto text-[#90a39c]">•••</span>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col bg-[#15191b]">
          <header className="flex items-center justify-between border-b border-[#2b3235] px-5 py-5 sm:px-10">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#303a3f] text-sm font-bold text-[#d3d8da] md:hidden">
                P
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a9497]">
                  Conversation
                </p>
                <h1 className="mt-1 truncate text-lg font-bold tracking-[-0.02em] text-[#e6e9ea] sm:text-xl">
                  {currentChat?.title || "New conversation"}
                </h1>
              </div>
            </div>
            <button
              type="button"
              aria-label="More conversation options"
              className="rounded-lg px-3 py-2 text-lg tracking-widest text-[#8a9497] transition hover:bg-[#20272a]"
            >
              •••
            </button>
          </header>
          <div className="flex flex-1 flex-col justify-end overflow-y-auto px-5 py-8 sm:px-16 lg:px-28">
            <div className="mx-auto w-full max-w-3xl space-y-7">
              {currentChat?.messages?.map((item) => (
                <article
                  key={item._id}
                  className={`flex gap-3 ${item.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {item.role === "ai" && (
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3b4548] text-xs font-bold text-white">
                      P
                    </div>
                  )}
                  <div
                    className={
                      item.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-[#343e42] px-5 py-3.5 text-sm leading-6 text-[#d7dcde]"
                        : "max-w-[85%] pt-1 text-[15px] leading-7 text-[#b8c0c3]"
                    }
                  >
                    {item.content}
                  </div>
                  {item.role === "user" && (
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#384247] text-[10px] font-bold text-[#d3d8da]">
                      {initials}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
          <div className="px-5 pb-5 sm:px-10 sm:pb-8">
            <form
              onSubmit={handleSubmit}
              className="mx-auto flex max-w-3xl items-end gap-3 rounded-2xl border border-[#3a4448] bg-[#101416] p-2 pl-5 shadow-[0_8px_26px_rgba(0,0,0,0.22)] focus-within:border-[#7f8d92] focus-within:ring-4 focus-within:ring-[#303a3e]"
            >
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmit(event);
                  }
                }}
                rows="1"
                placeholder="Ask anything..."
                aria-label="Chat message"
                className="max-h-32 min-h-10 flex-1 resize-none bg-transparent py-2.5 text-sm text-[#d8dddf] outline-none placeholder:text-[#7d878a]"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3b4548] text-xl text-white transition hover:bg-[#2b3337] disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!message.trim()}
              >
                ↑
              </button>
            </form>
            <p className="mt-3 text-center text-[11px] text-[#7d878a]">
              Lab Assistant can make mistakes. Check important information.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
