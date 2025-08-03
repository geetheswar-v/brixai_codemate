'use client';

import { ChatInput } from './input';
import { generateSessionId } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ChatInputWrapper() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string) => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    try {
      // Generate new session ID
      const sessionId = generateSessionId();
      
      // Navigate to the new session page immediately
      router.push(`/${sessionId}?firstMessage=${encodeURIComponent(message)}`);
    } catch (error) {
      console.error('Failed to create new session:', error);
      setIsLoading(false);
    }
  };

  return (
    <ChatInput 
      onSend={handleSend} 
      disabled={isLoading}
      classname="max-w-4xl"
    />
  );
}
