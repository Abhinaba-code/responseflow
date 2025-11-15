
'use client';

import { useSearchParams } from 'next/navigation';
import { tickets, initialCustomers, initialKnowledgeBase } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Ticket, Customer } from '@/lib/types';
import { FileText, User, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ChannelIcon } from '@/components/channel-icon';

type KnowledgeArticle = {
    id: string;
    title: string;
    content: string;
};

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    const filteredTickets = query ? tickets.filter(
        ticket =>
            ticket.subject.toLowerCase().includes(query.toLowerCase()) ||
            ticket.messages.some(m => m.text.toLowerCase().includes(query.toLowerCase()))
    ) : [];

    const filteredCustomers = query ? initialCustomers.filter(
        customer =>
            customer.name.toLowerCase().includes(query.toLowerCase()) ||
            customer.email.toLowerCase().includes(query.toLowerCase())
    ) : [];
    
    const allArticles: (KnowledgeArticle & { category: string })[] = initialKnowledgeBase.flatMap(
        category => category.articles.map(article => ({...article, category: category.category}))
    );

    const filteredArticles = query ? allArticles.filter(
        article =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.content.toLowerCase().includes(query.toLowerCase())
    ) : [];


    return (
        <div className="flex flex-col h-full bg-background">
            <div className="flex-1 overflow-auto p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Search Results for <span className="text-primary">"{query}"</span>
                </h1>
                
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5" /> Tickets ({filteredTickets.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                             {filteredTickets.length > 0 ? (
                                <div className="space-y-2">
                                    {filteredTickets.map(ticket => (
                                        <Link key={ticket.id} href="/dashboard" className="block p-3 rounded-lg hover:bg-secondary">
                                            <div className="flex items-center gap-2">
                                                <ChannelIcon channel={ticket.channel} />
                                                <p className="font-semibold">{ticket.subject}</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1 truncate">{ticket.messages[ticket.messages.length - 1].text}</p>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No tickets found.</p>
                            )}
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Customers ({filteredCustomers.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                             {filteredCustomers.length > 0 ? (
                                <div className="space-y-2">
                                    {filteredCustomers.map(customer => (
                                        <Link key={customer.id} href="/dashboard/customers" className="block p-3 rounded-lg hover:bg-secondary">
                                            <p className="font-semibold">{customer.name}</p>
                                            <p className="text-sm text-muted-foreground">{customer.email}</p>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No customers found.</p>
                            )}
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Knowledge Base ({filteredArticles.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                             {filteredArticles.length > 0 ? (
                                <div className="space-y-2">
                                    {filteredArticles.map(article => (
                                        <Link key={article.id} href="/dashboard/knowledge" className="block p-3 rounded-lg hover:bg-secondary">
                                            <p className="font-semibold">{article.title}</p>
                                            <p className="text-sm text-muted-foreground">{article.category}</p>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No articles found.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
