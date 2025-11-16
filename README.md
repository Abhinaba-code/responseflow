# ResponseFlow - Unified Audience Engagement Platform

ResponseFlow is a modern, AI-powered web application designed to unify customer communication channels into a single, intelligent inbox. It helps support teams, community managers, and businesses manage audience interactions from email, social media, and live chat more efficiently.

## ✨ Key Features

- **Unified Inbox**: Consolidate messages from multiple channels (Email, Twitter, WhatsApp, etc.) into one streamlined view.
- **AI-Powered Tools**:
  - **PriorityScore AI**: Automatically scores and prioritizes tickets based on urgency, sentiment, and other signals.
  - **AI Summarization**: Instantly get a summary of long conversation threads.
  - **Suggested Replies**: Generate context-aware reply suggestions to respond faster.
  - **AI Chatbot Assistant**: A helpful chatbot, powered by Google's Gemini, to answer questions about the platform.
- **Customer Management**: View and manage customer details and interaction history.
- **Analytics Dashboard**: Visualize key support metrics like response times, resolution times, and customer satisfaction.
- **Plan & Billing Management**: A built-in system for users to upgrade, downgrade, and manage their subscription plans.
- **Developer API & Webhooks**: (Pro Plan) Extend and integrate ResponseFlow with other services.
- **Customizable Theme**: Personalize the look and feel of the workspace.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini models
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Context API
- **Styling**: Tailwind CSS with CSS Variables for theming

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

To start the app in development mode, run:

```bash
npm run dev
```

This will start the Next.js development server, typically on `http://localhost:9002`.

### Building for Production

To create a production-ready build, run:

```bash
npm run build
```

This command bundles the application for production. You can then start the production server with `npm start`.

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```
src
├── ai/                 # Genkit AI flows and configuration
├── app/                # Next.js App Router pages and layouts
│   ├── (auth)/         # Route group for auth pages (login, signup) - if applicable
│   ├── dashboard/      # Protected dashboard routes and layout
│   └── ...             # Landing pages (home, about, etc.)
├── components/         # Reusable UI components
│   ├── analytics/
│   ├── chatbot/
│   ├── inbox/
│   └── ui/             # ShadCN UI components
├── context/            # React Context providers for global state
├── hooks/              # Custom React hooks
├── lib/                # Shared utilities, data, types
└── ...
```

For more in-depth documentation, please see the `docs/DOCUMENTATION.md` file.
