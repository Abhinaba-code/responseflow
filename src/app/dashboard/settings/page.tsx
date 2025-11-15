
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { ChannelIcon } from "@/components/channel-icon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const connectedChannels = [
    { name: "Support Email", type: "email", connected: true },
    { name: "Twitter DMs", type: "twitter", connected: true },
    { name: "Slack", type: "discord", connected: false }
];

const roles = [
    { name: "Admin", description: "Full access to all features and settings.", users: 2 },
    { name: "Agent", description: "Can view and respond to tickets.", users: 8 },
    { name: "Viewer", description: "Read-only access to tickets and analytics.", users: 3 }
];


export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
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

          <TabsContent value="channels" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Channels</CardTitle>
                <CardDescription>Connect and manage your support channels.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add Channel
                    </Button>
                </div>
                <div className="space-y-4">
                    {connectedChannels.map(channel => (
                        <div key={channel.name} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                                <ChannelIcon channel={channel.type as any} className="h-6 w-6" />
                                <div>
                                    <p className="font-medium">{channel.name}</p>
                                    <p className="text-sm text-muted-foreground">{channel.type.charAt(0).toUpperCase() + channel.type.slice(1)}</p>
                                </div>
                            </div>
                            <Button variant={channel.connected ? "secondary" : "default"}>
                                {channel.connected ? "Manage" : "Connect"}
                            </Button>
                        </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>Define roles and permissions for your team members.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-4">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Create Role
                    </Button>
                </div>
                 <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Role</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Users</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map(role => (
                                <TableRow key={role.name}>
                                    <TableCell className="font-medium">{role.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{role.description}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="secondary">{role.users}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                 </div>
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
      </div>
    </div>
  );
}
