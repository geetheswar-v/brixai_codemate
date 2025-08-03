import { ChatInputWrapper } from "@/components/chat/home-chat-input";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-10 flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold font-josefin">Are You Looking for Medical Codes?</h1>
      <p className="mt-2 text-gray-600">CodeMate acts as your always-available Subject Matter Expert (SME), providing instant, accurate answers to complex medical coding questions across CPT, ICD-10, and HCPCS. Built with NLP and regulatory intelligence, it boosts coder productivity and reduces reliance on human SMEs.</p>
      <ChatInputWrapper />
    </div>
  );
}
