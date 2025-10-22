
export interface Stock {
  id: string; // Using symbol as ID
  symbol: string;
  companyName: string;
  tags?: string[];
  businessOverview?: BusinessOverview;
  financials?: Financials;
  valuation?: Valuation;
  story?: Story[];
  riskAssessment?: RiskAssessment;
}

export interface BusinessOverview {
  businessModel: string;
  customerSegments: { segment: string; description: string }[];
  revenueBreakdown: { segment: string; percentage: number }[];
  channels: string;
  growthEngine: string;
  tam: number;
  sam: number;
  som: number;
  tippingPoint: string;
  moat: Moat;
}

export enum MoatPowerRating {
  Low = 'Low',
  Moderate = 'Moderate',
  High = 'High',
}

export interface MoatPower {
  rating: MoatPowerRating;
  reason: string;
}

export interface Moat {
  counterPositioning: MoatPower;
  networkEffects: MoatPower;
  switchingCosts: MoatPower;
  branding: MoatPower;
  scaleEconomies: MoatPower;
  processPower: MoatPower;
  corneredResource: MoatPower;
}

export interface Financials {
  metrics: FinancialMetric[];
}

export interface FinancialMetric {
  id: string; // e.g., 'revenue', 'net_income', or custom UUID
  name: string;
  isCustom: boolean;
  data: TimeSeriesDataPoint[];
}

export interface TimeSeriesDataPoint {
  period: string; // e.g., 'Q1 2023' or '2023'
  value: number;
}

export interface Valuation {
  currentPrice: number;
  investmentHorizon: number; // years
  currentSales: number;
  salesCagr: number; // percentage
  netProfitMargin: number; // percentage
  sharesOutstanding: number;
  peTarget: number;
  shareChange: number; // percentage (buyback/dividend)
}

export enum StoryTone {
  Bullish = 'Bullish',
  Neutral = 'Neutral',
  Bearish = 'Bearish',
}

export interface Story {
  id: string;
  period: string; // e.g., 'Q1 2023'
  summary: string;
  tone: StoryTone;
  notes: string;
}

export enum RiskRating {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export interface RiskAssessment {
  keyBusinessRisks: string;
  financialRisks: string;
  managementRisks: string;
  macroRisks: string;
  overallRating: RiskRating;
}
