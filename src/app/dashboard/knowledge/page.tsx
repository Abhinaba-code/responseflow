"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, PlusCircle, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialKnowledgeBase = [
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

type Article = { id: string; title: string; content: string; };
type KnowledgeCategory = { category: string; articles: Article[] };

export default function KnowledgePage() {
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeCategory[]>(initialKnowledgeBase);
  const [isFormOpen, setIsFormOpen] = useState(false);

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

      <ArticleFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleAddArticle}
        categories={knowledgeBase.map(c => c.category)}
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
