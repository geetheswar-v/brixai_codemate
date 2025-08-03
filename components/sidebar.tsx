"use client";

import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { createNewSession } from '@/lib/actions';
import Link from 'next/link';

export default function AppSidebar() {
  const handleNewChat = async () => {
    await createNewSession();
  };

  return (
    <Sidebar className="w-64 border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold text-foreground font-josefin">
            Codemate
          </Link>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full border border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700">
            BETA
          </span>
        </div>
        
      </SidebarHeader>
      <Separator />
      <SidebarContent className="p-4">
        <Button
          onClick={handleNewChat}
          className="w-full justify-start gap-2"
          variant="ghost"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </SidebarContent>
    </Sidebar>
  );
}