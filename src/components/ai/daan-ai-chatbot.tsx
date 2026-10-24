
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  LoaderCircle,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";

type Provider = "openai" | "gemini";
type MessageRole = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

interface ChatApiResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

const QUICK_QUESTIONS = [
  "How does Daan work?",
  "What does verified mean?",
  "How can I request help?",
  "How can I donate?",
];

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Assalamu Alaikum! Welcome to Daan. I'm your AI assistant. Ask me about donation requests, verification, and how Daan works.",
};

function getApiBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_BACKEND_URL ?? "").replace(/\/+$/, "");
}

function getErrorMessage(
  status: number,
  serverMessage?: string,
): string {
  if (status === 429) {
    return (
      serverMessage ||
      "The selected AI provider has reached its usage limit. Please try another provider or try again later."
    );
  }

  if (status === 401 || status === 403) {
    return (
      serverMessage ||
      "The request was not authorized. Please check the backend authentication settings."
    );
  }

  if (status === 404) {
    return "The AI API endpoint was not found. Please check the backend URL and route configuration.";
  }

  if (status >= 500) {
    return (
      serverMessage ||
      "The AI server encountered an error. Please check the backend logs and try again."
    );
  }

  return serverMessage || `The request failed (HTTP ${status}).`;
}

export default function DaanAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState<Provider>("gemini");
  const [messages, setMessages] = useState<ChatMessage[]>([
    WELCOME_MESSAGE,
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastFailedMessage, setLastFailedMessage] = useState("");
  const [lastFailedProvider, setLastFailedProvider] =
    useState<Provider>("gemini");
  const [showProviderMenu, setShowProviderMenu] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestInProgressRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading, error]);

  useEffect(() => {
    if (isOpen) {
      const timeout = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      return () => window.clearTimeout(timeout);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (rawMessage: string, selectedProvider: Provider) => {
      const message = rawMessage.trim();

      if (!message || requestInProgressRef.current) {
        return;
      }

      const baseUrl = getApiBaseUrl();

      if (!baseUrl) {
        setError(
          "Backend URL is missing. Set NEXT_PUBLIC_BACKEND_URL in your frontend environment variables.",
        );
        return;
      }

      requestInProgressRef.current = true;
      setIsLoading(true);
      setError("");
      setLastFailedMessage("");
      setLastFailedProvider(selectedProvider);
      setInput("");

      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "user",
          content: message,
        },
      ]);

      try {
        const response = await fetch(`${baseUrl}/api/ai/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            message,
            provider: selectedProvider,
          }),
        });

        const contentType =
          response.headers.get("content-type") ?? "";

        if (!contentType.toLowerCase().includes("application/json")) {
          const responseText = await response.text();

          console.error("Daan AI returned a non-JSON response:", {
            status: response.status,
            url: response.url,
            contentType,
            response: responseText.slice(0, 300),
          });

          throw new Error(
            response.status === 404
              ? "AI endpoint not found. Verify the backend URL and /api/ai/chat route."
              : `The server returned an unexpected response (HTTP ${response.status}). Check the backend deployment and logs.`,
          );
        }

        const data = (await response.json()) as ChatApiResponse;

        if (!response.ok) {
          throw new Error(
            getErrorMessage(
              response.status,
              data.message || data.error,
            ),
          );
        }

        const answer = data.message?.trim();

        if (!answer) {
          throw new Error(
            "The AI server returned an empty response. Please try again.",
          );
        }

        setMessages((previous) => [
          ...previous,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: answer,
          },
        ]);
      } catch (caughtError) {
        const messageText =
          caughtError instanceof Error
            ? caughtError.message
            : "Something went wrong. Please try again.";

        console.error("Daan AI request failed:", caughtError);

        setError(messageText);
        setLastFailedMessage(message);
        setLastFailedProvider(selectedProvider);
      } finally {
        requestInProgressRef.current = false;
        setIsLoading(false);
      }
    },
    [],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input, provider);
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      void sendMessage(lastFailedMessage, lastFailedProvider);
    }
  };

  const handleNewChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setError("");
    setLastFailedMessage("");
    setShowProviderMenu(false);
  };

  return (
    <>
      {/* Floating chatbot launcher */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? "Close Daan AI assistant" : "Open Daan AI assistant"}
        aria-expanded={isOpen}
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl transition hover:scale-105 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <MessageCircle size={25} />
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <section
          aria-label="Daan AI Assistant"
          className="fixed bottom-24 right-3 z-50 flex h-[min(660px,calc(100dvh-120px))] w-[calc(100vw-24px)] max-w-[410px] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:right-5"
        >
          {/* Header */}
          <header className="flex items-center justify-between gap-3 bg-emerald-700 px-4 py-4 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Bot size={25} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate font-bold">
                  Daan AI Assistant
                </h2>
                <p className="text-xs text-emerald-100">
                  Your guide to Donate with Trust
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNewChat}
              title="Start a new chat"
              aria-label="Start a new chat"
              className="shrink-0 rounded-lg p-2 transition hover:bg-white/15"
            >
              <RotateCcw size={18} />
            </button>
          </header>

          {/* Provider selector */}
          <div className="border-b border-border bg-muted/30 px-4 py-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Choose your AI assistant
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setProvider("openai");
                  setError("");
                  setShowProviderMenu(false);
                }}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  provider === "openai"
                    ? "border-emerald-600 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300"
                    : "border-border bg-background hover:border-emerald-500/50"
                }`}
              >
                <BrainCircuit size={17} />
                OpenAI
                {provider === "openai" && <Check size={15} />}
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => {
                  setProvider("gemini");
                  setError("");
                  setShowProviderMenu(false);
                }}
                className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  provider === "gemini"
                    ? "border-emerald-600 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300"
                    : "border-border bg-background hover:border-emerald-500/50"
                }`}
              >
                <Sparkles size={17} />
                Gemini
                {provider === "gemini" && <Check size={15} />}
              </button>
            </div>

            <p className="mt-2 text-center text-xs text-muted-foreground">
              Selected: {provider === "openai" ? "OpenAI" : "Gemini"}
            </p>
          </div>

          {/* Conversation */}
          <div
            aria-live="polite"
            className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
                      <Bot size={17} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-3 text-sm leading-6 ${
                      isUser
                        ? "rounded-br-sm bg-emerald-600 text-white"
                        : "rounded-bl-sm border border-border bg-muted/50 text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              );
            })}

            {messages.length === 1 && !isLoading && (
              <div className="space-y-2 pt-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Try asking:
                </p>

                {QUICK_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void sendMessage(question, provider)}
                    className="block w-full rounded-xl border border-border px-3 py-2.5 text-left text-sm transition hover:border-emerald-500/50 hover:bg-emerald-500/5"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
                  <Bot size={17} />
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                  <LoaderCircle size={16} className="animate-spin" />
                  {provider === "openai" ? "OpenAI" : "Gemini"} is thinking...
                </div>
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/5 p-3"
              >
                <p className="text-sm leading-6 text-red-600 dark:text-red-400">
                  {error}
                </p>

                {lastFailedMessage && !isLoading && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="mt-2 inline-flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-500/10 dark:text-red-400"
                  >
                    <RotateCcw size={14} />
                    Try again with {lastFailedProvider === "openai" ? "OpenAI" : "Gemini"}
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Composer */}
          <div className="border-t border-border bg-background p-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={`Ask ${provider === "openai" ? "OpenAI" : "Gemini"} about Daan...`}
                aria-label="Message to Daan AI"
                maxLength={2000}
                disabled={isLoading}
                className="min-w-0 flex-1 rounded-xl border border-border bg-muted/30 px-3.5 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <LoaderCircle size={19} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </form>

            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              Do not share passwords, OTPs, or payment details.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
