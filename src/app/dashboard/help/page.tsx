import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LifeBuoy, Mail, Phone, User } from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find answers to common questions about ResponseFlow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold">How do I connect a new channel?</h3>
                <p className="text-muted-foreground">
                  Navigate to Settings > Channels and click the "Add Channel" button. Follow the on-screen instructions to authorize ResponseFlow to access your account.
                </p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold">How does PriorityScore AI work?</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes multiple signals like urgency, sentiment, and keywords to assign a score from 0-100, helping you focus on what matters most.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Can I create custom automation rules?</h3>
                <p className="text-muted-foreground">
                  Yes! Visit the Automations page to build powerful, no-code workflows to handle repetitive tasks, route conversations, and more.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Can't find the answer you're looking for? Contact me directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <p>Abhinaba Roy Pradhan</p>
                </div>
                 <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <Link href="mailto:abhinabapradhan@gmail.com" className="text-primary hover:underline">
                        abhinabapradhan@gmail.com
                    </Link>
                </div>
                 <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <p>+91 6295869078</p>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
