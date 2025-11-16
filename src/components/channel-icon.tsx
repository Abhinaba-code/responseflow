import type { Channel } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Mail, MessageCircle, MessagesSquare, Instagram, Facebook, Twitter, Rss } from 'lucide-react';

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.24 13.76c-.52.4-1.12.72-1.8.96.04-.16.08-.32.12-.48.12-.4.12-.84.04-1.24-.2-.84-.76-1.52-1.48-2.04-.4-.28-.84-.52-1.32-.68.16-.04.32-.08.48-.12.4-.12.84-.12-1.24-.04-.84.2-1.52.76-2.04 1.48-.28.4-.52.84-.68 1.32.04-.16.08-.32.12-.48zm-8.48 0c.52.4 1.12.72 1.8.96-.04-.16-.08-.32-.12-.48-.12-.4-.12-.84-.04-1.24.2-.84.76-1.52 1.48-2.04.4-.28.84-.52 1.32-.68-.16-.04-.32-.08-.48-.12-.4-.12-.84-.12-1.24-.04-.84.2-1.52.76-2.04 1.48-.28.4-.52.84-.68 1.32.04-.16.08-.32.12-.48z"/>
    </svg>
  );


export function ChannelIcon({ channel, className }: { channel: Channel; className?: string }) {
  const iconProps = {
    className: cn('h-4 w-4', className),
  };

  switch (channel) {
    case 'email':
      return <Mail {...iconProps} />;
    case 'twitter':
      return <Twitter {...iconProps} />;
    case 'instagram':
      return <Instagram {...iconProps} />;
    case 'whatsapp':
      return <MessagesSquare {...iconProps} />;
    case 'facebook':
      return <Facebook {...iconProps} />;
    case 'live_chat':
      return <MessageCircle {...iconProps} />;
    case 'discord':
      return <DiscordIcon {...iconProps} />;
    default:
      return <Rss {...iconProps} />;
  }
}
