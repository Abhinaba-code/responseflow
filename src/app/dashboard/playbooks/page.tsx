import { Bot } from "lucide-react";

export default function PlaybooksPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
            <Bot className="h-6 w-6"/>
            Playbooks
        </h1>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Incidents automation playbooks will be built here.</p>
        </div>
      </main>
    </div>
  );
}
