"use client";

import { useState } from "react";
import { initialCustomers } from "@/lib/data";
import type { Customer, Sentiment } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const sentimentClasses: { [key in Sentiment]: string } = {
  Positive: "bg-green-100 text-green-800",
  Neutral: "bg-gray-100 text-gray-800",
  Negative: "bg-red-100 text-red-800",
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleAddClick = () => {
    setSelectedCustomer(null);
    setIsAddEditDialogOpen(true);
  };

  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsAddEditDialogOpen(true);
  };

  const handleDeleteClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDelete = () => {
    if (!selectedCustomer) return;
    setCustomers(customers.filter(customer => customer.id !== selectedCustomer.id));
    setIsDeleteDialogOpen(false);
    setSelectedCustomer(null);
  };
  
  const handleSave = (formData: Omit<Customer, 'id' | 'totalTickets' | 'openTickets' | 'avgSentiment' | 'lastContact'>) => {
    if (selectedCustomer) {
      // Edit
      setCustomers(customers.map(c => c.id === selectedCustomer.id ? { ...c, ...formData } : c));
    } else {
      // Add
      const newCustomer: Customer = {
        id: `cust-${Date.now()}`,
        ...formData,
        totalTickets: 0,
        openTickets: 0,
        avgSentiment: 'Neutral',
        lastContact: new Date().toISOString(),
      };
      setCustomers([newCustomer, ...customers]);
    }
    setIsAddEditDialogOpen(false);
    setSelectedCustomer(null);
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddClick}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Customer</TableHead>
                <TableHead>Total Tickets</TableHead>
                <TableHead>Open Tickets</TableHead>
                <TableHead>Avg. Sentiment</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{customer.avatar}</AvatarFallback>

                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.totalTickets}</TableCell>
                  <TableCell>{customer.openTickets}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={sentimentClasses[customer.avgSentiment]}
                    >
                      {customer.avgSentiment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(customer.lastContact), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onSelect={() => handleEditClick(customer)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => handleDeleteClick(customer)} className="text-red-500 focus:text-red-500">
                             <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <CustomerFormDialog
        open={isAddEditDialogOpen}
        onOpenChange={setIsAddEditDialogOpen}
        customer={selectedCustomer}
        onSave={handleSave}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the customer
                and all associated data.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedCustomer(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}

// Form Dialog Component
function CustomerFormDialog({
    open,
    onOpenChange,
    customer,
    onSave
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customer: Customer | null;
    onSave: (data: Omit<Customer, 'id' | 'totalTickets' | 'openTickets' | 'avgSentiment' | 'lastContact'>) => void;
}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useState(() => {
        if(customer) {
            setName(customer.name);
            setEmail(customer.email);
        } else {
            setName('');
            setEmail('');
        }
    });

    const handleSubmit = () => {
        const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase() || '??';
        onSave({ name, email, avatar });
    }

    return (
         <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{customer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
                    <DialogDescription>{customer ? `Update details for ${customer.name}.` : 'Create a new customer record.'}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
