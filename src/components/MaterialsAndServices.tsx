
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Wrench, TrendingUp, AlertTriangle, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const MaterialsAndServices = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Materials & Services</h2>
          <p className="text-muted-foreground">Manage inventory, services, and pricing</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Material
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search materials and services..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">All Items</Badge>
          <Badge variant="outline">Low Stock</Badge>
          <Badge variant="outline">Services</Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Services</p>
                <p className="text-2xl font-bold">42</p>
              </div>
              <Wrench className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">$24.5K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "2x4 Lumber", stock: 45, unit: "pieces", price: "$3.50" },
                { name: "Concrete Mix", stock: 12, unit: "bags", price: "$4.25" },
                { name: "Roofing Shingles", stock: 8, unit: "bundles", price: "$89.99" },
                { name: "PVC Pipe 4\"", stock: 25, unit: "feet", price: "$2.15" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.stock} {item.unit} in stock</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{item.price}</p>
                    <Badge variant={item.stock < 10 ? "destructive" : "secondary"}>
                      {item.stock < 10 ? "Low" : "In Stock"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Catalog</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Electrical Installation", category: "Electrical", rate: "$85/hr" },
                { name: "Plumbing Repair", category: "Plumbing", rate: "$75/hr" },
                { name: "Drywall Installation", category: "Construction", rate: "$65/hr" },
                { name: "HVAC Maintenance", category: "HVAC", rate: "$90/hr" }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{service.rate}</p>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
