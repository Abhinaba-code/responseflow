
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessagesSquare, Briefcase, Building, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
  const jobOpenings = [
    {
      title: 'Senior Frontend Engineer',
      location: 'Remote',
      department: 'Engineering',
    },
    {
      title: 'AI/ML Engineer',
      location: 'Tech City, TC',
      department: 'AI Research',
    },
    {
      title: 'Product Marketing Manager',
      location: 'Remote',
      department: 'Marketing',
    },
  ];

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
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h1 className="text-4xl lg:text-6xl font-headline font-bold mb-4 tracking-tighter">
            Build the Future of Communication
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're a team of passionate innovators dedicated to making audience engagement smarter and more meaningful. If you're driven by impact, we'd love to hear from you.
          </p>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Current Openings</h2>
            <div className="space-y-4">
              {jobOpenings.map((job, index) => (
                <Card key={index}>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-muted-foreground mt-1">
                        {job.department} &middot; {job.location}
                      </p>
                    </div>
                    <Button variant="outline" asChild>
                      <Link href="#">
                        Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
             <p className="text-center text-muted-foreground mt-12">Don't see a role that fits? <Link href="/contact" className="text-primary hover:underline">Get in touch</Link> and tell us how you can make a difference.</p>
          </div>
        </section>
        
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Join Us?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card>
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                  <Briefcase className="h-8 w-8" />
                </div>
                <CardTitle>Meaningful Work</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Shape the future of how businesses interact with their audiences on a global scale.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                  <Building className="h-8 w-8" />
                </div>
                <CardTitle>Great Culture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Join a collaborative, remote-first environment that values growth and work-life balance.</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <CardTitle>Awesome Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Enjoy competitive salary, comprehensive benefits, and a generous equity package.</p>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>
    </div>
  );
}
