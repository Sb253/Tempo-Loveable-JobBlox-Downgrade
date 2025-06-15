
import React from 'react';
import { useCompanyData } from "@/hooks/useCompanyData";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  markupType: 'flat' | 'percentage';
  markupValue: number;
  amount: number;
}

interface QuoteData {
  quoteNumber: string;
  customer: string;
  projectTitle: string;
  validUntil?: string;
  notes?: string;
  terms?: string;
  lineItems: LineItem[];
  subtotal: number;
  markup: number;
  total: number;
  images?: string[];
  attachments?: string[];
  requireDigitalApproval?: boolean;
  fontFamily?: string;
}

interface QuoteTemplateProps {
  data: QuoteData;
  template?: 'modern' | 'classic' | 'minimal';
}

export const QuoteTemplate: React.FC<QuoteTemplateProps> = ({ 
  data, 
  template = 'modern' 
}) => {
  const companyData = useCompanyData();

  const getFontClass = () => {
    switch (data.fontFamily) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'playfair': return 'font-playfair';
      case 'inter': return 'font-inter';
      case 'roboto': return 'font-roboto';
      default: return 'font-sans';
    }
  };

  const renderModernTemplate = () => (
    <div className={`bg-white p-8 max-w-4xl mx-auto ${getFontClass()}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          {companyData.logo && (
            <img src={companyData.logo} alt="Company Logo" className="h-16 w-auto object-contain" />
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">ESTIMATE</h1>
            <div className="w-20 h-1 bg-blue-600"></div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600 mb-2">#{data.quoteNumber}</div>
          {data.validUntil && (
            <div className="text-gray-600">
              Valid Until: {new Date(data.validUntil).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      {/* Company & Customer Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">From</h3>
          <div className="text-gray-600">
            <div className="font-semibold">{companyData.name}</div>
            <div>{companyData.address}</div>
            <div>{companyData.city}</div>
            <div>Phone: {companyData.phone}</div>
            <div>Email: {companyData.email}</div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimate For</h3>
          <div className="text-gray-600">
            <div className="font-semibold">{data.customer}</div>
            <div className="mt-2">
              <div className="font-medium text-gray-900">Project:</div>
              <div>{data.projectTitle}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-3 text-gray-900 font-semibold">Description</th>
              <th className="text-right py-3 text-gray-900 font-semibold w-20">Qty</th>
              <th className="text-right py-3 text-gray-900 font-semibold w-24">Rate</th>
              <th className="text-right py-3 text-gray-900 font-semibold w-24">Markup</th>
              <th className="text-right py-3 text-gray-900 font-semibold w-24">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-3 text-gray-700">{item.description}</td>
                <td className="py-3 text-right text-gray-700">{item.quantity}</td>
                <td className="py-3 text-right text-gray-700">${item.rate.toFixed(2)}</td>
                <td className="py-3 text-right text-gray-700">
                  {item.markupType === 'percentage' ? `${item.markupValue}%` : `$${item.markupValue}`}
                </td>
                <td className="py-3 text-right text-gray-700">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64">
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="text-gray-700">Subtotal:</span>
            <span className="text-gray-700">${data.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="text-gray-700">Total Markup:</span>
            <span className="text-gray-700">${data.markup.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-3 border-t-2 border-gray-300 font-bold text-lg">
            <span className="text-gray-900">Total Estimate:</span>
            <span className="text-blue-600">${data.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Digital Approval Section */}
      {data.requireDigitalApproval && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">Digital Approval Required</h4>
          <p className="text-blue-800 text-sm">
            This estimate requires your digital approval. You can approve this estimate through our customer portal or mobile app.
          </p>
        </div>
      )}

      {/* Notes & Terms */}
      {(data.notes || data.terms) && (
        <div className="border-t border-gray-300 pt-6">
          {data.notes && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
              <p className="text-gray-600">{data.notes}</p>
            </div>
          )}
          {data.terms && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
              <p className="text-gray-600">{data.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderClassicTemplate = () => (
    <div className={`bg-white p-8 max-w-4xl mx-auto border-2 border-gray-800 ${getFontClass()}`}>
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-gray-800 pb-4">
        {companyData.logo && (
          <img src={companyData.logo} alt="Company Logo" className="h-12 w-auto object-contain mx-auto mb-4" />
        )}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ESTIMATE</h1>
        <div className="text-xl text-gray-700">#{data.quoteNumber}</div>
      </div>

      {/* Company & Customer Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="border border-gray-400 p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">FROM</h3>
          <div className="text-gray-700">
            <div className="font-bold">{companyData.name}</div>
            <div>{companyData.address}</div>
            <div>{companyData.city}</div>
            <div>Phone: {companyData.phone}</div>
          </div>
        </div>
        <div className="border border-gray-400 p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">ESTIMATE FOR</h3>
          <div className="text-gray-700">
            <div className="font-bold">{data.customer}</div>
            <div className="mt-2">
              <div className="font-bold">Project:</div>
              <div>{data.projectTitle}</div>
            </div>
            {data.validUntil && (
              <div className="mt-2">
                <div>Valid Until: {new Date(data.validUntil).toLocaleDateString()}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-8">
        <table className="w-full border-2 border-gray-800">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="text-left py-3 px-4 font-bold">DESCRIPTION</th>
              <th className="text-center py-3 px-4 font-bold w-20">QTY</th>
              <th className="text-center py-3 px-4 font-bold w-24">RATE</th>
              <th className="text-center py-3 px-4 font-bold w-24">MARKUP</th>
              <th className="text-center py-3 px-4 font-bold w-24">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-3 px-4 border-b border-gray-300">{item.description}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">{item.quantity}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">${item.rate.toFixed(2)}</td>
                <td className="py-3 px-4 text-center border-b border-gray-300">
                  {item.markupType === 'percentage' ? `${item.markupValue}%` : `$${item.markupValue}`}
                </td>
                <td className="py-3 px-4 text-center border-b border-gray-300">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="flex justify-end mb-8">
        <div className="w-64 border-2 border-gray-800">
          <div className="bg-gray-800 text-white py-2 px-4 font-bold text-center">ESTIMATE TOTAL</div>
          <div className="p-4">
            <div className="flex justify-between py-1">
              <span>SUBTOTAL:</span>
              <span>${data.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>MARKUP:</span>
              <span>${data.markup.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-t font-bold text-lg">
              <span>TOTAL:</span>
              <span>${data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Approval Section */}
      {data.requireDigitalApproval && (
        <div className="border-2 border-blue-600 bg-blue-50 p-4 mb-6">
          <h4 className="font-bold text-blue-900 mb-2">DIGITAL APPROVAL REQUIRED</h4>
          <p className="text-blue-800 text-sm">
            This estimate requires your digital approval through our customer portal or mobile app.
          </p>
        </div>
      )}

      {/* Notes & Terms */}
      {(data.notes || data.terms) && (
        <div className="border-t-2 border-gray-800 pt-6">
          {data.notes && (
            <div className="mb-4">
              <h4 className="font-bold text-gray-900 mb-2">NOTES</h4>
              <p className="text-gray-700">{data.notes}</p>
            </div>
          )}
          {data.terms && (
            <div>
              <h4 className="font-bold text-gray-900 mb-2">TERMS & CONDITIONS</h4>
              <p className="text-gray-700">{data.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className={`bg-white p-8 max-w-4xl mx-auto ${getFontClass()}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          {companyData.logo && (
            <img src={companyData.logo} alt="Company Logo" className="h-12 w-auto object-contain" />
          )}
          <h1 className="text-5xl font-light text-gray-400">estimate</h1>
        </div>
        <div className="text-right">
          <div className="text-3xl font-light text-gray-900 mb-1">#{data.quoteNumber}</div>
          {data.validUntil && (
            <div className="text-sm text-gray-500">
              Valid until {new Date(data.validUntil).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>

      {/* Company & Customer Info */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <div className="text-sm text-gray-500 mb-2">FROM</div>
          <div className="text-gray-900">
            <div className="font-medium">{companyData.name}</div>
            <div className="text-sm text-gray-600 mt-1">
              <div>{companyData.address}</div>
              <div>{companyData.city}</div>
              <div>{companyData.phone}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-2">ESTIMATE FOR</div>
          <div className="text-gray-900">
            <div className="font-medium">{data.customer}</div>
            <div className="text-sm text-gray-600 mt-1">
              <div className="font-medium text-gray-900">Project:</div>
              <div>{data.projectTitle}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-12">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 text-sm text-gray-500 font-normal">DESCRIPTION</th>
              <th className="text-right py-4 text-sm text-gray-500 font-normal w-20">QTY</th>
              <th className="text-right py-4 text-sm text-gray-500 font-normal w-24">RATE</th>
              <th className="text-right py-4 text-sm text-gray-500 font-normal w-24">MARKUP</th>
              <th className="text-right py-4 text-sm text-gray-500 font-normal w-24">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-4 text-gray-900">{item.description}</td>
                <td className="py-4 text-right text-gray-600">{item.quantity}</td>
                <td className="py-4 text-right text-gray-600">${item.rate.toFixed(2)}</td>
                <td className="py-4 text-right text-gray-600">
                  {item.markupType === 'percentage' ? `${item.markupValue}%` : `$${item.markupValue}`}
                </td>
                <td className="py-4 text-right text-gray-900">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="flex justify-end mb-12">
        <div className="w-64">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">${data.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Markup</span>
            <span className="text-gray-900">${data.markup.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-4 border-t border-gray-200 text-xl">
            <span className="text-gray-900">Total Estimate</span>
            <span className="text-gray-900 font-medium">${data.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Digital Approval Section */}
      {data.requireDigitalApproval && (
        <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-8">
          <div className="text-sm text-gray-500 mb-1">DIGITAL APPROVAL</div>
          <p className="text-gray-700 text-sm">
            This estimate requires your digital approval through our customer portal or mobile app.
          </p>
        </div>
      )}

      {/* Notes & Terms */}
      {(data.notes || data.terms) && (
        <div className="border-t border-gray-200 pt-8">
          {data.notes && (
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">NOTES</div>
              <p className="text-gray-700 text-sm">{data.notes}</p>
            </div>
          )}
          {data.terms && (
            <div>
              <div className="text-sm text-gray-500 mb-2">TERMS</div>
              <p className="text-gray-700 text-sm">{data.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  switch (template) {
    case 'classic':
      return renderClassicTemplate();
    case 'minimal':
      return renderMinimalTemplate();
    default:
      return renderModernTemplate();
  }
};
