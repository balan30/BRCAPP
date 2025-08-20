import React, { useState } from 'react';
import { Upload, Search, FileImage, Download } from 'lucide-react';
import { useData } from '../context/DataContext';

const PODComponent: React.FC = () => {
  const { bills } = useData();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get all bills with POD images
  const billsWithPOD = bills.filter(bill => bill.pod_image);
  
  const filteredPODs = billsWithPOD.filter(bill =>
    bill.bill_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.party.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">POD (Proof of Delivery)</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Upload POD</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Bill No, Vehicle No, Party..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
        </div>
      </div>

      {/* POD Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">POD Images</h3>
        </div>
        <div className="p-6">
          {filteredPODs.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <FileImage className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No POD images found</p>
              <p className="text-sm">Upload POD images to attach with bills</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPODs.map((bill) => (
                <div key={bill.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{bill.bill_number}</h4>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{bill.party}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(bill.date).toLocaleDateString('en-IN')}
                  </p>
                  <div className="mt-3 bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                    <FileImage className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PODComponent;