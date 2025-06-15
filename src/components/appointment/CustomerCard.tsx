
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Phone, MessageCircle, MapPin } from "lucide-react";

interface CustomerCardProps {
  customer: string;
  address: string;
  phone: string;
  email: string;
}

export const CustomerCard = ({ customer, address, phone, email }: CustomerCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <User className="h-5 w-5" />
          Customer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=200&fit=crop" 
            alt={`Property at ${address}`} 
            className="w-full h-40 object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
            $485,000
          </div>
          <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
            Built in 1985
          </div>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
            3 Beds | 2.5 Baths | 1850 Sq. ft.
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{customer}</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-8 px-3 rounded">
                <MessageCircle className="h-4 w-4 text-gray-600 mr-1" />
                <span className="text-xs">SMS</span>
              </Button>
              <Button size="sm" variant="outline" className="h-8 px-3 rounded">
                <MessageCircle className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-xs">Email</span>
              </Button>
              <Button size="sm" variant="outline" className="h-8 px-3 rounded">
                <Phone className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-xs">Call</span>
              </Button>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-gray-500 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium">{address}</p>
              <p className="text-sm text-gray-500">Seattle, WA, 98112</p>
            </div>
            <Button size="sm" variant="outline" className="h-8 px-3 rounded">
              <MapPin className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-xs">Navigate</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
