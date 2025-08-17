import Party from './components/Party';
import Supplier from './components/Supplier';
import LedgerDetail from './components/LedgerDetail';
import { supabase } from './lib/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showLedgerDetail, setShowLedgerDetail] = useState<{
    name: string;
    type: 'party' | 'supplier';
  } | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  // Check connection status
  React.useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from('_health').select('*').limit(1);
        setIsOnline(!error);
      } catch {
        setIsOnline(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);
}