"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Copy,
  PlusCircle,
  Book,
  Github,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type ApiKey = {
  id: string;
  key: string;
  createdAt: string;
  lastUsed: string;
};

type Webhook = {
  id: string;
  url: string;
  status: "active" | "inactive";
  events: string[];
};

export default function DeveloperPageContent() {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "key-1",
      key: "rf_prod_************************1234",
      createdAt: "2023-10-26",
      lastUsed: "2024-03-15",
    },
  ]);
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: "hook-1",
      url: "https://api.example.com/responseflow-hook",
      status: "active",
      events: ["ticket.created", "ticket.updated"],
    },
  ]);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [isWebhookDialogOpen, setIsWebhookDialogOpen] = useState(false);
  const [newWebhookUrl, setNewWebhookUrl] = useState("");

  const generateNewKey = () => {
    const generated = `rf_prod_${[...Array(24)].map(() => Math.random().toString(36)[2]).join('')}`;
    const newApiKey: ApiKey = {
      id: `key-${Date.now()}`,
      key: generated,
      createdAt: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
    };
    setApiKeys([...apiKeys, newApiKey]);
    setNewKey(generated);
    setShowKey(true);
    toast({
        title: "API Key Generated",
        description: "Your new API key has been successfully created.",
    })
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter((key) => key.id !== id));
    toast({
        title: "API Key Deleted",
        description: "The API key has been permanently removed.",
        variant: "destructive",
    });
  };
  
  const handleAddWebhook = () => {
    if (!newWebhookUrl) return;
    const newWebhook: Webhook = {
      id: `hook-${Date.now()}`,
      url: newWebhookUrl,
      status: 'active',
      events: ['ticket.created', 'ticket.updated'], // Default events
    };
    setWebhooks([...webhooks, newWebhook]);
    setIsWebhookDialogOpen(false);
    setNewWebhookUrl('');
    toast({
        title: "Webhook Endpoint Added",
        description: "The new endpoint has been successfully configured.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys for programmatic access to ResponseFlow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button onClick={generateNewKey}>
                  <PlusCircle className="mr-2" />
                  Generate New Key
                </Button>
              </div>
              {newKey && (
                <div className="mb-4 p-4 border rounded-lg bg-secondary">
                  <Label>New API Key (save this now, you won't see it again):</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      readOnly
                      type={showKey ? "text" : "password"}
                      value={newKey}
                      className="font-mono"
                    />
                     <Button variant="ghost" size="icon" onClick={() => setShowKey(!showKey)}>
                        {showKey ? <EyeOff /> : <Eye />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(newKey)}>
                        <Copy />
                    </Button>
                  </div>
                </div>
              )}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Key (suffix)</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((apiKey) => (
                      <TableRow key={apiKey.id}>
                        <TableCell className="font-mono">
                          ...{apiKey.key.slice(-4)}
                        </TableCell>
                        <TableCell>{apiKey.createdAt}</TableCell>
                        <TableCell>{apiKey.lastUsed}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => deleteApiKey(apiKey.id)}>
                            <Trash2 />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>
                Configure webhook endpoints to receive real-time events.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-end mb-4">
                     <Dialog open={isWebhookDialogOpen} onOpenChange={setIsWebhookDialogOpen}>
                        <DialogTrigger asChild>
                            <Button><PlusCircle className="mr-2" />Add Endpoint</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Webhook Endpoint</DialogTitle>
                                <DialogDescription>Configure a new URL to receive events.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-1">
                                    <Label htmlFor="webhook-url">Endpoint URL</Label>
                                    <Input 
                                      id="webhook-url" 
                                      placeholder="https://your-service.com/webhook" 
                                      value={newWebhookUrl}
                                      onChange={(e) => setNewWebhookUrl(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>Events to send</Label>
                                    <p className="text-sm text-muted-foreground">This functionality is not yet implemented.</p>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsWebhookDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleAddWebhook}>Add Endpoint</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Endpoint URL</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Subscribed Events</TableHead>
                            </TableRow>
                        </TableHeader>
                         <TableBody>
                            {webhooks.map((webhook) => (
                                <TableRow key={webhook.id}>
                                    <TableCell className="font-mono">{webhook.url}</TableCell>
                                    <TableCell>
                                        <Badge variant={webhook.status === 'active' ? 'default' : 'secondary'} className={webhook.status === 'active' ? 'bg-green-500' : ''}>{webhook.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-1 flex-wrap">
                                            {webhook.events.map(event => <Badge variant="outline" key={event}>{event}</Badge>)}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                         </TableBody>
                    </Table>
                </div>
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader>
              <CardTitle>SDKs & Documentation</CardTitle>
              <CardDescription>
                Resources to help you build on top of ResponseFlow.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Link href="/dashboard/developer/api-docs" className="flex items-center gap-4 p-4 border rounded-lg hover:bg-secondary">
                <Book className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold">API Documentation</p>
                  <p className="text-sm text-muted-foreground">Explore all available API endpoints.</p>
                </div>
              </Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 border rounded-lg hover:bg-secondary">
                <Github className="h-8 w-8" />
                <div>
                  <p className="font-semibold">Visit our GitHub</p>
                  <p className="text-sm text-muted-foreground">Find SDKs and examples.</p>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
