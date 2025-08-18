import React from 'react';
import { X, Edit, Download, Receipt, CreditCard, Calendar, Truck, MapPin, Package, User, Building } from 'lucide-react';
import { formatCurrency } from '../../utils/numberGenerator';
import type { LoadingSlip } from '../../types';

interface LoadingSlipViewProps {
  slip: LoadingSlip;
  onClose: () => void;
  onEdit: () => void;
}

const LoadingSlipView: React.FC<LoadingSlipViewProps> = ({ slip, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Loading Slip Details</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Receipt className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Slip Number</span>
              </div>
              <p className="text-xl font-bold text-blue-900">{slip.slip_number}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Date</span>
              </div>
              <p className="text-xl font-bold text-green-900">
                {new Date(slip.date).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Package className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Total Freight</span>
              </div>
              <p className="text-xl font-bold text-purple-900">{formatCurrency(slip.total_freight)}</p>
            </div>
          </div>

          {/* Party and Vehicle Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Party Information</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{slip.party}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Truck className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Vehicle Number</span>
              </div>
              <p className="text-lg font-semibold text-gray-900">{slip.vehicle_no}</p>
            </div>
          </div>

          {/* Route Information */}
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-900">Route Information</span>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-sm text-orange-700">From:</span>
                <p className="font-semibold text-orange-900">{slip.from_location}</p>
              </div>
              <div className="text-orange-600">→</div>
              <div>
                <span className="text-sm text-orange-700">To:</span>
                <p className="font-semibold text-orange-900">{slip.to_location}</p>
              </div>
            </div>
          </div>

          {/* Supplier Information */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Building className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-900">Supplier Information</span>
            </div>
            <p className="text-lg font-semibold text-yellow-900">{slip.supplier}</p>
          </div>

          {/* Cargo Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Cargo Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimension:</span>
                  <span className="font-medium">{slip.dimension || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{slip.weight} MT</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Freight:</span>
                  <span className="font-medium">{formatCurrency(slip.freight)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Advance:</span>
                  <span className="font-medium">{formatCurrency(slip.advance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Balance:</span>
                  <span className="font-medium">{formatCurrency(slip.balance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">RTO:</span>
                  <span className="font-medium">{formatCurrency(slip.rto)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-900 font-semibold">Total Freight:</span>
                  <span className="font-bold text-green-600">{formatCurrency(slip.total_freight)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200">
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
              <Receipt className="w-4 h-4" />
              <span>Create Memo</span>
            </button>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Create Bill</span>
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSlipView;