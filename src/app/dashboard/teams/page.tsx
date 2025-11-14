import { agents } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeamsPage() {
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
                       <Button variant="ghost" size="icon">
                         <MoreHorizontal className="h-4 w-4" />
                       </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
