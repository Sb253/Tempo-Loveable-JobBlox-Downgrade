
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Users, TrendingUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { QuoteForm } from "./quotes/QuoteForm";
import { QuoteList } from "./quotes/QuoteList";
import { QuoteAnalytics } from "./quotes/QuoteAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const QuoteManagement = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);

  const stats = [
    { title: "Active Quotes", value: "24", icon: FileText, color: "text-blue-600" },
    { title: "Approval Rate", value: "78%", icon: TrendingUp, color: "text-green-600" },
    { title: "Pending Approval", value: "8", icon: Users, color: "text-orange-600" },
    { title: "This Month", value: "$145K", icon: TrendingUp, color: "text-purple-600" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales & Quoting</h2>
          <p className="text-muted-foreground">
            Create professional quotes with digital approval
          </p>
        </div>
        <Button onClick={() => setShowQuoteForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Quote
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="quotes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="quotes">All Quotes</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="quotes" className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quotes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <QuoteList searchTerm={searchTerm} onSelectQuote={setSelectedQuote} />
        </TabsContent>

        <TabsContent value="analytics">
          <QuoteAnalytics />
        </TabsContent>
      </Tabs>

      {showQuoteForm && (
        <QuoteForm 
          onClose={() => setShowQuoteForm(false)} 
          quote={selectedQuote}
        />
      )}
    </div>
  );
};
