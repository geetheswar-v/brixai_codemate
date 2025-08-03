interface SendMessageRequest {
  sessionId: string;
  action: "sendMessage";
  chatInput: string;
}

interface SendMessageResponse {
  output: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

/**
 * Generate a unique session ID using current timestamp
 * Format: YYYYMMDDHHMMSSXXX (where XXX is random 3-digit number)
 */
export function generateSessionId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}${random}`;
}

/**
 * Send a message to the n8n webhook
 */
export async function sendMessage(sessionId: string, message: string): Promise<string> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const username = process.env.N8N_USER_NAME;
  const password = process.env.N8N_USER_PASSWORD;

  if (!webhookUrl || !username || !password) {
    throw new Error('Missing n8n configuration. Please check your environment variables.');
  }

  const requestBody: SendMessageRequest = {
    sessionId,
    action: "sendMessage",
    chatInput: message
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SendMessageResponse = await response.json();
    return data.output;
  } catch (error) {
    console.error('Error sending message to n8n:', error);
    throw new Error('Failed to send message. Please try again.');
  }
}

/**
 * Create a new chat message object
 */
export function createMessage(content: string, role: 'user' | 'assistant'): ChatMessage {
  return {
    id: generateSessionId(),
    content,
    role,
    timestamp: new Date()
  };
}
