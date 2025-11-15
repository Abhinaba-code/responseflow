"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoreVertical, PlusCircle, Trash2, Pencil, Bot } from "lucide-react";
import { initialPlaybooks, type Playbook, type PlaybookAction } from "@/lib/data";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

export default function PlaybooksPage() {
  const [playbooks, setPlaybooks] = useState<Playbook[]>(initialPlaybooks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);

  const handleCreate = () => {
    setSelectedPlaybook(null);
    setIsFormOpen(true);
  };

  const handleEdit = (playbook: Playbook) => {
    setSelectedPlaybook(playbook);
    setIsFormOpen(true);
  };

  const handleView = (playbook: Playbook) => {
    setSelectedPlaybook(playbook);
    setIsViewOpen(true);
  };

  const handleDelete = (playbook: Playbook) => {
    setSelectedPlaybook(playbook);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedPlaybook) return;
    setPlaybooks(playbooks.filter((p) => p.id !== selectedPlaybook.id));
    setIsDeleteOpen(false);
    setSelectedPlaybook(null);
  };

  const handleSave = (formData: Omit<Playbook, "id">) => {
    if (selectedPlaybook) {
      // Edit
      setPlaybooks(
        playbooks.map((p) =>
          p.id === selectedPlaybook.id ? { ...p, ...formData } : p
        )
      );
    } else {
      // Add
      const newPlaybook: Playbook = {
        id: `pb-${Date.now()}`,
        ...formData,
      };
      setPlaybooks([newPlaybook, ...playbooks]);
    }
    setIsFormOpen(false);
    setSelectedPlaybook(null);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Playbooks</h1>
            <p className="text-muted-foreground">
              Standardize your incident response with automated playbooks.
            </p>
          </div>
          <Button onClick={handleCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Playbook
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {playbooks.map((playbook) => (
            <Card key={playbook.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="space-y-1.5">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    {playbook.name}
                  </CardTitle>
                  <CardDescription>{playbook.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => handleView(playbook)}>
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleEdit(playbook)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => handleDelete(playbook)}
                      className="text-red-500 focus:text-red-500"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Trigger</h4>
                    <p className="text-sm text-muted-foreground">{playbook.trigger}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Actions</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {playbook.actions.slice(0, 2).map((action, index) => (
                        <p key={index} className="truncate">{action.description}</p>
                      ))}
                      {playbook.actions.length > 2 && (
                        <p className="text-xs font-medium">...and {playbook.actions.length - 2} more</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <PlaybookFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        playbook={selectedPlaybook}
        onSave={handleSave}
      />

      <PlaybookViewDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        playbook={selectedPlaybook}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              playbook.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedPlaybook(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Form Dialog Component
function PlaybookFormDialog({
  open,
  onOpenChange,
  playbook,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playbook: Playbook | null;
  onSave: (data: Omit<Playbook, "id">) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [trigger, setTrigger] = useState("");
  const [actions, setActions] = useState<Omit<PlaybookAction, 'id'>[]>([{ type: "", description: "" }]);

  useEffect(() => {
    if (playbook) {
      setName(playbook.name);
      setDescription(playbook.description);
      setTrigger(playbook.trigger);
      setActions(playbook.actions.map(({id, ...rest}) => rest));
    } else {
      setName("");
      setDescription("");
      setTrigger("");
      setActions([{ type: "", description: "" }]);
    }
  }, [playbook]);

  const handleActionChange = (index: number, field: 'type' | 'description', value: string) => {
    const newActions = [...actions];
    newActions[index][field] = value;
    setActions(newActions);
  };
  
  const addAction = () => setActions([...actions, { type: '', description: ''}]);

  const handleSubmit = () => {
    const finalActions = actions.filter(a => a.description.trim() !== '').map((a, i) => ({ ...a, id: `act-${i}`}));
    onSave({ name, description, trigger, actions: finalActions });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {playbook ? "Edit Playbook" : "Create Playbook"}
          </DialogTitle>
          <DialogDescription>
            Define the trigger and actions for this automated workflow.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
                <Label htmlFor="name">Playbook Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="trigger">Trigger</Label>
                <Input id="trigger" value={trigger} onChange={(e) => setTrigger(e.target.value)} placeholder="e.g., Incident created with severity 'Critical'"/>
            </div>
           </div>
           <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <Separator />
           <div>
             <Label>Actions</Label>
             <div className="space-y-4 mt-2">
                {actions.map((action, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 p-2 border rounded-lg">
                        <Input placeholder="Action Type (e.g., Notify)" value={action.type} onChange={(e) => handleActionChange(index, 'type', e.target.value)} />
                        <Input placeholder="Action Description (e.g., Notify #dev-ops in Slack)" value={action.description} onChange={(e) => handleActionChange(index, 'description', e.target.value)} />
                    </div>
                ))}
             </div>
             <Button variant="outline" size="sm" className="mt-4" onClick={addAction}>
                <PlusCircle className="mr-2 h-4 w-4"/> Add Action
             </Button>
           </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Playbook</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// View Dialog Component
function PlaybookViewDialog({
    open,
    onOpenChange,
    playbook,
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    playbook: Playbook | null;
  }) {
    if (!playbook) return null;
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary"/>{playbook.name}</DialogTitle>
            <DialogDescription>{playbook.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
              <div>
                <h4 className="font-semibold mb-2">Trigger</h4>
                <p className="text-sm text-muted-foreground p-3 bg-secondary rounded-md">{playbook.trigger}</p>
              </div>
               <div>
                <h4 className="font-semibold mb-2">Actions</h4>
                <div className="space-y-2">
                    {playbook.actions.map(action => (
                        <div key={action.id} className="p-3 border rounded-md">
                            <p className="font-medium text-sm">{action.type}</p>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                        </div>
                    ))}
                </div>
              </div>
          </div>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
