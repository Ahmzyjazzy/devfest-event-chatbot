import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, ScrollShadow } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import chatbotIcon from "../assets/chatbot.png";
import { SendHorizonal, StopCircle } from "lucide-react";

// Type definitions
type MdComponentProps = {
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
};

interface MessageWithAgent {
    type: "human" | "ai";
    content: string;
    id: string;
    agent?: string;
}

interface ProcessedEvent {
    title: string;
    data: any;
}

interface ChatbotWidgetProps {
    messages: MessageWithAgent[];
    isLoading: boolean;
    scrollAreaRef: React.RefObject<HTMLDivElement | null>;
    onSubmit: (query: string) => void;
    onCancel: () => void;
    displayData: string | null;
    messageEvents: Map<string, ProcessedEvent[]>;
}

// Custom markdown components for rich text formatting
const mdComponents = {
    h1: ({ className, children, ...props }: MdComponentProps) => (
        <h1 className={`text-xl font-bold mt-3 mb-2 ${className || ''}`} {...props}>
            {children}
        </h1>
    ),
    h2: ({ className, children, ...props }: MdComponentProps) => (
        <h2 className={`text-lg font-bold mt-2 mb-1 ${className || ''}`} {...props}>
            {children}
        </h2>
    ),
    h3: ({ className, children, ...props }: MdComponentProps) => (
        <h3 className={`text-md font-bold mt-2 mb-1 ${className || ''}`} {...props}>
            {children}
        </h3>
    ),
    p: ({ className, children, ...props }: MdComponentProps) => (
        <p className={`mb-2 leading-6 ${className || ''}`} {...props}>
            {children}
        </p>
    ),
    a: ({ className, children, href, ...props }: MdComponentProps) => (
        <a
            className={`text-devfest-blue hover:text-devfest-blue/80 underline ${className || ''}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        >
            {children}
        </a>
    ),
    ul: ({ className, children, ...props }: MdComponentProps) => (
        <ul className={`list-disc pl-5 mb-2 ${className || ''}`} {...props}>
            {children}
        </ul>
    ),
    ol: ({ className, children, ...props }: MdComponentProps) => (
        <ol className={`list-decimal pl-5 mb-2 ${className || ''}`} {...props}>
            {children}
        </ol>
    ),
    li: ({ className, children, ...props }: MdComponentProps) => (
        <li className={`mb-1 ${className || ''}`} {...props}>
            {children}
        </li>
    ),
    code: ({ className, children, ...props }: MdComponentProps) => (
        <code
            className={`bg-gray-200 dark:bg-zinc-700 rounded px-1 py-0.5 font-mono text-xs ${className || ''}`}
            {...props}
        >
            {children}
        </code>
    ),
    pre: ({ className, children, ...props }: MdComponentProps) => (
        <pre
            className={`bg-gray-200 dark:bg-zinc-700 p-2 rounded-lg overflow-x-auto font-mono text-xs my-2 ${className || ''}`}
            {...props}
        >
            {children}
        </pre>
    ),
};

// Human message bubble component
const HumanMessageBubble: React.FC<{ message: MessageWithAgent }> = ({ message }) => {
    return (
        <div className="max-w-[80%] p-3 rounded-2xl text-sm bg-devfest-blue text-white rounded-tr-none">
            <ReactMarkdown components={mdComponents} remarkPlugins={[remarkGfm]}>
                {message.content}
            </ReactMarkdown>
        </div>
    );
};

// AI message bubble component
const AiMessageBubble: React.FC<{ message: MessageWithAgent }> = ({ message }) => {
    return (
        <>
            {message.content && (
                <div className="max-w-[80%] bg-white dark:bg-zinc-800 shadow-sm border border-gray-100 dark:border-zinc-700 rounded-2xl rounded-tl-none p-3 text-sm">
                    <ReactMarkdown components={mdComponents} remarkPlugins={[remarkGfm]}>
                        {message.content}
                    </ReactMarkdown>
                    {message.agent && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Agent: {message.agent}</p>
                    )}
                </div>
            )}
        </>
    );
};

export default function ChatbotWidget({
    messages,
    isLoading,
    scrollAreaRef,
    onSubmit,
    onCancel,
}: ChatbotWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollAreaRef.current && isOpen) {
            const scrollViewport = scrollAreaRef.current.querySelector(
                "[data-radix-scroll-area-viewport]"
            );
            if (scrollViewport) {
                scrollViewport.scrollTop = scrollViewport.scrollHeight;
            }
        }
    }, [messages, scrollAreaRef, isOpen]);

    // Show tooltip automatically after a delay when page loads
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setShowTooltip(true);
            }, 3000); // Show after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Hide tooltip when chatbot is opened
    useEffect(() => {
        if (isOpen) {
            setShowTooltip(false);
        }
    }, [isOpen]);

    const handleSendMessage = () => {
        if (!inputValue.trim() || isLoading) return;
        onSubmit(inputValue);
        setInputValue("");
    };

    const handleNewChat = () => {
        onCancel();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`mb-4 ${isExpanded ? 'fixed bottom-6 right-6 top-6 left-6 md:left-auto md:w-[50vw]' : 'w-[350px] sm:w-[400px]'}`}
                    >
                        <Card className={`${isExpanded ? 'h-[calc(100vh-8rem)]' : 'h-[700px]'} shadow-2xl border border-gray-100 dark:border-zinc-800 flex flex-col`}>
                            <CardHeader className="flex gap-3 p-4 border-b border-devfest-blue/10 dark:border-zinc-800 bg-gradient-to-r from-devfest-blue/5 via-white to-devfest-yellow/5 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 backdrop-blur-sm">
                                <div className="p-2 bg-devfest-blue/10 rounded-full">
                                    <img src={chatbotIcon} alt="DevFest Bot" className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col flex-1">
                                    <p className="text-md font-bold">DevFest Assistant</p>
                                    <p className="text-small text-default-500">Online</p>
                                </div>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onPress={handleNewChat}
                                    title="New Chat"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </Button>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onPress={() => setIsExpanded(!isExpanded)}
                                    title={isExpanded ? "Minimize" : "Expand"}
                                >
                                    {isExpanded ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                        </svg>
                                    )}
                                </Button>
                            </CardHeader>

                            <CardBody className="p-0 overflow-hidden bg-gray-50 dark:bg-black/50 flex-1">
                                <ScrollShadow ref={scrollAreaRef} className="h-full p-4 space-y-3 scroll-area-viewport">
                                    <div className="flex justify-start">
                                        <div className="max-w-[80%] bg-white dark:bg-zinc-800 shadow-sm border border-gray-100 dark:border-zinc-700 rounded-2xl rounded-tl-none p-3 text-sm">
                                            Hi there! I'm your DevFest Guide. Ask me anything about the event!
                                        </div>
                                    </div>
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.type === "human" ? "justify-end" : "justify-start"}`}
                                        >
                                            {message.type === "human" ? (
                                                <HumanMessageBubble message={message} />
                                            ) : (
                                                <AiMessageBubble message={message} />
                                            )}
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                                <span>Thinking...</span>
                                            </div>
                                        </div>
                                    )}
                                </ScrollShadow>
                            </CardBody>

                            <CardFooter className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 flex-col gap-2">
                                <div className="flex w-full gap-2">
                                    <Input
                                        placeholder="Type a message..."
                                        value={inputValue}
                                        onValueChange={setInputValue}
                                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                        disabled={isLoading}
                                        classNames={{
                                            inputWrapper: "bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors",
                                        }}
                                    />
                                    {isLoading && (
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="flat"
                                            color="danger"
                                            onPress={onCancel}
                                            className="bg-devfest-red text-white"
                                        >
                                            <StopCircle />
                                        </Button>
                                    )}
                                    {!isLoading && (
                                        <Button
                                            isIconOnly
                                            className="bg-devfest-blue text-white"
                                            onPress={handleSendMessage}
                                        >
                                            <SendHorizonal />
                                        </Button>
                                    )}
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tooltip popup */}
            <AnimatePresence>
                {showTooltip && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-4 right-20 mr-2"
                    >
                        <div className="bg-devfest-black text-white px-4 py-3 rounded-lg shadow-xl relative w-[240px] max-w-[240px]">
                            <button
                                onClick={() => setShowTooltip(false)}
                                className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
                                aria-label="Close tooltip"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <p className="text-sm font-medium pr-4">💬 Need help?</p>
                            <p className="text-xs mt-1 opacity-90">Ask me anything about DevFest!</p>
                            {/* Arrow pointing right */}
                            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-devfest-black transform -translate-y-1/2 rotate-45"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border-2 ${isOpen
                    ? "bg-gray-900 text-white dark:bg-white dark:text-black border-gray-700 dark:border-gray-200"
                    : "bg-devfest-blue text-white border-devfest-blue animate-pulse-glow"
                    }`}
            >
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-devfest-blue opacity-75 animate-ping"></span>
                )}

                <span className="relative z-10">
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <img src={chatbotIcon} alt="Chat" className="w-8 h-8" />
                    )}
                </span>
            </motion.button>
        </div>
    );
}

