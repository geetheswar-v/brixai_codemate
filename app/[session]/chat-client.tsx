'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage, createMessage, generateSessionId } from '@/lib/api';
import { sendChatMessage } from '@/lib/actions';
import { MessageList } from '@/components/chat/message-list';
import { ChatInput } from '@/components/chat/input';

interface ChatPageClientProps {
  sessionId: string;
  initialMessage?: string;
}

export function ChatPageClient({ sessionId, initialMessage }: ChatPageClientProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasProcessedInitialMessage = useRef(false);

  // Handle initial message from home page
  useEffect(() => {
    if (initialMessage && !hasProcessedInitialMessage.current) {
      hasProcessedInitialMessage.current = true;
      handleSendMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    // Add user message immediately
    const userMessage = createMessage(message, 'user');
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to n8n webhook
      const response = await sendChatMessage(sessionId, message);
      
      // Add assistant response
      const assistantMessage = createMessage(response, 'assistant');
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Add error message
      const errorMessage = createMessage(
        'Sorry, I encountered an error while processing your request. Please try again.',
        'assistant'
      );
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} isLoading={isLoading} />
      <div className="border-t bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <ChatInput 
            onSend={handleSendMessage} 
            disabled={isLoading}
            classname="max-w-none p-4"
          />
        </div>
      </div>
    </div>
  );
}
