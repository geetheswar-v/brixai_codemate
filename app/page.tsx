import { ChatInputWrapper } from "@/components/chat/home-chat-input";

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-10 flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold font-josefin">Are You Looking for Medical Codes?</h1>
      <p className="mt-2 text-gray-600">CodeMate is your 24/7 AI-powered SME for ICD-10-CM, delivering instant, accurate answers to complex coding questions—boosting productivity and reducing reliance on human experts.</p>
      <ChatInputWrapper />
    </div>
  );
}
