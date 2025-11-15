import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, Bell, Code, FileText, Slack, UserPlus, Zap } from "lucide-react";

export default function PlaybooksPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <p className="text-muted-foreground mb-6">Standardize your incident response with automated playbooks.</p>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">Playbook: API Latency Spike</h2>
            <div className="flex items-center gap-4 overflow-x-auto pb-4">
              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500"/> Trigger</CardTitle>
                  <CardDescription>Incident Created: Severity is <span className="font-medium text-red-500">Critical</span> OR <span className="font-medium text-orange-500">High</span></CardDescription>
                </CardHeader>
              </Card>

              <ArrowRight className="text-muted-foreground flex-shrink-0"/>

              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Slack className="h-4 w-4"/> Action</CardTitle>
                  <CardDescription>Notify <span className="font-medium">#dev-ops</span> channel in Slack</CardDescription>
                </CardHeader>
              </Card>
              
               <ArrowRight className="text-muted-foreground flex-shrink-0"/>

              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4"/> Action</CardTitle>
                  <CardDescription>Create a public status page update</CardDescription>
                </CardHeader>
              </Card>

              <ArrowRight className="text-muted-foreground flex-shrink-0"/>

              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><UserPlus className="h-4 w-4"/> Action</CardTitle>
                  <CardDescription>Assign to <span className="font-medium">On-Call Engineer</span></CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
          
           <div>
            <h2 className="text-lg font-semibold mb-4">Playbook: Failed Deployment</h2>
            <div className="flex items-center gap-4 overflow-x-auto pb-4">
              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Code className="h-4 w-4 text-blue-500"/> Trigger</CardTitle>
                  <CardDescription>Webhook received from CI/CD pipeline</CardDescription>
                </CardHeader>
              </Card>

              <ArrowRight className="text-muted-foreground flex-shrink-0"/>

              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4"/> Action</CardTitle>
                  <CardDescription>Page the <span className="font-medium">Lead Developer</span></CardDescription>
                </CardHeader>
              </Card>
              
              <ArrowRight className="text-muted-foreground flex-shrink-0"/>

              <Card className="w-72 flex-shrink-0">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Zap className="h-4 w-4 text-yellow-500"/> Action</CardTitle>
                  <CardDescription>Declare a <span className="font-medium text-orange-500">High</span> severity incident</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
