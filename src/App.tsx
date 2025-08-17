import Party from './components/Party';
import Supplier from './components/Supplier';
import LedgerDetail from './components/LedgerDetail';
import { DataProvider } from './context/DataContext';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showLedgerDetail, setShowLedgerDetail] = useState<{
    name: string;
    type: 'party' | 'supplier';
  } | null>(null);

  const renderCurrentPage = () => {
    // ... existing renderCurrentPage logic
  };

  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-50">
        <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
          {renderCurrentPage()}
        </Layout>
        
        {showLedgerDetail && (
          <LedgerDetail
            ledgerName={showLedgerDetail.name}
            ledgerType={showLedgerDetail.type}
            onClose={() => setShowLedgerDetail(null)}
          />
        )}
      </div>
    </DataProvider>
  );
}