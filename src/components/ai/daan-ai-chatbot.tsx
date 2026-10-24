
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  BrainCircuit,
  HeartHandshake,
  Loader2,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type Provider = "openai" | "gemini";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const quickQuestions = [
  "How does Daan work?",
  "How can I submit a request?",
  "How are requests verified?",
];

const welcomeMessage =
  "Assalamu Alaikum! Welcome to Daan. I'm your AI assistant. Ask me about donation requests, verification, and how Daan works.";

export default function DaanAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [provider, setProvider] = useState<Provider>("gemini");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: welcomeMessage,
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, error]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  async function sendMessage(text?: string) {
    const message = (text ?? input).trim();

    if (!message || isLoading) return;

    if (message.length > 2000) {
      setError("Message must be 2000 characters or fewer.");
      return;
    }

    const selectedProvider = provider;

    setMessages((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
      },
    ]);

    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(
        /\/+$/,
        "",
      );

      if (!baseUrl) {
        throw new Error("Backend URL is not configured.");
      }

      const response = await fetch(`${baseUrl}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message,
          provider: selectedProvider,
        }),
      });

      const data: {
        success?: boolean;
        message?: string;
      } = await response.json();

      if (!response.ok || !data.success || !data.message) {
        if (response.status === 429) {
          throw new Error(
            `${selectedProvider === "gemini" ? "Gemini" : "OpenAI"} quota exceeded. Please try again later or choose the other AI provider.`,
          );
        }

        throw new Error(
          data.message ||
            `The ${selectedProvider === "gemini" ? "Gemini" : "OpenAI"} assistant is temporarily unavailable.`,
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.message!,
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to Daan AI. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3">
      {isOpen && (
        <section
          aria-label="Daan AI chat"
          className="flex h-[min(650px,calc(100dvh-110px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
        >
          <header className="flex items-center justify-between gap-3 bg-emerald-700 px-4 py-4 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <HeartHandshake size={25} />
              </div>
              <div className="min-w-0">
                <h2 className="font-semibold">Daan AI Assistant</h2>
                <p className="mt-0.5 text-xs text-emerald-100">
                  Your guide to Donate with Trust
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="rounded-lg p-2 transition hover:bg-white/15"
            >
              <X size={20} />
            </button>
          </header>

          {/* AI provider selection */}
          <div className="border-b border-border bg-background p-3">
            <p className="mb-2 text-xs font-semibold text-muted-foreground">
              CHOOSE YOUR AI ASSISTANT
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                aria-pressed={provider === "openai"}
                disabled={isLoading}
                onClick={() => setProvider("openai")}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  provider === "openai"
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-border bg-background hover:border-emerald-600"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <BrainCircuit size={18} />
                OpenAI
              </button>

              <button
                type="button"
                aria-pressed={provider === "gemini"}
                disabled={isLoading}
                onClick={() => setProvider("gemini")}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  provider === "gemini"
                    ? "border-emerald-700 bg-emerald-700 text-white"
                    : "border-border bg-background hover:border-emerald-600"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <Sparkles size={18} />
                Gemini
              </button>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Selected: {provider === "openai" ? "OpenAI" : "Gemini"}
            </p>
          </div>

          {/* Messages */}
          <div
            aria-live="polite"
            className="flex-1 space-y-4 overflow-y-auto bg-muted/20 p-4"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles size={14} className="text-emerald-600" />
              Ask about requests, verification, and donations.
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <Bot size={17} />
                  </div>
                )}

                <div
                  className={`max-w-[84%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-md bg-emerald-700 text-white"
                      : "rounded-bl-md border border-border bg-background"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  <Bot size={17} />
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                  <Loader2 size={16} className="animate-spin" />
                  {provider === "gemini" ? "Gemini" : "OpenAI"} is thinking...
                </div>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/30 bg-red-500/5 p-3 text-sm"
              >
                <p className="text-red-700 dark:text-red-300">{error}</p>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    const lastUserMessage = [...messages]
                      .reverse()
                      .find((item) => item.role === "user");

                    if (lastUserMessage) {
                      void sendMessage(lastUserMessage.content);
                    }
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 font-semibold underline underline-offset-4 disabled:opacity-50"
                >
                  <RotateCcw size={13} />
                  Try again
                </button>
              </div>
            )}

            {messages.length === 1 && !isLoading && (
              <div className="space-y-2 pt-1">
                <p className="text-xs font-semibold text-muted-foreground">
                  QUICK QUESTIONS
                </p>
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void sendMessage(question)}
                    disabled={isLoading}
                    className="block w-full rounded-xl border border-border bg-background px-3 py-2.5 text-left text-sm transition hover:border-emerald-600/50 hover:bg-emerald-500/5 disabled:opacity-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage();
            }}
            className="border-t border-border bg-background p-3"
          >
            <div className="flex items-end gap-2 rounded-xl border border-border bg-muted/30 p-2 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    void sendMessage();
                  }
                }}
                placeholder={`Ask ${provider === "gemini" ? "Gemini" : "OpenAI"} about Daan...`}
                aria-label="Your message"
                maxLength={2000}
                rows={1}
                disabled={isLoading}
                className="max-h-28 min-h-9 flex-1 resize-y bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60"
              />

              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || isLoading}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isLoading ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Send size={17} />
                )}
              </button>
            </div>

            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Do not share passwords, OTPs, or payment details.
            </p>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close Daan AI" : "Open Daan AI"}
        aria-expanded={isOpen}
        className="flex size-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg transition hover:scale-105 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
}
