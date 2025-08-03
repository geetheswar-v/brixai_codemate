"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AppHeader() {
  return (
    <div className="p-3 flex items-center border-b bg-background/95 backdrop-blur">
      <SidebarTrigger />
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-2 md:hidden">
          <h1 className="text-lg font-bold text-foreground font-josefin">Codemate</h1>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full border border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700">
            BETA
          </span>
        </div>
        <div className="hidden md:block text-sm text-muted-foreground">
          Medical Coding Assistant
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
}