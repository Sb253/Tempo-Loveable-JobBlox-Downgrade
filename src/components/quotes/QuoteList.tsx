
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Send, CheckCircle, Clock, XCircle, DollarSign, Calendar } from "lucide-react";

interface QuoteListProps {
  searchTerm: string;
  onSelectQuote: (quote: any) => void;
}

export const QuoteList = ({ searchTerm, onSelectQuote }: QuoteListProps) => {
  const quotes = [
    {
      id: '1',
      quoteNumber: 'QTE-2024-001',
      customer: 'John Smith',
      projectTitle: 'Kitchen Renovation',
      amount: 25000,
      status: 'pending',
      createdAt: '2024-06-10',
      validUntil: '2024-07-10'
    },
    {
      id: '2',
      quoteNumber: 'QTE-2024-002',
      customer: 'ABC Construction',
      projectTitle: 'Office Remodel',
      amount: 45000,
      status: 'approved',
      createdAt: '2024-06-08',
      validUntil: '2024-07-08'
    },
    {
      id: '3',
      quoteNumber: 'QTE-2024-003',
      customer: 'Sarah Johnson',
      projectTitle: 'Bathroom Upgrade',
      amount: 15000,
      status: 'rejected',
      createdAt: '2024-06-05',
      validUntil: '2024-07-05'
    },
    {
      id: '4',
      quoteNumber: 'QTE-2024-004',
      customer: 'Mike Wilson',
      projectTitle: 'Deck Construction',
      amount: 12000,
      status: 'sent',
      createdAt: '2024-06-12',
      validUntil: '2024-07-12'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
      case 'sent':
        return <Clock className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredQuotes = quotes.filter(quote =>
    quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredQuotes.map((quote) => (
        <Card key={quote.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{quote.quoteNumber}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {quote.customer} • {quote.projectTitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(quote.status)}>
                  {getStatusIcon(quote.status)}
                  <span className="ml-1 capitalize">{quote.status}</span>
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    Amount
                  </p>
                  <p className="font-semibold">${quote.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Created
                  </p>
                  <p className="font-medium">{new Date(quote.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Valid Until
                  </p>
                  <p className="font-medium">{new Date(quote.validUntil).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" onClick={() => onSelectQuote(quote)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                {quote.status === 'pending' && (
                  <Button size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
