
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MessagesSquare, Check, Menu } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
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

export default function PricingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
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
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
             <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-headline font-bold tracking-tight">Simple, transparent pricing</h1>
                <p className="mt-2 text-lg text-muted-foreground">Choose the plan that's right for your team. No hidden fees.</p>
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
                        <Button className="w-full" asChild size="lg">
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
                         <Button className="w-full" asChild size="lg">
                            <Link href="/signup">Get Started with Enterprise</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
             <Card className="max-w-4xl mx-auto mt-12">
                <CardHeader>
                    <CardTitle className="text-2xl">Free Plan</CardTitle>
                    <CardDescription>Perfect for individuals and small teams just getting started.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Unified Inbox</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Basic AI Features</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Up to 3 team members</li>
                    </ul>
                    <Button asChild>
                        <Link href="/signup">Sign Up for Free</Link>
                    </Button>
                </CardContent>
            </Card>
        </section>
      </main>
    </div>
  );
}

    
