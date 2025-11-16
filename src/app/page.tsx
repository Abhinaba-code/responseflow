
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Mail, MessagesSquare, Check, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { ChannelIcon } from '@/components/channel-icon';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const planCosts = {
    Pro: 59,
    Enterprise: 99,
};

const proFeatures = [
    "Search",
    "Developer API",
    "Playbooks (AI)",
    "Analytics"
];

const enterpriseFeatures = [
    "All Pro features",
    "Automations (AI)",
    "Workload Reporting",
    "Quality Audits",
    "Dedicated Support"
];


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background animate-fade-in-up">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <MessagesSquare className="h-7 w-7 text-primary" />
          <span className="font-headline">ResponseFlow</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
              <Link href="/about">About</Link>
          </Button>
          <Button variant="ghost" asChild>
              <Link href="/contact">Contact</Link>
          </Button>
          <Button variant="ghost" asChild>
              <Link href="/pricing">Pricing</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">
              Sign Up <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg">About</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg">Contact</Link>
                <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-lg">Pricing</Link>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-lg">Sign In</Link>
                <Button asChild>
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 text-center">
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
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
                  <div className="flex-1 flex flex-col md:flex-row gap-4 pt-4 min-h-0">
                    <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r pr-0 md:pr-4 pb-4 md:pb-0">
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
                    <div className="w-full md:w-2/3">
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
        
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
             <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-headline font-bold tracking-tight">Simple, transparent pricing</h2>
                <p className="mt-2 text-lg text-muted-foreground">Choose the plan that's right for your team.</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
                <Card className="border-2 relative">
                    <CardHeader>
                        <CardTitle className="text-2xl">Pro</CardTitle>
                        <CardDescription>For growing teams that need powerful tools and AI capabilities.</CardDescription>
                        <div className="text-4xl font-bold pt-4">₹{planCosts.Pro} <span className="text-base font-normal text-muted-foreground">/ month</span></div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3">Key Features:</h4>
                            <ul className="space-y-2">
                                {proFeatures.map(feature => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <Button className="w-full" asChild>
                          <Link href="/signup">Get Started with Pro</Link>
                        </Button>
                    </CardContent>
                </Card>

                 <Card className="border-2 border-primary relative">
                    <Badge className="absolute -top-3 right-4">Most Popular</Badge>
                    <CardHeader>
                        <CardTitle className="text-2xl">Enterprise</CardTitle>
                        <CardDescription>For large organizations requiring advanced automation and reporting.</CardDescription>
                         <div className="text-4xl font-bold pt-4">₹{planCosts.Enterprise} <span className="text-base font-normal text-muted-foreground">/ month</span></div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold mb-3">Everything in Pro, plus:</h4>
                            <ul className="space-y-2">
                                {enterpriseFeatures.map(feature => (
                                    <li key={feature} className="flex items-center gap-2">
                                        <Check className="h-4 w-4 text-green-500" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <Button className="w-full" asChild>
                          <Link href="/signup">Get Started with Enterprise</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>

      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg mb-4 sm:mb-0">
            <MessagesSquare className="h-6 w-6 text-primary" />
            <span className="font-headline">ResponseFlow</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4 sm:mb-0">
            <Link href="/careers" className="hover:text-primary">Careers</Link>
            <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-primary">Terms & Conditions</Link>
          </nav>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} ResponseFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
