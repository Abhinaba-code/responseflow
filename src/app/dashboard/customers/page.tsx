import { Users } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
            <Users className="h-6 w-6"/>
            Customers
        </h1>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Customer 360 view will be built here.</p>
        </div>
      </div>
    </div>
  );
}
