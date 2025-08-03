'use client';

import { ChatMessage } from '@/lib/api';
import { cn } from '@/lib/utils';
import MarkdownViewer from './md-viewer';

interface MessageProps {
  message: ChatMessage;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "flex w-full mb-6",
      isUser ? "justify-end" : "justify-start"
    )}>
      {isUser ? (
        <div className="max-w-[75%] bg-secondary text-foreground rounded-2xl px-4 py-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          <div className="text-xs mt-2 opacity-70 text-right">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <MarkdownViewer content={message.content} />
          </div>
          <div className="text-xs mt-2 opacity-70 text-left text-muted-foreground">
            CodeMate • {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      )}
    </div>
  );
}
