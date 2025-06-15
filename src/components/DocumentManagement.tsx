
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Image, 
  File, 
  Download, 
  Share, 
  Trash2, 
  Search,
  Folder,
  Plus
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'invoice' | 'photo' | 'plan' | 'other';
  size: string;
  uploadDate: string;
  project?: string;
  customer?: string;
  tags: string[];
}

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Kitchen_Renovation_Contract.pdf',
    type: 'contract',
    size: '2.4 MB',
    uploadDate: '2024-12-15',
    project: 'Kitchen Renovation',
    customer: 'John Smith',
    tags: ['contract', 'signed']
  },
  {
    id: '2',
    name: 'Before_Photos_Bathroom.zip',
    type: 'photo',
    size: '15.2 MB',
    uploadDate: '2024-12-14',
    project: 'Bathroom Repair',
    customer: 'ABC Construction',
    tags: ['before', 'photos']
  },
  {
    id: '3',
    name: 'Invoice_INV-2024-001.pdf',
    type: 'invoice',
    size: '1.1 MB',
    uploadDate: '2024-12-13',
    project: 'Deck Installation',
    customer: 'Sarah Johnson',
    tags: ['invoice', 'sent']
  },
  {
    id: '4',
    name: 'Building_Plans_v2.dwg',
    type: 'plan',
    size: '8.7 MB',
    uploadDate: '2024-12-12',
    project: 'Kitchen Renovation',
    customer: 'John Smith',
    tags: ['plans', 'approved']
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'contract':
    case 'invoice':
      return <FileText className="h-4 w-4" />;
    case 'photo':
      return <Image className="h-4 w-4" />;
    case 'plan':
      return <File className="h-4 w-4" />;
    default:
      return <File className="h-4 w-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'contract': return 'bg-blue-100 text-blue-800';
    case 'invoice': return 'bg-green-100 text-green-800';
    case 'photo': return 'bg-purple-100 text-purple-800';
    case 'plan': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const DocumentManagement = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.project?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Document Management</h2>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="contract">Contracts</SelectItem>
                <SelectItem value="invoice">Invoices</SelectItem>
                <SelectItem value="photo">Photos</SelectItem>
                <SelectItem value="plan">Plans</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="grid" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getFileIcon(doc.type)}
                      <Badge className={getTypeColor(doc.type)} variant="secondary">
                        {doc.type}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-sm mb-2 line-clamp-2">{doc.name}</h4>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>Size: {doc.size}</p>
                    <p>Uploaded: {doc.uploadDate}</p>
                    {doc.customer && <p>Customer: {doc.customer}</p>}
                    {doc.project && <p>Project: {doc.project}</p>}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {doc.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{doc.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>{doc.uploadDate}</span>
                          {doc.project && <span>{doc.project}</span>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(doc.type)} variant="secondary">
                        {doc.type}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="folders" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Folder className="h-12 w-12 mx-auto mb-3 text-blue-600" />
                <h3 className="font-medium mb-1">Contracts</h3>
                <p className="text-sm text-muted-foreground">15 documents</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Folder className="h-12 w-12 mx-auto mb-3 text-green-600" />
                <h3 className="font-medium mb-1">Invoices</h3>
                <p className="text-sm text-muted-foreground">8 documents</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Folder className="h-12 w-12 mx-auto mb-3 text-purple-600" />
                <h3 className="font-medium mb-1">Project Photos</h3>
                <p className="text-sm text-muted-foreground">32 documents</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Folder className="h-12 w-12 mx-auto mb-3 text-orange-600" />
                <h3 className="font-medium mb-1">Building Plans</h3>
                <p className="text-sm text-muted-foreground">12 documents</p>
              </CardContent>
            </Card>
            
            <Card className="border-dashed border-2 hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Plus className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                <h3 className="font-medium mb-1">Create Folder</h3>
                <p className="text-sm text-muted-foreground">Organize your documents</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
