import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchCapitalGains, fetchHoldings } from '../api/client';
import type { CapitalGainsData, Holding } from '../types';
import { computeAfterHarvesting, computeNetGains, computeSavings } from '../utils/calculations';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function useTaxHarvesting() {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [baseCapitalGains, setBaseCapitalGains] = useState<CapitalGainsData | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const [holdingsRes, capitalGainsRes] = await Promise.all([fetchHoldings(), fetchCapitalGains()]);
      setHoldings(holdingsRes);
      setBaseCapitalGains(capitalGainsRes.capitalGains);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong while loading your data.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleHolding = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelectedIds((prev) => {
      if (prev.size === holdings.length) return new Set();
      return new Set(holdings.map((h) => h.id));
    });
  }, [holdings]);

  const preNet = useMemo(
    () => (baseCapitalGains ? computeNetGains(baseCapitalGains) : null),
    [baseCapitalGains],
  );

  const afterCapitalGains = useMemo(
    () => (baseCapitalGains ? computeAfterHarvesting(baseCapitalGains, holdings, selectedIds) : null),
    [baseCapitalGains, holdings, selectedIds],
  );

  const afterNet = useMemo(
    () => (afterCapitalGains ? computeNetGains(afterCapitalGains) : null),
    [afterCapitalGains],
  );

  const savings = useMemo(() => {
    if (!preNet || !afterNet) return 0;
    return computeSavings(preNet.realised, afterNet.realised);
  }, [preNet, afterNet]);

  const showSavings = savings > 0 && selectedIds.size > 0;

  return {
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
    reload: loadData,
  };
}
