import { ChatMessage } from "./api";

/**
 * Temporary utility to download chat conversations as text
 * TODO: Will replace, in future maybe after session storage is implemented
 */
export function downloadConversation(messages: ChatMessage[], sessionId: string) {
  if (messages.length === 0) {
    alert('No conversation to download');
    return;
  }

  const conversationText = messages
    .map(message => {
      const timestamp = message.timestamp.toLocaleString();
      const role = message.role === 'user' ? 'You' : 'CodeMate';
      return `[${timestamp}] ${role}: ${message.content}`;
    })
    .join('\n\n');

  const header = `CodeMate Conversation Export\nSession ID: ${sessionId}\nExported on: ${new Date().toLocaleString()}\nPowered by Brix AI\n\n${'='.repeat(50)}\n\n`;
  const fullContent = header + conversationText;

  const blob = new Blob([fullContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `codemate-conversation-${sessionId}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}