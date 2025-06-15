
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ChevronRight, Edit } from "lucide-react";

export const LineItemsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Line Items
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="h-8 px-2 rounded hover:bg-gray-100">
              <ChevronRight className="h-4 w-4 text-blue-600" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 px-2 rounded hover:bg-gray-100">
              <Edit className="h-4 w-4 text-blue-600" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Services</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">Standard Install Package: #2</div>
                <div className="text-sm text-gray-500">Qty 1 @ $6,200.00/Each</div>
                <div className="text-sm text-gray-600">Tear out and removal of existing standard tub or shower system without...</div>
              </div>
              <div className="font-medium">$6,200.00</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Materials</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">MileStone Bath Systems - Bella Stone™ Smooth Marble Full Bath...</div>
                <div className="text-sm text-gray-500">Qty 1 @ $2,450.25/Each</div>
                <div className="text-sm text-gray-600">High quality acrylic walls are high-gloss and UV protected against yellowing. ...</div>
              </div>
              <div className="font-medium">$2,450.25</div>
            </div>
            
            <div className="flex justify-between">
              <div>
                <div className="font-medium">60x30 21" Tub</div>
                <div className="text-sm text-gray-500">Qty 1 @ $2,509.99/Each</div>
                <div className="text-sm text-gray-600">White L</div>
              </div>
              <div className="font-medium">$2,509.99</div>
            </div>
            
            <div className="flex justify-between">
              <div>
                <div className="font-medium">Tru-Temp Pressure Balance 1/2" Rough-In Valve - Tru-Temp Pressure...</div>
                <div className="text-sm text-gray-500">Qty 1 @ $291.38/Each</div>
                <div className="text-sm text-gray-600">PULSE ShowerSpas Tru-Temp Pressure Balance Rough-In Valve with Trim Kit utili...</div>
              </div>
              <div className="font-medium">$291.38</div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium">$12,899.62</span>
          </div>
          
          <div className="flex justify-between">
            <div>
              <div>Discount</div>
              <div className="text-sm text-gray-500">Seattle Home Show ($2,000.00)</div>
            </div>
            <span className="font-medium">-$2,000.00</span>
          </div>
          
          <div className="flex justify-between">
            <div>
              <div>Tax</div>
              <div className="text-sm text-gray-500">King County (10.5%)</div>
            </div>
            <span className="font-medium">$1,144.46</span>
          </div>
          
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total</span>
            <span>$12,044.08</span>
          </div>
          
          <div className="flex justify-between border-t pt-2">
            <div>
              <div>Deposit</div>
              <div className="text-sm text-gray-500">Due on 3/13</div>
            </div>
            <span className="font-medium">$6,298.29</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
