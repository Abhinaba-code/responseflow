"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Notification = {
  id: number;
  text: string;
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
    { id: 1, text: 'New P0 ticket #TKT-001 assigned to you.', time: '5m ago', read: false },
    { id: 2, text: 'SLA for ticket #TKT-003 is at risk of breaching.', time: '30m ago', read: false },
    { id: 3, text: 'You were mentioned by Alice in ticket #TKT-002.', time: '2h ago', read: true },
    { id: 4, text: 'Trend/Outage Radar detected a spike in "login failed" issues.', time: '4h ago', read: true },
];


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="flex flex-col h-full bg-background">
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
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleMarkAsRead(n.id)}>
                                <Check className="h-4 w-4"/>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDismiss(n.id)}>
                                <X className="h-4 w-4"/>
                            </Button>
                        </div>
                    )}
                 </Card>
            ))}
            {notifications.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <h3 className="text-lg font-semibold">All caught up!</h3>
                    <p className="text-muted-foreground">You have no new notifications.</p>
                </div>
            )}
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
                        <Switch id="push-notifications" checked={pushEnabled} onCheckedChange={setPushEnabled} />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="email-notifications" className="flex-1">Email Notifications</Label>
                        <Switch id="email-notifications" checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="sound-notifications" className="flex-1">Sound Alerts</Label>
                        <Switch id="sound-notifications" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
