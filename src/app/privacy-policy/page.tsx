
import { Button } from '@/components/ui/button';
import { MessagesSquare } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <MessagesSquare className="h-7 w-7 text-primary" />
          <span className="font-headline">ResponseFlow</span>
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-headline font-bold mb-6">Privacy Policy</h1>
            <div className="space-y-4 text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              
              <h2 className="text-2xl font-semibold text-foreground pt-4">1. Introduction</h2>
              <p>Welcome to ResponseFlow. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.</p>

              <h2 className="text-2xl font-semibold text-foreground pt-4">2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
              <ul className="list-disc list-inside pl-4">
                <li>Personal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                <li>Derivative Data: Information our servers automatically collect when you access the app, such as your IP address, browser type, etc.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-foreground pt-4">3. Use of Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
              <ul className="list-disc list-inside pl-4">
                <li>Create and manage your account.</li>
                <li>Email you regarding your account or order.</li>
                <li>Fulfill and manage purchases, orders, payments, and other transactions.</li>
                <li>Monitor and analyze usage and trends to improve your experience.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-foreground pt-4">4. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at support@responseflow.io.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
