import React from 'react';
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { ExternalLink } from "lucide-react";

interface EstimateLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface EstimateData {
  estimateNumber: string;
  customer: string;
  jobReference?: string;
  issueDate: string;
  validUntil: string;
  notes?: string;
  terms?: string;
  lineItems: EstimateLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  discountType?: string;
  discountValue?: number;
  discount?: number;
  fontFamily?: string;
}

interface EstimateTemplateProps {
  data: EstimateData;
  template?: 'modern' | 'classic' | 'minimal' | 'contemporary';
}

export const EstimateTemplate: React.FC<EstimateTemplateProps> = ({ 
  data, 
  template = 'modern' 
}) => {
  const companySettings = useCompanySettings();

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

  const renderCompanyInfo = () => (
    <div className="space-y-1">
      <div className="font-semibold">{companySettings.companyName}</div>
      {companySettings.showAddress && (
        <>
          <div>{companySettings.businessAddress}</div>
          <div>{companySettings.city}, {companySettings.state} {companySettings.zipCode}</div>
        </>
      )}
      <div>Phone: {companySettings.phone}</div>
      {companySettings.showEmail && <div>Email: {companySettings.email}</div>}
      {companySettings.showWebsite && <div>Website: {companySettings.website}</div>}
    </div>
  );

  const renderLicenseInfo = () => {
    if (!companySettings.showLicense && !companySettings.showInsurance && !companySettings.showBonded) {
      return null;
    }

    return (
      <div className="mt-4 text-sm space-y-1">
        {companySettings.showLicense && (
          <>
            <div>Business License: {companySettings.businessLicense}</div>
            <div>Contractor License: {companySettings.contractorLicense}</div>
            <div>State License: {companySettings.stateLicense}</div>
          </>
        )}
        {companySettings.showInsurance && (
          <div>Insurance Policy: {companySettings.insurancePolicy}</div>
        )}
        {companySettings.showBonded && companySettings.bonded && (
          <div className="font-medium text-green-700">✓ Licensed, Bonded & Insured</div>
        )}
      </div>
    );
  };

  const renderClientPortalLink = () => (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-purple-900 mb-1">Client Portal Preview</h4>
          <p className="text-purple-800 text-sm">
            Once approved, access your project portal for real-time updates and communication.
          </p>
        </div>
        <div className="flex items-center gap-2 text-purple-600 font-medium">
          <ExternalLink className="h-4 w-4" />
          <span>Portal Info</span>
        </div>
      </div>
    </div>
  );

  const renderModernTemplate = () => (
    <div className={`bg-white p-8 max-w-4xl mx-auto ${getFontClass()}`}>
      {/* Header with gradient */}
      <div className="flex justify-between items-start mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg -z-10"></div>
        <div className="flex items-center gap-4 p-6">
          {companySettings.logo && (
            <img src={companySettings.logo} alt="Company Logo" className="h-16 w-auto object-contain" />
          )}
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">ESTIMATE</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
          </div>
        </div>
        <div className="text-right p-6">
          <div className="text-2xl font-bold text-gray-800 mb-2">#{data.estimateNumber}</div>
          <div className="text-gray-600 space-y-1">
            <div>Date: {new Date(data.issueDate).toLocaleDateString()}</div>
            <div>Valid Until: {new Date(data.validUntil).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Client Portal Link */}
      {renderClientPortalLink()}

      {/* Company & Customer Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">From</h3>
          <div className="text-gray-700">
            {renderCompanyInfo()}
            {renderLicenseInfo()}
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimate For</h3>
          <div className="text-gray-700">
            <div className="font-semibold">{data.customer}</div>
            {data.jobReference && <div>Project: {data.jobReference}</div>}
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <tr>
              <th className="text-left py-4 px-4 font-semibold">Description</th>
              <th className="text-right py-4 px-4 font-semibold w-20">Qty</th>
              <th className="text-right py-4 px-4 font-semibold w-24">Rate</th>
              <th className="text-right py-4 px-4 font-semibold w-24">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-4 px-4 text-gray-800">{item.description}</td>
                <td className="py-4 px-4 text-right text-gray-600">{item.quantity}</td>
                <td className="py-4 px-4 text-right text-gray-600">${item.rate.toFixed(2)}</td>
                <td className="py-4 px-4 text-right text-gray-800 font-medium">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border">
          <div className="space-y-2">
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900">${data.subtotal.toFixed(2)}</span>
            </div>
            {data.discount && data.discount > 0 && (
              <div className="flex justify-between py-1 text-red-600">
                <span>Discount:</span>
                <span>-${data.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Tax:</span>
              <span className="text-gray-900">${data.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-gray-300 font-bold text-lg">
              <span className="text-gray-900">Total Estimate:</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(data.notes || data.terms) && (
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-l-4 border-blue-500">
          {data.notes && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
              <p className="text-gray-700">{data.notes}</p>
            </div>
          )}
          {data.terms && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
              <p className="text-gray-700">{data.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderClassicTemplate = () => (
    <div className={`bg-white p-8 max-w-4xl mx-auto border-4 border-gray-800 ${getFontClass()}`}>
      {/* Header */}
      <div className="text-center mb-8 border-b-4 border-gray-800 pb-6">
        {companySettings.logo && (
          <img src={companySettings.logo} alt="Company Logo" className="h-16 w-auto object-contain mx-auto mb-4" />
        )}
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-wide">ESTIMATE</h1>
        <div className="text-xl text-gray-700 font-semibold">#{data.estimateNumber}</div>
      </div>

      {/* Client Portal Link */}
      <div className="border-2 border-purple-600 bg-purple-50 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-purple-900 mb-1">CLIENT PORTAL</h4>
            <p className="text-purple-800 text-sm">
              Project portal access available upon approval.
            </p>
          </div>
          <div className="flex items-center gap-2 text-purple-600 font-bold">
            <ExternalLink className="h-4 w-4" />
            <span>PORTAL</span>
          </div>
        </div>
      </div>

      {/* Company & Customer Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="border-2 border-gray-600 p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-600 pb-1">FROM</h3>
          <div className="text-gray-800">
            {renderCompanyInfo()}
            {renderLicenseInfo()}
          </div>
        </div>
        <div className="border-2 border-gray-600 p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-3 border-b-2 border-gray-600 pb-1">ESTIMATE FOR</h3>
          <div className="text-gray-800 space-y-1">
            <div className="font-bold">{data.customer}</div>
            {data.jobReference && <div>Project: {data.jobReference}</div>}
            <div className="mt-3 space-y-1">
              <div>Date: {new Date(data.issueDate).toLocaleDateString()}</div>
              <div>Valid Until: {new Date(data.validUntil).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-8">
        <table className="w-full border-4 border-gray-800">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="text-left py-4 px-4 font-bold">DESCRIPTION</th>
              <th className="text-center py-4 px-4 font-bold w-20">QTY</th>
              <th className="text-center py-4 px-4 font-bold w-24">RATE</th>
              <th className="text-center py-4 px-4 font-bold w-24">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="py-4 px-4 border-b-2 border-gray-400 font-medium">{item.description}</td>
                <td className="py-4 px-4 text-center border-b-2 border-gray-400">{item.quantity}</td>
                <td className="py-4 px-4 text-center border-b-2 border-gray-400">${item.rate.toFixed(2)}</td>
                <td className="py-4 px-4 text-center border-b-2 border-gray-400 font-bold">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 border-4 border-gray-800">
          <div className="bg-gray-800 text-white py-3 px-4 font-bold text-center text-lg">ESTIMATE TOTAL</div>
          <div className="p-4 space-y-2">
            <div className="flex justify-between py-1">
              <span className="font-medium">Subtotal:</span>
              <span className="font-bold">${data.subtotal.toFixed(2)}</span>
            </div>
            {data.discount && data.discount > 0 && (
              <div className="flex justify-between py-1 text-red-600">
                <span className="font-medium">Discount:</span>
                <span className="font-bold">-${data.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-1">
              <span className="font-medium">Tax:</span>
              <span className="font-bold">${data.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 border-t-4 border-gray-800 font-bold text-xl">
              <span>TOTAL:</span>
              <span>${data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(data.notes || data.terms) && (
        <div className="border-t-4 border-gray-800 pt-6">
          {data.notes && (
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-2 text-lg">NOTES</h4>
              <p className="text-gray-800 font-medium">{data.notes}</p>
            </div>
          )}
          {data.terms && (
            <div>
              <h4 className="font-bold text-gray-900 mb-2 text-lg">TERMS & CONDITIONS</h4>
              <p className="text-gray-800 font-medium">{data.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className={`bg-white p-8 max-w-4xl mx-auto ${getFontClass()}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-12 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-6xl font-thin text-gray-300 mb-2">estimate</h1>
          <div className="w-16 h-0.5 bg-gray-900"></div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-light text-gray-900 mb-1">#{data.estimateNumber}</div>
          <div className="text-sm text-gray-500 space-y-1">
            <div>{new Date(data.issueDate).toLocaleDateString()}</div>
            <div>Valid until {new Date(data.validUntil).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Client Portal Link */}
      <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500 mb-1">CLIENT PORTAL</div>
            <p className="text-gray-700 text-sm">
              Project portal access available upon estimate approval
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <ExternalLink className="h-4 w-4" />
            <span className="text-sm">Portal Access</span>
          </div>
        </div>
      </div>

      {/* Company & Customer Info */}
      <div className="grid grid-cols-2 gap-16 mb-16">
        <div>
          <div className="text-xs text-gray-400 mb-3 tracking-widest uppercase">From</div>
          <div className="text-gray-900 space-y-1">
            {renderCompanyInfo()}
            {renderLicenseInfo()}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-3 tracking-widest uppercase">Estimate For</div>
          <div className="text-gray-900">
            <div className="font-medium text-lg">{data.customer}</div>
            {data.jobReference && <div className="text-sm text-gray-600 mt-1">Project: {data.jobReference}</div>}
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-16">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 text-xs text-gray-400 font-normal tracking-widest uppercase">Description</th>
              <th className="text-right py-4 text-xs text-gray-400 font-normal tracking-widest uppercase w-20">Qty</th>
              <th className="text-right py-4 text-xs text-gray-400 font-normal tracking-widest uppercase w-24">Rate</th>
              <th className="text-right py-4 text-xs text-gray-400 font-normal tracking-widest uppercase w-24">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-6 text-gray-900 font-light">{item.description}</td>
                <td className="py-6 text-right text-gray-600 font-light">{item.quantity}</td>
                <td className="py-6 text-right text-gray-600 font-light">${item.rate.toFixed(2)}</td>
                <td className="py-6 text-right text-gray-900 font-medium">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-16">
        <div className="w-80">
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-500 font-light">Subtotal</span>
              <span className="text-gray-900 font-light">${data.subtotal.toFixed(2)}</span>
            </div>
            {data.discount && data.discount > 0 && (
              <div className="flex justify-between py-2 text-red-500">
                <span className="font-light">Discount</span>
                <span className="font-light">-${data.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-2">
              <span className="text-gray-500 font-light">Tax</span>
              <span className="text-gray-900 font-light">${data.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-4 border-t border-gray-200 text-2xl">
              <span className="text-gray-900 font-light">Total</span>
              <span className="text-gray-900 font-medium">${data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(data.notes || data.terms) && (
        <div className="border-t border-gray-200 pt-12">
          {data.notes && (
            <div className="mb-8">
              <div className="text-xs text-gray-400 mb-3 tracking-widest uppercase">Notes</div>
              <p className="text-gray-700 font-light leading-relaxed">{data.notes}</p>
            </div>
          )}
          {data.terms && (
            <div>
              <div className="text-xs text-gray-400 mb-3 tracking-widest uppercase">Terms</div>
              <p className="text-gray-700 font-light leading-relaxed">{data.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderContemporaryTemplate = () => (
    <div className={`bg-white p-8 max-w-4xl mx-auto ${getFontClass()}`} style={{ 
      '--primary': companySettings.primaryColor,
      '--secondary': companySettings.secondaryColor,
      '--accent': companySettings.accentColor
    } as React.CSSProperties}>
      {/* Header */}
      <div className="flex justify-between items-start mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r opacity-5 rounded-lg -z-10" style={{
          background: `linear-gradient(135deg, ${companySettings.primaryColor}, ${companySettings.secondaryColor})`
        }}></div>
        <div className="flex items-center gap-6 p-6 z-10">
          {companySettings.logo && (
            <img src={companySettings.logo} alt="Company Logo" className="h-20 w-auto object-contain" />
          )}
          <div>
            <h1 className="text-5xl font-light mb-3" style={{ color: companySettings.primaryColor }}>ESTIMATE</h1>
            <div className="w-24 h-1 rounded-full" style={{ backgroundColor: companySettings.accentColor }}></div>
          </div>
        </div>
        <div className="text-right p-6 z-10">
          <div className="text-3xl font-light mb-3" style={{ color: companySettings.secondaryColor }}>#{data.estimateNumber}</div>
          <div className="text-gray-600 space-y-2 text-sm">
            <div>Issued: {new Date(data.issueDate).toLocaleDateString()}</div>
            <div>Valid Until: {new Date(data.validUntil).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Client Portal Link */}
      <div className="rounded-xl p-6 mb-8 border-l-4" style={{ 
        borderLeftColor: companySettings.accentColor,
        backgroundColor: `${companySettings.accentColor}08`
      }}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold mb-2" style={{ color: companySettings.primaryColor }}>Client Portal Access</h4>
            <p className="text-gray-700 text-sm">
              Upon approval, you'll receive access to your personalized project portal.
            </p>
          </div>
          <div className="flex items-center gap-2 font-medium" style={{ color: companySettings.secondaryColor }}>
            <ExternalLink className="h-5 w-5" />
            <span>Portal Info</span>
          </div>
        </div>
      </div>

      {/* Company & Customer Info */}
      <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="relative p-6 rounded-lg border-l-4" style={{ 
          borderLeftColor: companySettings.primaryColor,
          backgroundColor: `${companySettings.primaryColor}08`
        }}>
          <h3 className="text-lg font-medium mb-4" style={{ color: companySettings.primaryColor }}>From</h3>
          <div className="text-gray-800 space-y-1">
            {renderCompanyInfo()}
            {renderLicenseInfo()}
          </div>
        </div>
        <div className="relative p-6 rounded-lg border-l-4" style={{ 
          borderLeftColor: companySettings.secondaryColor,
          backgroundColor: `${companySettings.secondaryColor}08`
        }}>
          <h3 className="text-lg font-medium mb-4" style={{ color: companySettings.secondaryColor }}>Estimate For</h3>
          <div className="text-gray-800">
            <div className="font-semibold text-lg">{data.customer}</div>
            {data.jobReference && <div className="text-gray-600 mt-2">Project: {data.jobReference}</div>}
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-12 bg-white rounded-xl shadow-lg border overflow-hidden">
        <table className="w-full">
          <thead style={{ backgroundColor: companySettings.primaryColor }}>
            <tr className="text-white">
              <th className="text-left py-6 px-6 font-medium">Description</th>
              <th className="text-right py-6 px-6 font-medium w-20">Qty</th>
              <th className="text-right py-6 px-6 font-medium w-24">Rate</th>
              <th className="text-right py-6 px-6 font-medium w-24">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.lineItems.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-5 px-6 text-gray-800 font-medium">{item.description}</td>
                <td className="py-5 px-6 text-right text-gray-600">{item.quantity}</td>
                <td className="py-5 px-6 text-right text-gray-600">${item.rate.toFixed(2)}</td>
                <td className="py-5 px-6 text-right text-gray-900 font-medium">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-80 rounded-xl shadow-lg border overflow-hidden">
          <div className="py-4 px-6 text-white font-medium text-center" style={{ backgroundColor: companySettings.secondaryColor }}>
            ESTIMATE SUMMARY
          </div>
          <div className="p-6 space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-900 font-medium">${data.subtotal.toFixed(2)}</span>
            </div>
            {data.discount && data.discount > 0 && (
              <div className="flex justify-between py-2" style={{ color: companySettings.accentColor }}>
                <span>Discount:</span>
                <span className="font-medium">-${data.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax:</span>
              <span className="text-gray-900 font-medium">${data.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-4 border-t-2 font-bold text-xl" style={{ borderColor: companySettings.primaryColor }}>
              <span className="text-gray-900">Total Estimate:</span>
              <span style={{ color: companySettings.primaryColor }}>${data.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(data.notes || data.terms) && (
        <div className="rounded-xl p-8 border-l-4" style={{ 
          borderLeftColor: companySettings.accentColor,
          backgroundColor: `${companySettings.accentColor}08`
        }}>
          {data.notes && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3" style={{ color: companySettings.primaryColor }}>Notes</h4>
              <p className="text-gray-700 leading-relaxed">{data.notes}</p>
            </div>
          )}
          {data.terms && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3" style={{ color: companySettings.primaryColor }}>Terms & Conditions</h4>
              <p className="text-gray-700 leading-relaxed">{data.terms}</p>
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
    case 'contemporary':
      return renderContemporaryTemplate();
    default:
      return renderModernTemplate();
  }
};
