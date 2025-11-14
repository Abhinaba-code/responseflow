import type { Ticket } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChannelIcon } from '@/components/channel-icon';
import { SlaTimer } from '@/components/sla-timer';
import { formatDistanceToNow } from 'date-fns';

type TicketListProps = {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelectTicket: (id: string) => void;
};

const priorityClasses: { [key in Ticket['priority']]: string } = {
  P0: 'bg-red-500',
  P1: 'bg-orange-500',
  P2: 'bg-yellow-500',
  P3: 'bg-green-500',
};

export function TicketList({ tickets, selectedTicketId, onSelectTicket }: TicketListProps) {
  return (
    <aside className="w-[380px] border-r h-full flex-shrink-0">
      <ScrollArea className="h-full">
        <div className="p-2 space-y-1">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => onSelectTicket(ticket.id)}
              className={cn(
                'w-full text-left p-3 rounded-lg transition-colors flex gap-3 items-start',
                selectedTicketId === ticket.id
                  ? 'bg-secondary'
                  : 'hover:bg-secondary/50'
              )}
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{ticket.requester.avatar}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-card p-0.5 rounded-full">
                  <ChannelIcon channel={ticket.channel} className="h-4 w-4" />
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-sm truncate">{ticket.requester.name}</p>
                   <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(new Date(ticket.lastUpdate), { addSuffix: true })}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground truncate">{ticket.subject}</p>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <div className={cn("w-2.5 h-2.5 rounded-full", priorityClasses[ticket.priority])} title={`Priority: ${ticket.priority}`}></div>
                  <Badge variant={ticket.status === 'Resolved' ? 'default' : 'outline'}>{ticket.status}</Badge>
                  {ticket.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                  <SlaTimer slaDue={ticket.slaDue} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
