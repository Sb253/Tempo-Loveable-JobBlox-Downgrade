
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ExpenseFormProps {
  onClose: () => void;
  expense?: any;
}

export const ExpenseForm = ({ onClose, expense }: ExpenseFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    description: expense?.description || '',
    amount: expense?.amount || '',
    category: expense?.category || '',
    date: expense?.date || new Date().toISOString().split('T')[0],
    vendor: expense?.vendor || '',
    jobReference: expense?.jobReference || '',
    receipt: expense?.receipt || '',
    notes: expense?.notes || ''
  });

  const expenseCategories = [
    'Materials',
    'Labor',
    'Equipment',
    'Transportation',
    'Permits',
    'Insurance',
    'Office Supplies',
    'Marketing',
    'Professional Services',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Saving expense:', formData);
    
    toast({
      title: expense ? "Expense Updated" : "Expense Added",
      description: `Expense for ${formData.description} has been ${expense ? 'updated' : 'added'} successfully.`,
    });
    
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{expense ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Expense description"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendor">Vendor/Supplier</Label>
            <Input
              id="vendor"
              value={formData.vendor}
              onChange={(e) => handleChange('vendor', e.target.value)}
              placeholder="Vendor name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobReference">Job Reference</Label>
            <Input
              id="jobReference"
              value={formData.jobReference}
              onChange={(e) => handleChange('jobReference', e.target.value)}
              placeholder="Related job or project"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receipt">Receipt/Document</Label>
            <Input
              id="receipt"
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => handleChange('receipt', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Additional notes"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {expense ? 'Update Expense' : 'Add Expense'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
