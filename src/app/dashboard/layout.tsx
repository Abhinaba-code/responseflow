"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { MainSidebar } from "@/components/main-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";
import { PlanProvider } from "@/context/plan-context";
import { WalletProvider } from "@/context/wallet-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlanProvider>
      <WalletProvider>
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
      </WalletProvider>
    </PlanProvider>
  );
}
