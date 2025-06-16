
export interface DocumentTemplate {
  id: string;
  name: string;
  type: 'estimate' | 'invoice' | 'proposal' | 'report';
  description: string;
  category: string;
}
