"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  classname?: string;
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ classname, onSend, disabled = false }: ChatInputProps){
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 120;
      textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
    }
  }, [message]);

  return (
    <div className={cn("w-full mx-auto p-4", classname)}>
      <div
        className={`
          relative flex items-end gap-2 ps-5 pe-1 rounded-3xl border-2 transition-all duration-200
          bg-secondary/20
          ${isFocused
            ? 'border-primary shadow-sm'
            : 'border-border hover:border-primary/50'
          }
        `}
      >
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Codemate a medical code question...."
          disabled={disabled}
          className={`
            flex-1 min-h-[40px] max-h-[120px] resize-none bg-transparent 
            border-none outline-none placeholder:text-muted-foreground
            text-sm leading-6 py-2
            scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          rows={1}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'hsl(var(--muted)) transparent'
          }}
        />

        <Button
          onClick={sendMessage}
          size="sm"
          disabled={!message.trim() || disabled}
          className="rounded-full h-8 w-8 p-0 flex-shrink-0 self-end mb-1"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};