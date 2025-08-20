import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Plus } from 'lucide-react';
import { generateSlipNumber } from '../../utils/numberGenerator';
import { formatCurrency } from '../../utils/numberGenerator';
import { useData } from '../../context/DataContext';
import PartyForm from './PartyForm';
import SupplierForm from './SupplierForm';
import type { LoadingSlip } from '../../types';

interface LoadingSlipFormProps {
  initialData?: LoadingSlip | null;
  onSubmit: (data: Omit<LoadingSlip, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

const LoadingSlipForm: React.FC<LoadingSlipFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const { parties, suppliers, setParties, setSuppliers, loadingSlips } = useData();
  
  const [showPartyForm, setShowPartyForm] = useState(false);
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  
  // Sample data for autocomplete - in real app, this would come from database
  const partyNames = parties.map(p => p.name);
  const supplierNames = suppliers.map(s => s.name);
  
  const [vehicles] = useState([
    'GJ27TG5772', 
    'DD01S9823', 
    'MH12AB1234', 
    'RJ14CD5678',
    'GJ01AB1234',
    'MH14CD5678',
    'DL08EF9012',
    'KA05GH3456',
    'TN09IJ7890',
    'UP16KL2345'
  ]);
  
  const [showPartyDropdown, setShowPartyDropdown] = useState(false);
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false);
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  
  const [formData, setFormData] = useState({
    slip_number: initialData?.slip_number || generateSlipNumber(),
    date: new Date().toISOString().split('T')[0],
    party: '',
    vehicle_no: '',
    from_location: '',
    to_location: '',
    dimension: '',
    weight: 0,
    supplier: '',
    freight: 0,
    advance: 0,
    rto: 0,
  });

  // Validate slip number uniqueness
  const validateSlipNumber = (number: string) => {
    const existingNumbers = loadingSlips.map(slip => slip.slip_number);
    return !existingNumbers.includes(number) || number === initialData?.slip_number;
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        slip_number: initialData.slip_number,
        date: initialData.date.split('T')[0],
        party: initialData.party,
        vehicle_no: initialData.vehicle_no,
        from_location: initialData.from_location,
        to_location: initialData.to_location,
        dimension: initialData.dimension,
        weight: initialData.weight,
        supplier: initialData.supplier,
        freight: initialData.freight,
        advance: initialData.advance,
        rto: initialData.rto,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate slip number
    if (!validateSlipNumber(formData.slip_number)) {
      alert('Slip number already exists. Please use a different number.');
      return;
    }
    
    const balance = formData.freight - formData.advance;
    const total_freight = formData.freight + formData.rto;
    
    onSubmit({
      ...formData,
      balance,
      total_freight,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handlePartySelect = (party: string) => {
    setFormData(prev => ({ ...prev, party }));
    setShowPartyDropdown(false);
  };

  const handleSupplierSelect = (supplier: string) => {
    setFormData(prev => ({ ...prev, supplier }));
    setShowSupplierDropdown(false);
  };

  const handleVehicleSelect = (vehicle: string) => {
    setFormData(prev => ({ ...prev, vehicle_no: vehicle }));
    setShowVehicleDropdown(false);
  };

  const handleCreateParty = (partyData: { name: string; address?: string; contact?: string }) => {
    const newParty = {
      id: Date.now().toString(),
      ...partyData,
      created_at: new Date().toISOString(),
    };
    setParties(prev => [...prev, newParty]);
    setFormData(prev => ({ ...prev, party: newParty.name }));
    setShowPartyForm(false);
  };

  const handleCreateSupplier = (supplierData: { name: string; address?: string; contact?: string }) => {
    const newSupplier = {
      id: Date.now().toString(),
      ...supplierData,
      created_at: new Date().toISOString(),
    };
    setSuppliers(prev => [...prev, newSupplier]);
    setFormData(prev => ({ ...prev, supplier: newSupplier.name }));
    setShowSupplierForm(false);
  };

  const filteredParties = partyNames.filter(party => 
    party.toLowerCase().includes(formData.party.toLowerCase())
  );

  const filteredSuppliers = supplierNames.filter(supplier => 
    supplier.toLowerCase().includes(formData.supplier.toLowerCase())
  );

  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.toLowerCase().includes(formData.vehicle_no.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Loading Slip' : 'New Loading Slip'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slip Number
              </label>
              <input
                type="text"
                name="slip_number"
                value={formData.slip_number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Party (M/S)
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="party"
                  value={formData.party}
                  onChange={handleInputChange}
                  onFocus={() => setShowPartyDropdown(true)}
                  onBlur={() => setTimeout(() => setShowPartyDropdown(false), 200)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type or select party name"
                  required
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                {showPartyDropdown && filteredParties.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {filteredParties.map((party, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handlePartySelect(party)}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                      >
                        {party}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle No
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="vehicle_no"
                  value={formData.vehicle_no}
                  onChange={handleInputChange}
                  onFocus={() => setShowVehicleDropdown(true)}
                  onBlur={() => setTimeout(() => setShowVehicleDropdown(false), 200)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type or select vehicle number"
                  required
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                {showVehicleDropdown && filteredVehicles.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {filteredVehicles.map((vehicle, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleVehicleSelect(vehicle)}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                      >
                        {vehicle}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supplier
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleInputChange}
                  onFocus={() => setShowSupplierDropdown(true)}
                  onBlur={() => setTimeout(() => setShowSupplierDropdown(false), 200)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type or select supplier name"
                  required
                />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                {showSupplierDropdown && filteredSuppliers.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {filteredSuppliers.map((supplier, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSupplierSelect(supplier)}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                      >
                        {supplier}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <input
                type="text"
                name="from_location"
                value={formData.from_location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <input
                type="text"
                name="to_location"
                value={formData.to_location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimension
              </label>
              <input
                type="text"
                name="dimension"
                value={formData.dimension}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 20ft x 8ft x 8ft"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (MT)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Freight (₹)
              </label>
              <input
                type="number"
                name="freight"
                value={formData.freight}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advance (₹)
              </label>
              <input
                type="number"
                name="advance"
                value={formData.advance}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RTO (₹)
              </label>
              <input
                type="number"
                name="rto"
                value={formData.rto}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* Calculated Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Balance (Freight - Advance)
              </label>
              <div className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                {formatCurrency(formData.freight - formData.advance)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Freight (Freight + RTO)
              </label>
              <div className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                {formatCurrency(formData.freight + formData.rto)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialData ? 'Update' : 'Create'} Loading Slip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoadingSlipForm;