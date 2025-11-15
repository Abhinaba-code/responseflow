import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { incidents, type Incident } from "@/lib/data";
import { format } from 'date-fns';
import { PlusCircle, ShieldAlert } from "lucide-react";

const severityClasses: { [key in Incident['severity']]: string } = {
  Critical: "bg-red-500 text-white",
  High: "bg-orange-500 text-white",
  Medium: "bg-yellow-500 text-black",
  Low: "bg-blue-500 text-white",
};

const statusClasses: { [key in Incident['status']]: string } = {
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
                <Badge className={cn("text-white", severityClasses[incident.severity])}>
                  {incident.severity}
                </Badge>
              </TableCell>
              <TableCell>
                 <Badge variant="outline" className={cn(statusClasses[incident.status])}>
                  {incident.status}
                </Badge>
              </TableCell>
              <TableCell>{format(new Date(incident.createdAt), 'PPp')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


export default function IncidentsPage() {
  const activeIncidents = incidents.filter(i => i.status !== 'Resolved');
  const resolvedIncidents = incidents.filter(i => i.status === 'Resolved');

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="active">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="active">Active Incidents</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Report Incident
            </Button>
          </div>
          <TabsContent value="active">
            {activeIncidents.length > 0 ? (
              <IncidentTable incidents={activeIncidents} />
            ) : (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg">
                    <ShieldAlert className="w-12 h-12 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold">All Systems Operational</h3>
                    <p className="text-muted-foreground">There are no active incidents.</p>
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