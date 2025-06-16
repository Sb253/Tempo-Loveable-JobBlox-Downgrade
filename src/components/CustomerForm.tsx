
import { EnhancedCustomerForm } from './forms/EnhancedCustomerForm';
import { businessDataManager } from '../utils/businessDataManager';

interface CustomerFormProps {
  onClose: () => void;
  customer?: any;
}

export const CustomerForm = ({ onClose, customer }: CustomerFormProps) => {
  const handleSave = (customerData: any) => {
    if (customer) {
      businessDataManager.updateCustomer(customer.id, customerData);
    } else {
      businessDataManager.createCustomer(customerData);
    }
    onClose();
  };

  return (
    <EnhancedCustomerForm
      customer={customer}
      onSave={handleSave}
      onCancel={onClose}
    />
  );
};
