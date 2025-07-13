import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize chat with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'greeting',
          sender: 'bot',
          text: t('chatbot.greeting'),
          timestamp: new Date()
        }
      ]);
    }
  }, [t, messages.length]);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response after delay
    setTimeout(() => {
      let responses: string[] = [];
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('lodge') || lowerInput.includes('complaint') || lowerInput.includes('submit')) {
        responses.push('To lodge a complaint, go to the "Lodge Complaint" page and fill out the form with details about your issue. You can upload attachments if needed and submit anonymously if preferred.');
      }

      if (lowerInput.includes('track') || lowerInput.includes('status')) {
        responses.push('To track your complaint, navigate to the "Track Complaint" page and enter your complaint ID (e.g., CMP123456). You will see the current status, assigned department, and expected resolution date.');
      }

      if (lowerInput.includes('language') || lowerInput.includes('translate')) {
        responses.push('You can change the language using the language selector in the top right corner of the navigation bar. We currently support English, Hindi, and Kannada.');
      }

      if (lowerInput.includes('dark') || lowerInput.includes('light') || lowerInput.includes('theme')) {
        responses.push('You can toggle between dark and light mode by clicking the sun/moon icon in the top right corner of the page.');
      }

      if (lowerInput.includes('login') || lowerInput.includes('register') || lowerInput.includes('account')) {
        responses.push('You can create an account by clicking "Register" in the navigation bar. If you already have an account, click "Login". An account allows you to track all your complaints in one place.');
      }

      // Default response if no match found
      if (responses.length === 0) {
        responses.push("I'm here to help with any questions about lodging or tracking complaints, changing language settings, or navigating the system. How else can I assist you?");
      }

      const botResponse = responses.join(' ');

      const newBotMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className={`fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50 transition-colors duration-200 ${
          isOpen
            ? 'bg-error-500 hover:bg-error-600 text-white'
            : 'bg-primary-500 hover:bg-primary-600 text-white'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 sm:w-96 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col z-40 border border-gray-200 dark:border-gray-700 animate-fade-in">
          <div className="bg-primary-500 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">{t('chatbot.title')}</h3>
            <button
              onClick={toggleChat}
              className="text-white/80 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-gray-800 dark:text-gray-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse delay-100"></div>
                    <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 overflow-x-auto whitespace-nowrap">
            <div className="flex space-x-2">
              {(Array.isArray(t('chatbot.suggestions', { returnObjects: true }))
                ? (t('chatbot.suggestions', { returnObjects: true }) as string[])
                : []
              ).map((suggestion: string, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(suggestion);
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                  className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center">
            <input
              type="text"
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              placeholder={t('chatbot.placeholder')}
              className="flex-1 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
