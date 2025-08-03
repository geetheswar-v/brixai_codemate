import type { Metadata } from "next";
import { Josefin_Sans, Poppins } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AppHeader from "@/components/appbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar";

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeMate",
  description: "Your AI-powered Medical Coding Assistant",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${josefin.variable} ${poppins.variable} relative font-poppins antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange={false}>
          <SidebarProvider>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex-1 flex flex-col min-h-0">
                <AppHeader />
                <main className="flex-1 min-h-0">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
          
        </ThemeProvider>
      </body>
    </html>
  );
}