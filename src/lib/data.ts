import { addMinutes, subDays, subHours, subMinutes } from 'date-fns';
import type { Ticket, Agent, Priority, Sentiment, Tag, Channel, Status, Incident, Customer, Playbook } from './types';

const now = new Date();

export const agents: Agent[] = [
  { id: 'agent-1', name: 'Alice Johnson', avatar: 'AJ', status: 'Online', currentLoad: 3, capacity: 5, skills: ['Billing', 'Tech Support'] },
  { id: 'agent-2', name: 'Bob Williams', avatar: 'BW', status: 'Online', currentLoad: 5, capacity: 5, skills: ['Social Media', 'VIP'] },
  { id: 'agent-3', name: 'Charlie Brown', avatar: 'CB', status: 'Offline', currentLoad: 0, capacity: 5, skills: ['General Inquiry'] },
  { id: 'agent-4', name: 'Diana Miller', avatar: 'DM', status: 'Busy', currentLoad: 4, capacity: 4, skills: ['Tech Support', 'Escalations'] },
  { id: 'agent-5', name: 'Ethan Rodriguez', avatar: 'ER', status: 'Online', currentLoad: 2, capacity: 5, skills: ['Billing', 'Spanish'] },
  { id: 'agent-6', name: 'Fiona Garcia', avatar: 'FG', status: 'Offline', currentLoad: 0, capacity: 5, skills: ['Social Media', 'French'] },
  { id: 'agent-7', name: 'George Clark', avatar: 'GC', status: 'Busy', currentLoad: 5, capacity: 5, skills: ['Tech Support', 'VIP'] },
  { id: 'agent-8', name: 'Hannah Lewis', avatar: 'HL', status: 'Online', currentLoad: 1, capacity: 5, skills: ['General Inquiry', 'German'] },
];

export const tickets: Ticket[] = [
  {
    id: 'tkt-001',
    subject: 'My order #512 hasn\'t arrived yet',
    channel: 'twitter',
    requester: { name: 'Alex Smith', avatar: 'AS', email: 'alex.smith@example.com' },
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
    requester: { name: 'Brenda Chen', avatar: 'BC', email: 'brenda.chen@example.com' },
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
    requester: { name: 'Carlos Diaz', avatar: 'CD', email: 'carlos.diaz@example.com' },
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
    requester: { name: 'Diana Ross', avatar: 'DR', email: 'diana.ross@example.com' },
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
    requester: { name: 'Ethan Hunt', avatar: 'EH', email: 'ethan.hunt@example.com' },
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
    requester: { name: 'Frankie Adams', avatar: 'FA', email: 'frankie.adams@example.com' },
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
    requester: { name: 'Grace Lee', avatar: 'GL', email: 'grace.lee@example.com' },
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
    requester: { name: 'Henry Wilson', avatar: 'HW', email: 'henry.wilson@example.com' },
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
  {
    id: 'tkt-009',
    subject: 'Re: My order #512 hasn\'t arrived yet',
    channel: 'twitter',
    requester: { name: 'Alex Smith', avatar: 'AS', email: 'alex.smith@example.com' },
    priority: 'P0',
    status: 'Open',
    sentiment: 'Negative',
    assignee: agents[1],
    tags: ['Complaint', 'VIP'],
    slaDue: addMinutes(now, 25).toISOString(),
    lastUpdate: subMinutes(now, 1).toISOString(),
    unread: true,
    messages: [
      { id: 'msg-1', author: 'user', authorName: 'Alex Smith', authorAvatar: 'AS', text: 'Any update??????', timestamp: subMinutes(now, 1).toISOString() },
    ],
  },
];

export const incidents: Incident[] = [
  {
    id: 'inc-001',
    title: 'API Latency Issues',
    status: 'Investigating',
    severity: 'High',
    createdAt: subMinutes(now, 45).toISOString(),
    updates: [
      {
        timestamp: subMinutes(now, 45).toISOString(),
        status: 'Investigating',
        description: 'We are investigating reports of increased API latency.',
      },
    ],
  },
  {
    id: 'inc-002',
    title: 'Dashboard Login Failures',
    status: 'Identified',
    severity: 'Critical',
    createdAt: subHours(now, 2).toISOString(),
    updates: [
       {
        timestamp: subHours(now, 2).toISOString(),
        status: 'Investigating',
        description: 'We are seeing an increase in login failures and are investigating.',
      },
      {
        timestamp: subMinutes(now, 90).toISOString(),
        status: 'Identified',
        description: 'The issue has been identified as a problem with our authentication provider. We are working on a fix.',
      },
    ],
  },
  {
    id: 'inc-003',
    title: 'Scheduled Maintenance',
    status: 'Resolved',
    severity: 'Low',
    createdAt: subDays(now, 2).toISOString(),
    resolvedAt: subDays(now, 2).toISOString(),
    updates: [
      {
        timestamp: subDays(now, 2).toISOString(),
        status: 'Resolved',
        description: 'Scheduled maintenance has been completed.',
      },
    ],
  },
    {
    id: 'inc-004',
    title: 'Social Media Channel Integration Delays',
    status: 'Monitoring',
    severity: 'Medium',
    createdAt: subHours(now, 8).toISOString(),
    updates: [
      {
        timestamp: subHours(now, 8).toISOString(),
        status: 'Investigating',
        description: 'We are investigating reports of delays in social media channel integrations.',
      },
      {
        timestamp: subHours(now, 6).toISOString(),
        status: 'Identified',
        description: 'The issue has been identified with a third-party provider. We are working with them to resolve it.',
      },
      {
        timestamp: subHours(now, 3).toISOString(),
        status: 'Monitoring',
        description: 'A fix has been implemented and we are monitoring the results.',
      },
    ],
  },
  {
    id: 'inc-005',
    title: 'Email Processing Slowdown',
    status: 'Resolved',
    severity: 'High',
    createdAt: subDays(now, 1).toISOString(),
    resolvedAt: subDays(now, 1).toISOString(),
    updates: [
       {
        timestamp: subDays(now, 1).toISOString(),
        status: 'Investigating',
        description: 'We are investigating reports of slow email processing.',
      },
      {
        timestamp: subDays(now, 1).toISOString(),
        status: 'Identified',
        description: 'The issue has been identified as a problem with our email processing queue.',
      },
       {
        timestamp: subDays(now, 1).toISOString(),
        status: 'Resolved',
        description: 'The email processing queue has been cleared and the issue is resolved.',
      },
    ],
  },
];


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

// Derive customers from tickets
const customersMap = new Map<string, { tickets: Ticket[], email: string, avatar: string }>();
tickets.forEach((ticket) => {
  if (!customersMap.has(ticket.requester.name)) {
    customersMap.set(ticket.requester.name, { tickets: [], email: ticket.requester.email, avatar: ticket.requester.avatar });
  }
  customersMap.get(ticket.requester.name)!.tickets.push(ticket);
});

export const initialCustomers: Customer[] = Array.from(customersMap.entries()).map(
  ([name, data], index) => {
    const sortedTickets = data.tickets.sort(
      (a, b) =>
        new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
    );
    const lastContact = sortedTickets.length > 0 ? sortedTickets[0].lastUpdate : new Date(0).toISOString();
    const sentiments = data.tickets.map((t) => t.sentiment);

    return {
      id: `cust-${index + 1}`,
      name,
      email: data.email,
      avatar: data.avatar,
      totalTickets: data.tickets.length,
      openTickets: data.tickets.filter(
        (t) => t.status === "Open" || t.status === "Pending"
      ).length,
      avgSentiment: getAvgSentiment(sentiments),
      lastContact,
    };
  }
);


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

export const initialPlaybooks: Playbook[] = [
  {
    id: "pb-1",
    name: "API Latency Spike",
    description: "Standard procedure for when the main API is experiencing high latency.",
    trigger: "Incident Created: Severity is Critical OR High",
    actions: [
      { id: "act-1", type: "Notify", description: "Notify #dev-ops channel in Slack" },
      { id: "act-2", type: "Update", description: "Create a public status page update" },
      { id: "act-3", type: "Assign", description: "Assign to On-Call Engineer" },
    ],
  },
  {
    id: "pb-2",
    name: "Failed Deployment",
    description: "Handles the response for a failed production deployment.",
    trigger: "Webhook received from CI/CD pipeline",
    actions: [
      { id: "act-1", type: "Page", description: "Page the Lead Developer" },
      { id: "act-2", type: "Declare", description: "Declare a High severity incident" },
      { id: "act-3", type: "Rollback", description: "Initiate automated rollback procedure" },
    ],
  },
];

export const initialKnowledgeBase = [
  {
    category: "Getting Started",
    articles: [
      { id: "gs-1", title: "Connecting Your First Channel", content: "To connect a channel, go to Settings > Channels and click 'Add Channel'. Follow the on-screen instructions to authorize ResponseFlow to access your account. You can connect various channels like email, Twitter, Facebook, and more. Once connected, messages from these channels will appear in your unified inbox." },
      { id: "gs-2", title: "Setting Up Your Profile", content: "You can update your name, profile picture, and notification preferences under Settings > Profile. Make sure to save your changes. Your profile picture will be shown to your team members, but not to customers." },
      { id: "gs-3", title: "Understanding the Unified Inbox", content: "The Unified Inbox brings all your customer conversations into one place, regardless of the channel they come from. You can filter, sort, and assign conversations to team members directly from the inbox view." },
    ],
  },
  {
    category: "Billing",
    articles: [
      { id: "b-1", title: "How to Upgrade Your Plan", content: "To upgrade your plan, navigate to Settings > Billing and select a new plan that fits your needs. The change will be effective immediately, and your account will be prorated." },
      { id: "b-2", title: "Understanding Your Invoice", content: "Your invoice includes a breakdown of your subscription cost, any add-ons, and usage-based charges. You can download past invoices from the Settings > Billing page." },
      { id: "b-3", title: "Accepted Payment Methods", content: "We accept all major credit cards, including Visa, Mastercard, and American Express. We also support payments via PayPal for annual plans." },
    ],
  },
  {
    category: "Integrations",
    articles: [
      { id: "i-1", title: "Connecting to Slack", content: "To receive notifications in Slack, go to Settings > Integrations and authorize your Slack workspace. You can configure which notifications you'd like to receive in specific channels." },
      { id: "i-2", title: "Using the Zapier Integration", content: "Our Zapier integration allows you to connect ResponseFlow to thousands of other apps. Create zaps to automate workflows between ResponseFlow and services like Google Sheets, Trello, or Salesforce." },
    ],
  },
];

// Type guard for channel
export function isChannel(value: string): value is Channel {
  return ['email', 'twitter', 'instagram', 'whatsapp', 'facebook', 'live_chat', 'discord'].includes(value);
}
