"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { MainSidebar } from "@/components/main-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 overflow-auto">
            {children}
        </main>
        <ChatbotWidget />
      </SidebarInset>
    </SidebarProvider>
  );
}
