import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Settings</h1>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="theme">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Jane Doe" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jane.doe@example.com" disabled />
                 </div>
                 <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="theme" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Customization</CardTitle>
                <CardDescription>Customize the look and feel of your workspace.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable to switch to a darker theme.</p>
                  </div>
                  <Switch id="dark-mode" />
                </div>
                
                <div className="space-y-4">
                    <Label>Color Palette</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Primary</Label>
                            <div className="h-10 w-full rounded-md border bg-primary flex items-center justify-center text-primary-foreground font-mono text-sm">#4F46E5</div>
                        </div>
                         <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Accent</Label>
                            <div className="h-10 w-full rounded-md border bg-accent flex items-center justify-center text-accent-foreground font-mono text-sm">#06B6D4</div>
                        </div>
                         <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Background</Label>
                            <div className="h-10 w-full rounded-md border bg-background flex items-center justify-center text-foreground font-mono text-sm">#F8FAFC</div>
                        </div>
                         <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Card / Surface</Label>
                            <div className="h-10 w-full rounded-md border bg-card flex items-center justify-center text-card-foreground font-mono text-sm">#FFFFFF</div>
                        </div>
                    </div>
                </div>
                <Button>Save Theme</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
