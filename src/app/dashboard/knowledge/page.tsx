"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, PlusCircle, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const initialKnowledgeBase = [
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

type Article = { id: string; title: string; content: string; };
type KnowledgeCategory = { category: string; articles: Article[] };

export default function KnowledgePage() {
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeCategory[]>(initialKnowledgeBase);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const handleAddArticle = (newArticle: Omit<Article, 'id'> & { category: string }) => {
    setKnowledgeBase(prev => {
      const existingCategory = prev.find(cat => cat.category === newArticle.category);
      if (existingCategory) {
        return prev.map(cat => 
          cat.category === newArticle.category 
            ? { ...cat, articles: [...cat.articles, { ...newArticle, id: `art-${Date.now()}` }] } 
            : cat
        );
      } else {
        return [
          ...prev,
          {
            category: newArticle.category,
            articles: [{ ...newArticle, id: `art-${Date.now()}` }],
          },
        ];
      }
    });
    setIsFormOpen(false);
  };
  
  const handleViewArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsViewOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-9" />
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
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
                          <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{article.title}</p>
                            <p className="text-sm text-muted-foreground truncate">{article.content}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleViewArticle(article)}>View</Button>
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

      <ArticleFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleAddArticle}
        categories={knowledgeBase.map(c => c.category)}
      />

      <ArticleViewDialog
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        article={selectedArticle}
      />
    </div>
  );
}

function ArticleFormDialog({
  open,
  onOpenChange,
  onSave,
  categories
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Omit<Article, 'id'> & { category: string }) => void;
  categories: string[];
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = () => {
    const finalCategory = category === 'new' ? newCategory : category;
    if (!title || !content || !finalCategory) return;
    onSave({ title, content, category: finalCategory });
    // Reset form
    setTitle('');
    setContent('');
    setCategory('');
    setNewCategory('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Article</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category or create a new one" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                <SelectItem value="new">Create new category</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {category === 'new' && (
            <div className="space-y-2">
              <Label htmlFor="new-category">New Category Name</Label>
              <Input id="new-category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[150px]" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Article</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ArticleViewDialog({
  open,
  onOpenChange,
  article
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: Article | null;
}) {
  if (!article) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{article.title}</DialogTitle>
          <DialogDescription>
            Full article content below.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] mt-4 pr-4">
            <div className="text-sm whitespace-pre-wrap">
                {article.content}
            </div>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
