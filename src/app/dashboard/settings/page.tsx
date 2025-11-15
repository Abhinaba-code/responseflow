

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Check } from "lucide-react";
import { ChannelIcon } from "@/components/channel-icon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Channel } from "@/lib/types";
import { cn } from "@/lib/utils";

type ConnectedChannel = {
    name: string;
    type: Channel;
    connected: boolean;
};

const initialChannels: ConnectedChannel[] = [
    { name: "Support Email", type: "email", connected: true },
    { name: "Twitter DMs", type: "twitter", connected: true },
    { name: "Slack", type: "discord", connected: false }
];

type Role = {
    name: string;
    description: string;
    users: number;
};

const initialRoles: Role[] = [
    { name: "Admin", description: "Full access to all features and settings.", users: 2 },
    { name: "Agent", description: "Can view and respond to tickets.", users: 8 },
    { name: "Viewer", description: "Read-only access to tickets and analytics.", users: 3 }
];

const themes = [
  { name: 'Default', colors: { primary: '243 75% 59%', accent: '188 95% 43%', background: '210 40% 98%', card: '0 0% 100%' } },
  { name: 'Stone', colors: { primary: '24 9.8% 10%', accent: '24 9.8% 20%', background: '24 9.8% 95%', card: '24 9.8% 100%' } },
  { name: 'Rose', colors: { primary: '346.8 77.2% 49.8%', accent: '346.8 77.2% 59.8%', background: '346.8 77.2% 97%', card: '0 0% 100%' } },
  { name: 'Green', colors: { primary: '142.1 76.2% 36.3%', accent: '142.1 76.2% 46.3%', background: '142.1 76.2% 96%', card: '0 0% 100%' } },
  { name: 'Blue', colors: { primary: '217.2 91.2% 59.8%', accent: '217.2 91.2% 69.8%', background: '217.2 91.2% 97%', card: '0 0% 100%' } },
  { name: 'Violet', colors: { primary: '262.1 83.3% 57.8%', accent: '262.1 83.3% 67.8%', background: '262.1 83.3% 97%', card: '0 0% 100%' } },
  { name: 'Orange', colors: { primary: '24.6 95% 53.1%', accent: '24.6 95% 63.1%', background: '24.6 95% 97%', card: '0 0% 100%' } },
  { name: 'Slate', colors: { primary: '215.4 16.3% 46.9%', accent: '215.4 16.3% 56.9%', background: '215.4 16.3% 96%', card: '0 0% 100%' } },
  { name: 'Cyan', colors: { primary: '190 95% 43%', accent: '190 95% 53%', background: '190 95% 97%', card: '0 0% 100%' } },
  { name: 'Zinc', colors: { primary: '221.2 83.2% 53.3%', accent: '221.2 83.2% 63.3%', background: '221.2 83.2% 97%', card: '0 0% 100%' } },
];


export default function SettingsPage() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'channels';
    const { toast } = useToast();
    const [channels, setChannels] = useState<ConnectedChannel[]>(initialChannels);
    const [roles, setRoles] = useState<Role[]>(initialRoles);
    const [isAddChannelOpen, setIsAddChannelOpen] = useState(false);
    const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
    
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [activeTheme, setActiveTheme] = useState(themes[0]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);
    
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--primary', activeTheme.colors.primary);
        root.style.setProperty('--accent', activeTheme.colors.accent);

        if (isDarkMode) {
            root.style.setProperty('--background', '220 39% 7%');
            root.style.setProperty('--card', '222 47% 11%');
        } else {
             root.style.setProperty('--background', activeTheme.colors.background);
             root.style.setProperty('--card', activeTheme.colors.card);
        }

    }, [activeTheme, isDarkMode]);

    const handleToggleConnect = (channelName: string) => {
        setChannels(prevChannels =>
            prevChannels.map(channel => {
                if (channel.name === channelName) {
                    const wasConnected = channel.connected;
                    if (!wasConnected) {
                        toast({
                            title: "Channel Connected",
                            description: `${channel.name} has been successfully connected.`,
                        });
                    }
                    return { ...channel, connected: !wasConnected };
                }
                return channel;
            })
        );
    };

    const handleAddChannel = (name: string, type: Channel) => {
        if (name && type) {
            setChannels(prev => [...prev, { name, type, connected: true }]);
            toast({
                title: "Channel Added",
                description: `${name} has been successfully added and connected.`,
            });
            setIsAddChannelOpen(false);
        }
    };
    
    const handleCreateRole = (name: string, description: string) => {
        if (name && description) {
            setRoles(prev => [...prev, { name, description, users: 0 }]);
            toast({
                title: "Role Created",
                description: `The "${name}" role has been successfully created.`,
            });
            setIsCreateRoleOpen(false);
        }
    };
    
    const handleDeleteRole = (roleName: string) => {
        setRoles(prev => prev.filter(role => role.name !== roleName));
        toast({
            title: "Role Deleted",
            description: `The "${roleName}" role has been deleted.`,
            variant: "destructive"
        });
    };

    const handleSaveTheme = () => {
        toast({
            title: "Theme Saved",
            description: "Your new theme has been applied."
        });
    }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue={tab} className="h-full">
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
                    <Dialog open={isAddChannelOpen} onOpenChange={setIsAddChannelOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Add Channel
                            </Button>
                        </DialogTrigger>
                        <AddChannelDialog onAddChannel={handleAddChannel} onOpenChange={setIsAddChannelOpen} />
                    </Dialog>
                </div>
                <div className="space-y-4">
                    {channels.map(channel => (
                        <div key={channel.name} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                                <ChannelIcon channel={channel.type} className="h-6 w-6" />
                                <div>
                                    <p className="font-medium">{channel.name}</p>
                                    <p className="text-sm text-muted-foreground">{channel.type.charAt(0).toUpperCase() + channel.type.slice(1)}</p>
                                </div>
                            </div>
                             <Button 
                                variant={channel.connected ? "secondary" : "default"}
                                onClick={() => handleToggleConnect(channel.name)}
                            >
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
                    <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                Create Role
                            </Button>
                        </DialogTrigger>
                        <CreateRoleDialog onCreateRole={handleCreateRole} onOpenChange={setIsCreateRoleOpen} />
                    </Dialog>
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
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon" disabled={role.users > 0}>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the "{role.name}" role.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteRole(role.name)} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
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
                  <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                </div>
                
                <div className="space-y-2">
                    <Label>Color Palette</Label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {themes.map((theme) => (
                           <button key={theme.name} onClick={() => setActiveTheme(theme)} className="flex flex-col items-center gap-2">
                               <div className={cn("h-16 w-full rounded-md border-2", activeTheme.name === theme.name ? "border-primary" : "border-transparent")}>
                                   <div className="h-full w-full rounded-sm bg-background p-2 flex gap-1">
                                       <div className="h-full w-4 rounded-sm" style={{ backgroundColor: `hsl(${theme.colors.primary})` }} />
                                       <div className="h-full w-4 rounded-sm" style={{ backgroundColor: `hsl(${theme.colors.accent})` }} />
                                   </div>
                               </div>
                               <p className="text-sm">{theme.name}</p>
                           </button>
                        ))}
                    </div>
                </div>
                <Button onClick={handleSaveTheme}>Save Theme</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


function AddChannelDialog({ onAddChannel, onOpenChange }: { onAddChannel: (name: string, type: Channel) => void; onOpenChange: (open: boolean) => void; }) {
    const [name, setName] = useState('');
    const [type, setType] = useState<Channel | ''>('');

    const handleSubmit = () => {
        if(name && type) {
            onAddChannel(name, type);
            setName('');
            setType('');
        }
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add a New Channel</DialogTitle>
                <DialogDescription>Connect a new source for your customer messages.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="channel-name" className="text-right">Name</Label>
                    <Input id="channel-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="e.g., Marketing Email" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="channel-type" className="text-right">Type</Label>
                    <Select value={type} onValueChange={(value: Channel) => setType(value)}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select channel type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                            <SelectItem value="live_chat">Live Chat</SelectItem>
                            <SelectItem value="discord">Discord</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Add Channel</Button>
            </DialogFooter>
        </DialogContent>
    );
}

function CreateRoleDialog({ onCreateRole, onOpenChange }: { onCreateRole: (name: string, description: string) => void; onOpenChange: (open: boolean) => void; }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        onCreateRole(name, description);
        setName('');
        setDescription('');
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a New Role</DialogTitle>
                <DialogDescription>Define a new role and its permissions.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role-name" className="text-right">Role Name</Label>
                    <Input id="role-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="e.g., Escalation Manager" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role-description" className="text-right">Description</Label>
                    <Input id="role-description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" placeholder="A short description of the role." />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Create Role</Button>
            </DialogFooter>
        </DialogContent>
    );
}


