"use client";

import { useState } from "react";
import { agents as initialAgents, type Agent } from "@/lib/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function TeamsPage() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleEditClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (agentId: string) => {
    setAgents(agents.filter(agent => agent.id !== agentId));
  };
  
  const handleSave = () => {
    if (!selectedAgent) return;
    setAgents(agents.map(agent => agent.id === selectedAgent.id ? selectedAgent : agent));
    setIsEditDialogOpen(false);
    setSelectedAgent(null);
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <main className="flex-1 overflow-auto p-6">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Agent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => {
                const workloadPercentage = (agent.currentLoad / agent.capacity) * 100;
                return (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{agent.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{agent.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          agent.status === 'Online' && 'text-green-500 border-green-500/50',
                          agent.status === 'Offline' && 'text-gray-500 border-gray-500/50',
                          agent.status === 'Busy' && 'text-orange-500 border-orange-500/50'
                        )}
                      >
                        <span className={cn(
                          "h-2 w-2 rounded-full mr-2",
                          agent.status === 'Online' && 'bg-green-500',
                          agent.status === 'Offline' && 'bg-gray-500',
                          agent.status === 'Busy' && 'bg-orange-500'
                        )}></span>
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={workloadPercentage} className="w-24 h-2" />
                        <span className="text-sm text-muted-foreground">{agent.currentLoad}/{agent.capacity}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {agent.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onSelect={() => handleEditClick(agent)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                                    <span className="text-red-500">Delete</span>
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the agent
                                    and remove their data from our servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(agent.id)} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Agent</DialogTitle>
                <DialogDescription>Update the details for {selectedAgent?.name}.</DialogDescription>
            </DialogHeader>
            {selectedAgent && (
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" value={selectedAgent.name} onChange={(e) => setSelectedAgent({...selectedAgent, name: e.target.value})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Select value={selectedAgent.status} onValueChange={(value: 'Online' | 'Offline' | 'Busy') => setSelectedAgent({...selectedAgent, status: value})}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Online">Online</SelectItem>
                                <SelectItem value="Offline">Offline</SelectItem>
                                <SelectItem value="Busy">Busy</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="capacity" className="text-right">Capacity</Label>
                        <Input id="capacity" type="number" value={selectedAgent.capacity} onChange={(e) => setSelectedAgent({...selectedAgent, capacity: parseInt(e.target.value) || 0})} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="skills" className="text-right">Skills</Label>
                        <Input id="skills" value={selectedAgent.skills.join(', ')} onChange={(e) => setSelectedAgent({...selectedAgent, skills: e.target.value.split(',').map(s => s.trim())})} className="col-span-3" />
                    </div>
                </div>
            )}
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
