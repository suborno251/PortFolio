import rawData from '../data/portfolio.json';
import type { PortfolioData } from '../types/portfolio';

export * from '../types/portfolio';

const data = rawData as PortfolioData;

export const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || data.email;

export function usePortfolioData(): PortfolioData & { loading: boolean } {
  return {
    ...data,
    email: EMAIL,
    loading: false,
  };
}
