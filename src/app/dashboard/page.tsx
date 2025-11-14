import { InboxPageClient } from "@/components/inbox/inbox-page-client";
import { tickets } from "@/lib/data";

export default function DashboardPage() {
  // In a real app, you would fetch tickets here
  return (
    <div className="h-full">
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <h1 className="text-xl font-semibold">Unified Inbox</h1>
        </header>
        <InboxPageClient initialTickets={tickets} />
    </div>
  );
}
