"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { incidents as initialIncidents, type Incident } from "@/lib/data";
import { format } from "date-fns";
import { PlusCircle, ShieldAlert } from "lucide-react";
import { IncidentSeverity, IncidentStatus } from "@/lib/types";

const severityClasses: { [key in Incident["severity"]]: string } = {
  Critical: "bg-red-500 text-white",
  High: "bg-orange-500 text-white",
  Medium: "bg-yellow-500 text-black",
  Low: "bg-blue-500 text-white",
};

const statusClasses: { [key in Incident["status"]]: string } = {
  Investigating: "bg-yellow-200 text-yellow-800",
  Identified: "bg-blue-200 text-blue-800",
  Monitoring: "bg-indigo-200 text-indigo-800",
  Resolved: "bg-green-200 text-green-800",
};

function IncidentTable({ incidents }: { incidents: Incident[] }) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="w-[120px]">Severity</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[180px]">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow key={incident.id}>
              <TableCell className="font-medium">{incident.title}</TableCell>
              <TableCell>
                <Badge
                  className={cn("text-white", severityClasses[incident.severity])}
                >
                  {incident.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={cn(statusClasses[incident.status])}>
                  {incident.status}
                </Badge>
              </TableCell>
              <TableCell>{format(new Date(incident.createdAt), "PPp")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [open, setOpen] = useState(false);

  const [newIncidentTitle, setNewIncidentTitle] = useState("");
  const [newIncidentSeverity, setNewIncidentSeverity] = useState<IncidentSeverity>("High");
  const [newIncidentDescription, setNewIncidentDescription] = useState("");

  const activeIncidents = incidents.filter((i) => i.status !== "Resolved");
  const resolvedIncidents = incidents.filter((i) => i.status === "Resolved");

  const handleReportIncident = () => {
    const newIncident: Incident = {
      id: `inc-${Date.now()}`,
      title: newIncidentTitle,
      severity: newIncidentSeverity,
      status: "Investigating",
      createdAt: new Date().toISOString(),
      updates: [
        {
          timestamp: new Date().toISOString(),
          status: "Investigating",
          description: newIncidentDescription,
        },
      ],
    };
    setIncidents([newIncident, ...incidents]);
    setOpen(false);
    // Reset form
    setNewIncidentTitle("");
    setNewIncidentSeverity("High");
    setNewIncidentDescription("");
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="active">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="active">Active Incidents</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Report Incident
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Report a New Incident</DialogTitle>
                  <DialogDescription>
                    Fill out the details below to declare a new incident.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={newIncidentTitle}
                      onChange={(e) => setNewIncidentTitle(e.target.value)}
                      className="col-span-3"
                      placeholder="e.g. API Latency Issues"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="severity" className="text-right">
                      Severity
                    </Label>
                    <Select
                      value={newIncidentSeverity}
                      onValueChange={(value: IncidentSeverity) => setNewIncidentSeverity(value)}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right pt-2">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newIncidentDescription}
                      onChange={(e) => setNewIncidentDescription(e.target.value)}
                      className="col-span-3"
                      placeholder="A brief description of what is happening."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleReportIncident}>Declare Incident</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <TabsContent value="active">
            {activeIncidents.length > 0 ? (
              <IncidentTable incidents={activeIncidents} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <ShieldAlert className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold">All Systems Operational</h3>
                <p className="text-muted-foreground">
                  There are no active incidents.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="resolved">
            <IncidentTable incidents={resolvedIncidents} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

    