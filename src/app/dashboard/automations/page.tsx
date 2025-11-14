import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail, MessageCircle, Tag, UserPlus, Bell } from "lucide-react";

export default function AutomationsPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Automation Builder</h1>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <p className="text-muted-foreground mb-6">Create powerful, no-code workflows to automate your support processes.</p>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Example Flow: Triage P0 Complaints</h2>
            <div className="flex items-center gap-4 overflow-x-auto pb-4">
              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><MessageCircle className="h-4 w-4"/> Trigger</CardTitle>
                  <CardDescription>When a new message is received</CardDescription>
                </CardHeader>
              </Card>

              <ArrowRight className="text-muted-foreground flex-shrink-0"/>

              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base">Condition</CardTitle>
                  <CardDescription>If sentiment is <span className="text-red-500 font-medium">Negative</span> AND message contains "complaint"</CardDescription>
                </CardHeader>
              </Card>

              <ArrowRight className="text-muted-foreground flex-shrink-0"/>

              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Tag className="h-4 w-4"/> Action</CardTitle>
                  <CardDescription>Set priority to <span className="text-red-500 font-medium">P0</span> and add tag "Complaint"</CardDescription>
                </CardHeader>
              </Card>
              
               <ArrowRight className="text-muted-foreground flex-shrink-0"/>

              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><UserPlus className="h-4 w-4"/> Action</CardTitle>
                  <CardDescription>Assign to <span className="font-medium">Escalations Team</span></CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
          
           <div>
            <h2 className="text-lg font-semibold mb-4">Example Flow: After-Hours Auto-Reply</h2>
            <div className="flex items-center gap-4 overflow-x-auto pb-4">
              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Mail className="h-4 w-4"/> Trigger</CardTitle>
                  <CardDescription>When a new email is received</CardDescription>
                </CardHeader>
              </Card>

              <ArrowRight className="text-muted-foreground flex-shrink-0"/>

              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base">Condition</CardTitle>
                  <CardDescription>If time is outside <span className="font-medium">Business Hours</span></CardDescription>
                </CardHeader>
              </Card>

              <ArrowRight className="text-muted-foreground flex-shrink-0"/>

              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4"/> Action</CardTitle>
                  <CardDescription>Send auto-reply: "We're currently away but will get back to you..."</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
