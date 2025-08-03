import { ChatPageClient } from './chat-client';

interface ChatPageProps {
  params: Promise<{ session: string }>;
  searchParams: Promise<{ firstMessage?: string }>;
}

export default async function ChatPage({ params, searchParams }: ChatPageProps) {
  const { session } = await params;
  const { firstMessage } = await searchParams;

  return (
    <ChatPageClient 
      sessionId={session} 
      initialMessage={firstMessage}
    />
  );
}