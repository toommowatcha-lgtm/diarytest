// Fix: Add financial data interfaces to be used in the Stock interface.
export interface IncomeStatement {
  period: string; // e.g., '2023', 'Q4 2023'
  revenue: number;
  netIncome: number;
  eps: number;
}

export interface BalanceSheet {
  period: string;
  totalEquity: number;
}

export interface CashFlow {
  period: string;
  operatingCashFlow: number;
}

export interface Financials {
  incomeStatement: IncomeStatement[];
  balanceSheet: BalanceSheet[];
  cashFlow: CashFlow[];
}


export interface Stock {
  id: string; // Ticker symbol, used as the unique ID
  ticker: string;
  name: string;
  logoUrl: string;
  
  // New qualitative fields for user input
  business_model: string;
  revenue_segment: string;
  growth_engine: string;
  moat: string; // e.g., "Network Effects, Brand, Scale"

  // Simplified key metrics
  market_cap: number;
  revenue: number; // TTM
  eps: number; // TTM
  pe_ratio: number; // TTM
  
  notes: string;

  // Fix: Add properties for financial data components.
  valuation: {
    currentPrice: number;
  };
  financials: {
    annual: Financials;
    quarterly: Financials;
  };
}