import { addMinutes, subDays, subHours } from 'date-fns';
import type { Ticket, Agent, Priority, Sentiment, Tag, Channel, Status } from './types';

const now = new Date();

export const agents: Agent[] = [
  { id: 'agent-1', name: 'Alice Johnson', avatar: 'AJ', status: 'Online', currentLoad: 3, capacity: 5, skills: ['Billing', 'Tech Support'] },
  { id: 'agent-2', name: 'Bob Williams', avatar: 'BW', status: 'Online', currentLoad: 5, capacity: 5, skills: ['Social Media', 'VIP'] },
  { id: 'agent-3', name: 'Charlie Brown', avatar: 'CB', status: 'Offline', currentLoad: 0, capacity: 5, skills: ['General Inquiry'] },
  { id: 'agent-4', name: 'Diana Miller', avatar: 'DM', status: 'Busy', currentLoad: 4, capacity: 4, skills: ['Tech Support', 'Escalations'] },
];

export const tickets: Ticket[] = [
  {
    id: 'tkt-001',
    subject: 'My order #512 hasn\'t arrived yet',
    channel: 'twitter',
    requester: { name: 'Alex Smith', avatar: 'AS' },
    priority: 'P0',
    status: 'Open',
    sentiment: 'Negative',
    assignee: agents[1],
    tags: ['Complaint', 'VIP'],
    slaDue: addMinutes(now, 25).toISOString(),
    lastUpdate: subMinutes(now, 5).toISOString(),
    unread: true,
    messages: [
      { id: 'msg-1', author: 'user', authorName: 'Alex Smith', authorAvatar: 'AS', text: 'My order #512 hasn\'t arrived yet. It was supposed to be here yesterday. What\'s the status?', timestamp: subMinutes(now, 5).toISOString() },
    ],
  },
  {
    id: 'tkt-002',
    subject: 'Feature Request: Bulk export',
    channel: 'email',
    requester: { name: 'Brenda Chen', avatar: 'BC' },
    priority: 'P2',
    status: 'Open',
    sentiment: 'Neutral',
    assignee: agents[0],
    tags: ['Request'],
    slaDue: addMinutes(now, 240).toISOString(),
    lastUpdate: subHours(now, 2).toISOString(),
    unread: false,
    messages: [
      { id: 'msg-1', author: 'user', authorName: 'Brenda Chen', authorAvatar: 'BC', text: 'Hi team, I love the product. It would be amazing if you could add a feature to bulk export all my data as a CSV. Thanks!', timestamp: subHours(now, 2).toISOString() },
      { id: 'msg-2', author: 'agent', authorName: 'Alice Johnson', authorAvatar: 'AJ', text: 'Hi Brenda, thanks for the great suggestion! I\'ve passed it along to our product team for consideration. We appreciate your feedback!', timestamp: subHours(now, 1).toISOString() },
    ],
  },
  {
    id: 'tkt-003',
    subject: 'Having trouble logging in',
    channel: 'live_chat',
    requester: { name: 'Carlos Diaz', avatar: 'CD' },
    priority: 'P1',
    status: 'Open',
    sentiment: 'Negative',
    assignee: agents[3],
    tags: ['Bug', 'Question'],
    slaDue: addMinutes(now, 60).toISOString(),
    lastUpdate: subMinutes(now, 30).toISOString(),
    unread: true,
    messages: [
      { id: 'msg-1', author: 'user', authorName: 'Carlos Diaz', authorAvatar: 'CD', text: 'I can\'t log in. I keep getting a "password incorrect" error but I\'m sure it\'s right.', timestamp: subMinutes(now, 30).toISOString() },
    ],
  },
  {
    id: 'tkt-004',
    subject: 'Thank you for the amazing support!',
    channel: 'whatsapp',
    requester: { name: 'Diana Ross', avatar: 'DR' },
    priority: 'P3',
    status: 'Resolved',
    sentiment: 'Positive',
    assignee: agents[1],
    tags: [],
    slaDue: subHours(now, 5).toISOString(),
    lastUpdate: subHours(now, 3).toISOString(),
    unread: false,
    messages: [
      { id: 'msg-1', author: 'user', authorName: 'Diana Ross', authorAvatar: 'DR', text: 'Just wanted to say thanks. Your team helped me solve my issue super fast!', timestamp: subHours(now, 4).toISOString() },
      { id: 'msg-2', author: 'agent', authorName: 'Bob Williams', authorAvatar: 'BW', text: 'You\'re very welcome, Diana! We\'re happy we could help. Have a great day!', timestamp: subHours(now, 3).toISOString() },
    ],
  },
  {
    id: 'tkt-005',
    subject: 'Billing question for my subscription',
    channel: 'email',
    requester: { name: 'Ethan Hunt', avatar: 'EH' },
    priority: 'P1',
    status: 'Pending',
    sentiment: 'Neutral',
    assignee: agents[0],
    tags: ['Billing', 'Question'],
    slaDue: addMinutes(now, 150).toISOString(),
    lastUpdate: subHours(now, 4).toISOString(),
    unread: false,
    messages: [
      { id: 'msg-1', author: 'user', authorName: 'Ethan Hunt', authorAvatar: 'EH', text: 'Hi, I need clarification on my last invoice. Can someone from the billing team get in touch?', timestamp: subHours(now, 4).toISOString() },
    ],
  },
   {
    id: 'tkt-006',
    subject: 'My post was removed?',
    channel: 'discord',
    requester: { name: 'Frankie Adams', avatar: 'FA' },
    priority: 'P1',
    status: 'On-hold',
    sentiment: 'Negative',
    assignee: agents[1],
    tags: ['Complaint'],
    slaDue: addMinutes(now, 90).toISOString(),
    lastUpdate: subHours(now, 1).toISOString(),
    unread: false,
    messages: [
       { id: 'msg-1', author: 'user', authorName: 'Frankie Adams', authorAvatar: 'FA', text: 'Why was my post in #general removed? I didn\'t violate any rules.', timestamp: subHours(now, 1).toISOString() },
       { id: 'msg-2', author: 'agent', authorName: 'Bob Williams', authorAvatar: 'BW', text: 'Hi Frankie, let me check the moderation logs for you. Placing this on hold while I investigate.', timestamp: subMinutes(now, 55).toISOString() },
    ]
  },
  {
    id: 'tkt-007',
    subject: 'Can I get a demo?',
    channel: 'facebook',
    requester: { name: 'Grace Lee', avatar: 'GL' },
    priority: 'P2',
    status: 'Resolved',
    sentiment: 'Neutral',
    assignee: agents[2],
    tags: ['Request'],
    slaDue: subDays(now, 1).toISOString(),
    lastUpdate: subHours(now, 20).toISOString(),
    unread: false,
     messages: [
       { id: 'msg-1', author: 'user', authorName: 'Grace Lee', authorAvatar: 'GL', text: 'Your product looks interesting, can I schedule a demo with sales?', timestamp: subHours(now, 22).toISOString() },
       { id: 'msg-2', author: 'agent', authorName: 'Charlie Brown', authorAvatar: 'CB', text: 'Absolutely! Our sales team will reach out to you shortly to schedule a demo.', timestamp: subHours(now, 20).toISOString() },
    ]
  },
  {
    id: 'tkt-008',
    subject: 'IG comment on latest post',
    channel: 'instagram',
    requester: { name: 'Henry Wilson', avatar: 'HW' },
    priority: 'P3',
    status: 'Open',
    sentiment: 'Positive',
    tags: [],
    slaDue: addMinutes(now, 480).toISOString(),
    lastUpdate: subMinutes(now, 10).toISOString(),
    unread: true,
    messages: [
      { id: 'msg-1', author: 'user', authorName: 'Henry Wilson', authorAvatar: 'HW', text: 'This looks awesome! 🔥', timestamp: subMinutes(now, 10).toISOString() },
    ],
  },
];


// Analytics Data
const last7Days = Array.from({ length: 7 }, (_, i) => subDays(now, i)).reverse();

export const responseTimeData = last7Days.map(date => ({
  date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  'Avg Time to First Response': Math.floor(Math.random() * (45 - 15 + 1)) + 15,
  'Avg Time to Resolution': Math.floor(Math.random() * (240 - 60 + 1)) + 60,
}));

export const ticketsByChannelData = [
  { channel: 'Email', value: 45, fill: 'var(--color-email)' },
  { channel: 'Twitter', value: 32, fill: 'var(--color-twitter)' },
  { channel: 'Live Chat', value: 28, fill: 'var(--color-live_chat)' },
  { channel: 'WhatsApp', value: 15, fill: 'var(--color-whatsapp)' },
  { channel: 'Discord', value: 12, fill: 'var(--color-discord)' },
  { channel: 'Other', value: 8, fill: 'var(--color-other)' },
];

export const kpiData = {
  timeToFirstResponse: { value: '28m', change: '-12%', isGood: true },
  timeToResolution: { value: '3.2h', change: '-8%', isGood: true },
  slaAttainment: { value: '98.5%', change: '+0.5%', isGood: true },
  backlog: { value: '142', change: '+15%', isGood: false },
};

export const csatData = [
  { name: '5 Stars', value: 1024, fill: 'var(--color-success)' },
  { name: '4 Stars', value: 312, fill: 'var(--color-info)' },
  { name: '3 Stars', value: 89, fill: 'var(--color-warning)' },
  { name: '1-2 Stars', value: 23, fill: 'var(--color-danger)' },
];

// Type guard for channel
export function isChannel(value: string): value is Channel {
  return ['email', 'twitter', 'instagram', 'whatsapp', 'facebook', 'live_chat', 'discord'].includes(value);
}
