"use client";

import { useState, useEffect } from "react";
import type { Ticket } from "@/lib/types";
import { TicketList } from "./ticket-list";
import { TicketDetail } from "./ticket-detail";
import { tickets as initialTicketsData } from "@/lib/data";

const LOCAL_STORAGE_KEY = "responseflow-tickets";

export function InboxPageClient({ initialTickets }: { initialTickets: Ticket[] }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

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
    <div className="flex h-full bg-background overflow-x-hidden">
      <TicketList
        tickets={tickets}
        selectedTicketId={selectedTicketId}
        onSelectTicket={setSelectedTicketId}
      />
      <TicketDetail ticket={selectedTicket} />
    </div>
  );
}
