import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { ChannelIcon } from '@/components/channel-icon';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <MessageCircle className="h-7 w-7 text-primary" />
          <span className="font-headline">ResponseFlow</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">
              Sign Up <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <Badge variant="outline" className="mb-4">
            AI-Powered Audience Engagement
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-headline font-bold mb-4 tracking-tighter">
            Never miss a message again.
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Unify email, social, chat, and community into one intelligent inbox.
            Powered by AI to help you respond faster and smarter.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Sign Up for Free</Link>
            </Button>
            <Button size="lg" variant="outline">
              Book a Demo
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <Card className="shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="aspect-video w-full bg-background rounded-lg p-4 sm:p-6 overflow-hidden border">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">Unified Inbox - ResponseFlow</p>
                  </div>
                  <div className="flex-1 flex gap-4 pt-4 min-h-0">
                    <div className="w-1/3 border-r pr-4">
                      <h2 className="font-semibold text-lg mb-2">Inbox</h2>
                      <div className="space-y-2">
                        <div className="p-2 rounded-lg bg-secondary flex items-start gap-3">
                          <ChannelIcon channel="twitter" className="h-5 w-5 mt-1" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">"Any updates on order #512?"</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="destructive">P0</Badge>
                              <Badge variant="secondary">Question</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg flex items-start gap-3">
                          <ChannelIcon channel="email" className="h-5 w-5 mt-1" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">Feature Request: Dark Mode</p>
                             <div className="flex items-center gap-2 mt-1">
                              <Badge style={{backgroundColor: '#EAB308', color: 'white'}}>P2</Badge>
                              <Badge variant="secondary">Request</Badge>
                            </div>
                          </div>
                        </div>
                         <div className="p-2 rounded-lg flex items-start gap-3">
                          <ChannelIcon channel="whatsapp" className="h-5 w-5 mt-1" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">"Can't log in"</p>
                             <div className="flex items-center gap-2 mt-1">
                              <Badge variant="destructive">P0</Badge>
                              <Badge variant="secondary">Complaint</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-2/3">
                      <h2 className="font-semibold text-lg mb-2">Conversation</h2>
                       <div className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-center gap-2">
                             <Avatar className="h-8 w-8">
                              <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <p className="font-semibold">Alex</p>
                            <p className="text-sm text-muted-foreground">asked via Twitter</p>
                          </div>
                          <p>Any updates on order #512? I placed it last week.</p>
                          <div className="p-3 rounded-md bg-secondary">
                            <p className="text-sm font-semibold text-primary mb-1">AI Suggested Reply</p>
                            <p className="text-sm">Hi Alex, thanks for reaching out. Let me check the status of your order #512 right away. I'll get back to you in just a moment!</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
