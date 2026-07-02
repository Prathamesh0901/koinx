import type { CapitalGainsData, Holding, NetGains } from '../types';

export function computeNetGains(data: CapitalGainsData): NetGains {
  const stcgNet = data.stcg.profits - data.stcg.losses;
  const ltcgNet = data.ltcg.profits - data.ltcg.losses;
  return {
    stcgNet,
    ltcgNet,
    realised: stcgNet + ltcgNet,
  };
}

export function computeAfterHarvesting(
  base: CapitalGainsData,
  holdings: Holding[],
  selectedIds: Set<string>,
): CapitalGainsData {
  const result: CapitalGainsData = {
    stcg: { ...base.stcg },
    ltcg: { ...base.ltcg },
  };

  for (const holding of holdings) {
    if (!selectedIds.has(holding.id)) continue;

    if (holding.stcg.gain > 0) {
      result.stcg.profits += holding.stcg.gain;
    } else if (holding.stcg.gain < 0) {
      result.stcg.losses += Math.abs(holding.stcg.gain);
    }

    if (holding.ltcg.gain > 0) {
      result.ltcg.profits += holding.ltcg.gain;
    } else if (holding.ltcg.gain < 0) {
      result.ltcg.losses += Math.abs(holding.ltcg.gain);
    }
  }

  return result;
}

export function computeSavings(preRealised: number, postEffective: number): number {
  return preRealised - postEffective;
}
