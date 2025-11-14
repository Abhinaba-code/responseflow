import { InboxPageClient } from "@/components/inbox/inbox-page-client";
import { tickets } from "@/lib/data";

export default function DashboardPage() {
  // In a real app, you would fetch tickets here
  return (
    <div className="h-[calc(100vh-4rem)]">
        <InboxPageClient initialTickets={tickets} />
    </div>
  );
}
