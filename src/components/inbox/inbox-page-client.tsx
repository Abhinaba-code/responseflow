"use client";

import { useState } from "react";
import type { Ticket } from "@/lib/types";
import { TicketList } from "./ticket-list";
import { TicketDetail } from "./ticket-detail";
import { PanelLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

export function InboxPageClient({ initialTickets }: { initialTickets: Ticket[] }) {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(initialTickets[0]?.id || null);
  const { toggleSidebar } = useSidebar();
  
  const selectedTicket = initialTickets.find(t => t.id === selectedTicketId);

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1 min-w-0">
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
                <PanelLeft />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <h1 className="text-xl font-semibold">Unified Inbox</h1>
        </header>
        <div className="flex flex-1 min-h-0">
          <TicketList
            tickets={initialTickets}
            selectedTicketId={selectedTicketId}
            onSelectTicket={setSelectedTicketId}
          />
          <TicketDetail ticket={selectedTicket} />
        </div>
      </div>
    </div>
  );
}
