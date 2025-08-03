'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage, createMessage } from '@/lib/api';
import { sendChatMessage } from '@/lib/actions';
import { MessageList } from '@/components/chat/message-list';
import { ChatInput } from '@/components/chat/input';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle, X } from 'lucide-react';
import { downloadConversation } from '@/lib/utils';

interface ChatPageClientProps {
  sessionId: string;
  initialMessage?: string;
}

export function ChatPageClient({ sessionId, initialMessage }: ChatPageClientProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBetaNotice, setShowBetaNotice] = useState(true);
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

  const handleDownload = () => {
    downloadConversation(messages, sessionId);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Beta Notice */}
      {showBetaNotice && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-2">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-200">
              <AlertCircle className="h-4 w-4" />
              <span><strong>Beta Notice:</strong> Sessions are not saved. Download your conversation to keep a copy.</span>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button
                  onClick={handleDownload}
                  size="sm"
                  variant="outline"
                  className="text-xs border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 hover:bg-yellow-100 dark:hover:bg-yellow-800/30"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              )}
              <Button
                onClick={() => setShowBetaNotice(false)}
                size="sm"
                variant="ghost"
                className="text-yellow-800 dark:text-yellow-200 hover:bg-yellow-100 dark:hover:bg-yellow-800/30 p-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
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
