# ResponseFlow - Detailed Documentation

This document provides a comprehensive overview of the ResponseFlow application, its architecture, features, and how to use it.

## 1. Introduction

ResponseFlow is a powerful, AI-driven platform designed to centralize and streamline audience communication. It aggregates messages from various channels like email, social media, and live chat into a unified inbox. By leveraging generative AI, it equips support agents and community managers with tools to improve response times, prioritize important conversations, and gain insights into customer interactions.

## 2. Core Features

### 2.1. Unified Inbox
The heart of ResponseFlow. It provides a single interface to view, manage, and respond to all customer conversations.
- **Multi-Channel Support**: Integrates with channels like Email, Twitter, Live Chat, WhatsApp, and more.
- **Ticket Details**: Displays the full conversation history, customer information, and AI-powered insights for each ticket.
- **Real-time Updates**: The inbox is designed to show new messages and status changes as they happen.

### 2.2. AI-Powered Assistant

ResponseFlow uses **Firebase Genkit** and **Google's Gemini models** to provide several AI-driven features.

- **PriorityScore AI**:
  - **Function**: Automatically analyzes a new ticket's content, sentiment, channel, and SLA to generate a priority score (0-100) and a suggested priority level (P0-P3).
  - **How to Use**: In the ticket detail view, click the "Calculate Priority Score" button in the AI Assistant panel.

- **Conversation Summarization**:
  - **Function**: Generates a concise summary of a lengthy ticket conversation.
  - **How to Use**: In the ticket detail view, click the "Summarize Conversation" button. The summary will appear in the AI Assistant panel.

- **Suggested Replies**:
  - **Function**: Based on the last message from a customer, the AI suggests three distinct, context-aware replies.
  - **How to Use**: Click the "Suggest Replies" button in the ticket detail view. Click on a suggestion to automatically populate the reply text area.

- **AI Chatbot**:
  - **Function**: A draggable widget provides an AI assistant that can answer questions about the ResponseFlow platform. It also features text-to-speech for audio responses and speech-to-text for voice input.
  - **How to Use**: Click the floating bot icon in the dashboard to open the chat interface.

### 2.3. Dashboard & Analytics

- **Analytics Page** (`/dashboard/analytics`):
  - Visualizes key performance indicators (KPIs) like average response time, resolution time, and SLA attainment.
  - Includes charts for response/resolution times, tickets by channel, and customer satisfaction (CSAT).
  - This is a "Pro" plan feature.

- **Teams & Workload** (`/dashboard/teams`):
  - Displays a list of support agents, their status, current workload vs. capacity, and skills.
  - This is an "Enterprise" plan feature.

### 2.4. Subscription & Billing

- **Plans**: The app simulates three subscription tiers: Free, Pro, and Enterprise.
- **Feature Gating**: Certain pages and features are protected by a "Plan Guard" that restricts access based on the user's current plan.
- **Billing Page** (`/dashboard/billing`): Users can upgrade or downgrade their plan.
- **Wallet System**: A simple wallet context simulates a user's balance, which is used for plan upgrades.

### 2.5. Customer & Data Management

- **Customers Page** (`/dashboard/customers`): View a list of all customers, their ticket counts, and average sentiment. You can add, edit, and delete customer records.
- **Knowledge Base** (`/dashboard/knowledge`): A repository of support articles organized by category. Users can add new articles and categories.

## 3. How to Use the Application

### 3.1. Sign Up & Login
- New users can sign up for an account. The name provided at signup is used to personalize the dashboard.
- The default plan for a new user is the "Free" plan.

### 3.2. Navigating the Dashboard
- **Sidebar**: The main navigation for accessing all features like the Inbox, Analytics, Customers, etc. Badges indicate which plan is required for a feature.
- **Header**: The header displays the current page title, a global search bar, the user's wallet balance, and a user profile dropdown.

### 3.3. Managing Tickets
- From the **Inbox**, select a ticket from the list on the left to view its details on the right.
- In the **Ticket Detail** view, you can read the conversation, use the AI assistant tools (Summarize, Suggest Replies, PriorityScore), and view customer information.
- Type a response in the text area at the bottom and click "Send".

### 3.4. Upgrading Your Plan
1. Navigate to **Settings -> Billing** or click **Billing** from the user dropdown menu.
2. Choose the "Pro" or "Enterprise" plan and click the upgrade button.
3. A confirmation dialog will appear. If you have sufficient funds in your wallet, the upgrade will be successful.
4. You can add funds to your wallet via the wallet dropdown in the header.

## 4. Technical Architecture

### 4.1. Frontend
- **Next.js App Router**: All pages and layouts are built using the `app` directory structure.
- **React Server Components (RSC)** and **Client Components**: The app leverages RSC for performance and fetches data on the server where possible. Client components (`'use client'`) are used for interactive UI.
- **ShadCN UI & Tailwind CSS**: Components are built using the reusable and accessible primitives from ShadCN UI, styled with Tailwind CSS.
- **Theming**: The application's color scheme can be customized in **Settings -> Theme**. This is achieved by updating CSS variables defined in `src/app/globals.css`.
- **State Management**: Global state for the user's plan, wallet balance, and name is managed using React's Context API.
  - `PlanProvider`: `src/context/plan-context.tsx`
  - `WalletProvider`: `src/context/wallet-context.tsx`
  - `UserProvider`: `src/context/user-context.tsx`

### 4.2. AI Integration (Genkit)
- **Genkit Flows**: All AI functionality is defined in Genkit flows located in `src/ai/flows/`. Each flow is a server-side function that interacts with an AI model.
  - `ai-chatbot.ts`: Handles conversational AI.
  - `ai-priority-score.ts`: Calculates ticket priority.
  - `ai-suggested-replies.ts`: Generates response suggestions.
  - `ai-summarize-ticket.ts`: Summarizes text.
  - `ai-text-to-speech.ts`: Converts text to audio.
- **Server Actions**: Next.js Server Actions in `src/app/actions.ts` are used to securely call these Genkit flows from client components. This avoids the need to create traditional API endpoints.
- **API Route**: The `/api/genkit/[[...path]]` route is configured to handle Genkit's internal needs for telemetry and inspection.
