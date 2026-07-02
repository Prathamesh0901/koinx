import CapitalGainsCard from './components/CapitalGainsCard';
import DisclaimerBanner from './components/DisclaimerBanner';
import Header from './components/Header';
import HoldingsTable from './components/HoldingsTable';
import { ErrorState, LoadingState } from './components/StatusStates';
import { useTheme } from './hooks/useTheme';
import { useTaxHarvesting } from './hooks/useTaxHarvesting';

export default function App() {
  const {
    holdings,
    baseCapitalGains,
    afterCapitalGains,
    preNet,
    afterNet,
    savings,
    showSavings,
    selectedIds,
    toggleHolding,
    toggleAll,
    status,
    error,
    reload,
  } = useTaxHarvesting();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-koin-page pb-16 transition-colors dark:bg-koin-dark-bg">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6">
        <DisclaimerBanner />

        {status === 'loading' && <LoadingState />}

        {status === 'error' && <ErrorState message={error ?? 'Unknown error'} onRetry={reload} />}

        {status === 'success' && baseCapitalGains && afterCapitalGains && preNet && afterNet && (
          <>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <CapitalGainsCard variant="pre" data={baseCapitalGains} net={preNet} />
              <CapitalGainsCard
                variant="after"
                data={afterCapitalGains}
                net={afterNet}
                savings={savings}
                showSavings={showSavings}
              />
            </div>

            <HoldingsTable
              holdings={holdings}
              selectedIds={selectedIds}
              onToggle={toggleHolding}
              onToggleAll={toggleAll}
            />
          </>
        )}
      </main>
    </div>
  );
}
