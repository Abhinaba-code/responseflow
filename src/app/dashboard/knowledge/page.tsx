import { BookOpen } from "lucide-react";

export default function KnowledgePage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
            <BookOpen className="h-6 w-6"/>
            Knowledge
        </h1>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Knowledge Base manager will be built here.</p>
        </div>
      </div>
    </div>
  );
}
