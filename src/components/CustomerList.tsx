
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Phone, Mail, MapPin } from "lucide-react";
import { CustomerForm } from "./CustomerForm";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  totalJobs: number;
  lastContact: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@email.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, ST 12345',
    status: 'active',
    totalJobs: 5,
    lastContact: '2024-12-15'
  },
  {
    id: '2',
    name: 'ABC Construction Inc.',
    email: 'contact@abcconstruction.com',
    phone: '(555) 987-6543',
    address: '456 Business Ave, City, ST 67890',
    status: 'active',
    totalJobs: 12,
    lastContact: '2024-12-14'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 456-7890',
    address: '789 Oak Drive, Hometown, ST 11111',
    status: 'inactive',
    totalJobs: 2,
    lastContact: '2024-12-10'
  }
];

export const CustomerList = () => {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomerForm, setShowCustomerForm] = useState(false);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Management</h2>
        <Button onClick={() => setShowCustomerForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Customers</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      {customer.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.totalJobs}</TableCell>
                  <TableCell>{new Date(customer.lastContact).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showCustomerForm && (
        <CustomerForm onClose={() => setShowCustomerForm(false)} />
      )}
    </div>
  );
};
