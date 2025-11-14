import { InboxPageClient } from "@/components/inbox/inbox-page-client";
import { tickets } from "@/lib/data";

export default function InboxPage() {
  // In a real app, you would fetch tickets here
  return <InboxPageClient initialTickets={tickets} />;
}
