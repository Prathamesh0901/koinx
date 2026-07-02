export interface GainBalance {
  balance: number;
  gain: number;
}

export interface Holding {
  id: string;
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: GainBalance;
  ltcg: GainBalance;
}

export interface GainLoss {
  profits: number;
  losses: number;
}

export interface CapitalGainsData {
  stcg: GainLoss;
  ltcg: GainLoss;
}

export interface NetGains {
  stcgNet: number;
  ltcgNet: number;
  realised: number;
}
