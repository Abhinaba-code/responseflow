
import { Button } from '@/components/ui/button';
import { MessagesSquare } from 'lucide-react';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
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
            <h1 className="text-4xl font-headline font-bold mb-6">Terms and Conditions</h1>
            <div className="space-y-4 text-muted-foreground">
              <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

              <h2 className="text-2xl font-semibold text-foreground pt-4">1. Agreement to Terms</h2>
              <p>By using our services, you agree to be bound by these Terms and Conditions. If you do not agree to these Terms, do not use the services.</p>

              <h2 className="text-2xl font-semibold text-foreground pt-4">2. Intellectual Property Rights</h2>
              <p>The Service and its original content, features, and functionality are and will remain the exclusive property of ResponseFlow and its licensors. Our trademarks may not be used in connection with any product or service without the prior written consent of ResponseFlow.</p>

              <h2 className="text-2xl font-semibold text-foreground pt-4">3. User Accounts</h2>
              <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
              
              <h2 className="text-2xl font-semibold text-foreground pt-4">4. Termination</h2>
              <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

              <h2 className="text-2xl font-semibold text-foreground pt-4">5. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction, without regard to its conflict of law provisions.</p>
              
              <h2 className="text-2xl font-semibold text-foreground pt-4">6. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at support@responseflow.io.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
