export type Channel =
  | 'email'
  | 'twitter'
  | 'instagram'
  | 'whatsapp'
  | 'facebook'
  | 'live_chat'
  | 'discord';

export type Priority = 'P0' | 'P1' | 'P2' | 'P3';
export type Status = 'Open' | 'Pending' | 'On-hold' | 'Resolved' | 'Closed';
export type Sentiment = 'Positive' | 'Neutral' | 'Negative';

export type Tag = 'Question' | 'Request' | 'Complaint' | 'Bug' | 'Billing' | 'VIP';

export type Message = {
  id: string;
  author: 'user' | 'agent';
  authorName: string;
  authorAvatar: string;
  text: string;
  timestamp: string;
};

export type Ticket = {
  id: string;
  subject: string;
  channel: Channel;
  requester: {
    name: string;
    avatar: string;
    email: string;
  };
  priority: Priority;
  status: Status;
  sentiment: Sentiment;
  assignee?: {
    name: string;
    avatar: string;
  };
  tags: Tag[];
  slaDue: string;
  lastUpdate: string;
  unread: boolean;
  messages: Message[];
};

export type Agent = {
  id: string;
  name: string;
  avatar: string;
  status: 'Online' | 'Offline' | 'Busy';
  currentLoad: number;
  capacity: number;
  skills: string[];
};

export type IncidentStatus = 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved';
export type IncidentSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export type Incident = {
  id: string;
  title: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  createdAt: string;
  resolvedAt?: string;
  updates: {
    timestamp: string;
    status: IncidentStatus;
    description: string;
  }[];
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalTickets: number;
  openTickets: number;
  avgSentiment: Sentiment;
  lastContact: string;
};

export type PlaybookAction = {
  id: string;
  type: string;
  description: string;
};

export type Playbook = {
  id: string;
  name: string;
  description: string;
  trigger: string;
  actions: PlaybookAction[];
};
