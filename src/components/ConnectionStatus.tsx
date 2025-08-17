import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Cloud, Monitor } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

const ConnectionStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasSupabase, setHasSupabase] = useState(false);

  useEffect(() => {
    setHasSupabase(isSupabaseConfigured());

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getStatusInfo = () => {
    if (!isOnline) {
      return {
        icon: WifiOff,
        text: 'Offline Mode',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
      };
    }

    if (hasSupabase) {
      return {
        icon: Cloud,
        text: 'Cloud Sync Active',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
      };
    }

    return {
      icon: Monitor,
      text: 'LAN Mode Active',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    };
  };

  const status = getStatusInfo();
  const Icon = status.icon;

  return (
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${status.bgColor}`}>
      <Icon className={`w-4 h-4 ${status.color}`} />
      <span className={`text-sm font-medium ${status.color}`}>
        {status.text}
      </span>
      {isOnline && (
        <div className={`w-2 h-2 rounded-full ${status.color.replace('text-', 'bg-')} animate-pulse`} />
      )}
    </div>
  );
};

export default ConnectionStatus;