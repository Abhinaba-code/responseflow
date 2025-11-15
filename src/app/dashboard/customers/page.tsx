
import { tickets, agents } from "@/lib/data";
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
import { formatDistanceToNow } from "date-fns";
import { Ticket, Sentiment } from "@/lib/types";

type Customer = {
  name: string;
  avatar: string;
  totalTickets: number;
  openTickets: number;
  avgSentiment: Sentiment;
  lastContact: string;
};

const sentimentScores: { [key in Sentiment]: number } = {
  Positive: 1,
  Neutral: 0,
  Negative: -1,
};

const getAvgSentiment = (sentiments: Sentiment[]): Sentiment => {
  if (sentiments.length === 0) return "Neutral";
  const score =
    sentiments.reduce((acc, s) => acc + sentimentScores[s], 0) /
    sentiments.length;
  if (score > 0.5) return "Positive";
  if (score < -0.5) return "Negative";
  return "Neutral";
};

const sentimentClasses: { [key in Sentiment]: string } = {
  Positive: "bg-green-100 text-green-800",
  Neutral: "bg-gray-100 text-gray-800",
  Negative: "bg-red-100 text-red-800",
};

export default function CustomersPage() {
  const customersMap = new Map<string, { tickets: Ticket[] }>();

  tickets.forEach((ticket) => {
    if (!customersMap.has(ticket.requester.name)) {
      customersMap.set(ticket.requester.name, { tickets: [] });
    }
    customersMap.get(ticket.requester.name)!.tickets.push(ticket);
  });

  const customerData: Customer[] = Array.from(customersMap.entries()).map(
    ([name, data]) => {
      const sortedTickets = data.tickets.sort(
        (a, b) =>
          new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
      );
      const lastContact = sortedTickets[0].lastUpdate;
      const sentiments = data.tickets.map((t) => t.sentiment);

      return {
        name,
        avatar: data.tickets[0].requester.avatar,
        totalTickets: data.tickets.length,
        openTickets: data.tickets.filter(
          (t) => t.status === "Open" || t.status === "Pending"
        ).length,
        avgSentiment: getAvgSentiment(sentiments),
        lastContact,
      };
    }
  );

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Customer</TableHead>
                <TableHead>Total Tickets</TableHead>
                <TableHead>Open Tickets</TableHead>
                <TableHead>Avg. Sentiment</TableHead>
                <TableHead>Last Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerData.map((customer) => (
                <TableRow key={customer.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{customer.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{customer.name}</span>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
