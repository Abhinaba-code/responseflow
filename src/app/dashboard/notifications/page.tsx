import { Bell, Check, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, text: 'New P0 ticket #TKT-001 assigned to you.', time: '5m ago', read: false },
    { id: 2, text: 'SLA for ticket #TKT-003 is at risk of breaching.', time: '30m ago', read: false },
    { id: 3, text: 'You were mentioned by Alice in ticket #TKT-002.', time: '2h ago', read: true },
    { id: 4, text: 'Trend/Outage Radar detected a spike in "login failed" issues.', time: '4h ago', read: true },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-background px-6">
        <h1 className="text-xl font-semibold flex items-center gap-2">
            <Bell className="h-6 w-6"/>
            Notifications
        </h1>
        <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5"/>
            <span className="sr-only">Notification Settings</span>
        </Button>
      </header>
      <main className="flex-1 overflow-auto p-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
            {notifications.map(n => (
                 <Card key={n.id} className={`p-4 flex items-start gap-4 ${n.read ? 'bg-card' : 'bg-secondary'}`}>
                    <div className="flex-1">
                        <p className="text-sm">{n.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                    </div>
                    {!n.read && (
                        <div className="flex gap-1">
                             <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Check className="h-4 w-4"/>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <X className="h-4 w-4"/>
                            </Button>
                        </div>
                    )}
                 </Card>
            ))}
        </div>
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive alerts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications" className="flex-1">Push Notifications</Label>
                        <Switch id="push-notifications" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications" className="flex-1">Email Notifications</Label>
                        <Switch id="email-notifications" />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="sound-notifications" className="flex-1">Sound Alerts</Label>
                        <Switch id="sound-notifications" defaultChecked />
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
