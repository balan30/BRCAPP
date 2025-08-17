import React from 'react';
import { Truck, FileText, Receipt, CreditCard, Users, Building, Archive, Search } from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Truck },
    { id: 'trips', label: 'Trips', icon: FileText },
    { id: 'bills', label: 'Bills', icon: Receipt },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'parties', label: 'Parties', icon: Users },
    { id: 'branches', label: 'Branches', icon: Building },
    { id: 'archive', label: 'Archive', icon: Archive },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Bhavishya Road Carriers - Logistics Management
            </h2>
            <div className="flex items-center space-x-4">
              <ConnectionStatus />
              <div className="text-xs text-gray-500">
                {new Date().toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </header>

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;