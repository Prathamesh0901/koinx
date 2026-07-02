import type { CapitalGainsData, Holding } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function fetchHoldings(): Promise<Holding[]> {
  return request<Holding[]>('/holdings');
}

export function fetchCapitalGains(): Promise<{ capitalGains: CapitalGainsData }> {
  return request<{ capitalGains: CapitalGainsData }>('/capital-gains');
}
