'use server';

import { sendMessage } from '@/lib/api';
import { redirect } from 'next/navigation';

/**
 * Server action to send a chat message
 * This runs on the server and handles the n8n webhook call
 */
export async function sendChatMessage(sessionId: string, message: string): Promise<string> {
  if (!message.trim()) {
    throw new Error('Message cannot be empty');
  }

  try {
    const response = await sendMessage(sessionId, message);
    return response;
  } catch (error) {
    console.error('Server action error:', error);
    throw new Error('Failed to send message');
  }
}

/**
 * Server action to create a new chat session and redirect
 * This creates a new session and redirects to the chat page
 */
export async function createNewSession() {
  const { generateSessionId } = await import('@/lib/api');
  const sessionId = generateSessionId();
  redirect(`/${sessionId}`);
}
