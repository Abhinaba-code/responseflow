"use client";

import { useState, useEffect } from "react";
import type { Ticket } from "@/lib/types";
import { TicketList } from "./ticket-list";
import { TicketDetail } from "./ticket-detail";
import { Bell, PanelLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import { tickets as initialTicketsData } from "@/lib/data";
import Link from "next/link";

const LOCAL_STORAGE_KEY = "responseflow-tickets";

export function InboxPageClient({ initialTickets }: { initialTickets: Ticket[] }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    // This effect runs only on the client
    const storedTickets = localStorage.getItem(LOCAL_STORAGE_KEY);
    let ticketsToLoad: Ticket[];

    if (storedTickets) {
      try {
        ticketsToLoad = JSON.parse(storedTickets);
      } catch (error) {
        console.error("Failed to parse tickets from local storage", error);
        ticketsToLoad = initialTicketsData;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ticketsToLoad));
      }
    } else {
      ticketsToLoad = initialTicketsData;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ticketsToLoad));
    }
    
    setTickets(ticketsToLoad);
    if (ticketsToLoad.length > 0) {
      setSelectedTicketId(ticketsToLoad[0].id);
    }
  }, []);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1 min-w-0">
        <header className="flex h-16 items-center justify-between gap-4 border-b bg-background px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
                <PanelLeft />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <h1 className="text-xl font-semibold">Unified Inbox</h1>
          </div>
           <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/notifications">
              <Bell />
              <span className="sr-only">Notifications</span>
            </Link>
          </Button>
        </header>
        <div className="flex flex-1 min-h-0">
          <TicketList
            tickets={tickets}
            selectedTicketId={selectedTicketId}
            onSelectTicket={setSelectedTicketId}
          />
          <TicketDetail ticket={selectedTicket} />
        </div>
      </div>
    </div>
  );
}
