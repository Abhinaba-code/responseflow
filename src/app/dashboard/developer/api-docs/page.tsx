
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function CodeBlock({ code, lang = 'json' }: { code: string; lang?: string; }) {
  return (
    <pre className={`bg-secondary p-4 rounded-md text-sm overflow-x-auto language-${lang}`}>
      <code>{code}</code>
    </pre>
  );
}

const getTicketsResponse = `{
  "data": [
    {
      "id": "tkt-001",
      "subject": "My order #512 hasn't arrived yet",
      "channel": "twitter",
      "status": "Open",
      "priority": "P0"
    }
  ],
  "has_more": true
}`;

const createCustomerRequest = `{
  "name": "John Doe",
  "email": "john.doe@example.com"
}`;

const createCustomerResponse = `{
  "id": "cust-123",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "totalTickets": 0,
  "openTickets": 0
}`;

export default function ApiDocsPage() {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold">API Documentation</h1>
                <p className="text-muted-foreground mt-2">Welcome to the ResponseFlow API. Here you'll find all the information you need to integrate your services with ours.</p>
            </div>

            <Separator />

            <section id="authentication">
                <h2 className="text-2xl font-semibold">Authentication</h2>
                <p className="text-muted-foreground mt-2">
                    All API requests must be authenticated using an API key. Provide your key in the <code className="bg-secondary px-1 py-0.5 rounded">Authorization</code> header as a Bearer token.
                </p>
                <CodeBlock code="Authorization: Bearer YOUR_API_KEY" lang="bash" />
            </section>

            <Separator />
            
            <section id="tickets" className="space-y-6">
                <h2 className="text-2xl font-semibold">Tickets API</h2>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-4">
                            <Badge variant="outline" className="text-green-500 border-green-500/50 text-base">GET</Badge>
                            <span>/api/v1/tickets</span>
                        </CardTitle>
                        <CardDescription>Retrieve a paginated list of tickets.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h4 className="font-semibold mb-2">Query Parameters</h4>
                        <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mb-4">
                           <li><code className="bg-secondary px-1 py-0.5 rounded">limit</code> (optional, integer, default: 20): The number of tickets to return.</li>
                           <li><code className="bg-secondary px-1 py-0.5 rounded">cursor</code> (optional, string): The cursor for the next page of results.</li>
                        </ul>

                        <h4 className="font-semibold mb-2">Example Response</h4>
                        <CodeBlock code={getTicketsResponse} />
                    </CardContent>
                </Card>
            </section>
            
            <Separator />

            <section id="customers" className="space-y-6">
                <h2 className="text-2xl font-semibold">Customers API</h2>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-4">
                            <Badge variant="outline" className="text-blue-500 border-blue-500/50 text-base">POST</Badge>
                            <span>/api/v1/customers</span>
                        </CardTitle>
                        <CardDescription>Create a new customer.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <h4 className="font-semibold mb-2">Request Body</h4>
                        <CodeBlock code={createCustomerRequest} />
                        
                        <h4 className="font-semibold mt-4 mb-2">Example Response</h4>
                        <CodeBlock code={createCustomerResponse} />
                    </CardContent>
                </Card>
            </section>
        </div>
      </div>
    </div>
  );
}
