import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, PlusCircle, Search } from "lucide-react";

const knowledgeBase = [
  {
    category: "Getting Started",
    articles: [
      { id: "gs-1", title: "Connecting Your First Channel", content: "To connect a channel, go to Settings > Channels and click 'Add Channel'..." },
      { id: "gs-2", title: "Setting Up Your Profile", content: "You can update your name and profile picture under Settings > Profile..." },
      { id: "gs-3", title: "Understanding the Unified Inbox", content: "The Unified Inbox brings all your customer conversations into one place..." },
    ],
  },
  {
    category: "Billing",
    articles: [
      { id: "b-1", title: "How to Upgrade Your Plan", content: "To upgrade your plan, navigate to Settings > Billing and select a new plan..." },
      { id: "b-2", title: "Understanding Your Invoice", content: "Your invoice includes a breakdown of your subscription and any add-ons..." },
      { id: "b-3", title: "Accepted Payment Methods", content: "We accept all major credit cards, including Visa, Mastercard, and American Express..." },
    ],
  },
  {
    category: "Integrations",
    articles: [
      { id: "i-1", title: "Connecting to Slack", content: "To receive notifications in Slack, go to Settings > Integrations and authorize your Slack workspace..." },
      { id: "i-2", title: "Using the Zapier Integration", content: "Our Zapier integration allows you to connect ResponseFlow to thousands of other apps..." },
    ],
  },
];


export default function KnowledgePage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
            <div className="relative w-full max-w-lg">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search articles..." className="pl-9" />
            </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Article
          </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>
                    Manage and create support articles to help your team and customers.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" defaultValue={knowledgeBase.map(kb => kb.category)} className="w-full">
                    {knowledgeBase.map((category) => (
                        <AccordionItem key={category.category} value={category.category}>
                            <AccordionTrigger className="text-lg font-semibold">{category.category}</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2">
                                    {category.articles.map((article) => (
                                        <div key={article.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary">
                                            <FileText className="h-5 w-5 text-muted-foreground" />
                                            <div className="flex-1">
                                                <p className="font-medium">{article.title}</p>
                                                <p className="text-sm text-muted-foreground truncate">{article.content}</p>
                                            </div>
                                            <Button variant="ghost" size="sm">View</Button>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}