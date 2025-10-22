import { Stock } from '../types';

export const seedStocks: Stock[] = [
  {
    id: 'AAPL',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    logoUrl: 'https://companieslogo.com/img/orig/AAPL.D-f6a32b27.png?t=1633333396',
    business_model: 'Primarily designs, manufactures, and markets consumer electronics, software, and online services. Revenue is generated from the sale of hardware (iPhone, Mac, iPad, Wearables), software and services (App Store commissions, iCloud, Apple Music), and licensing.',
    revenue_segment: 'iPhone (~52%), Services (~20%), Wearables, Home and Accessories (~10%), Mac (~10%), iPad (~8%). Segments are geographically diversified across Americas, Europe, Greater China, Japan, and Rest of Asia Pacific.',
    growth_engine: 'Growth is driven by new iPhone cycles, expanding the install base for high-margin Services, growth in emerging markets, and entering new product categories (e.g., Vision Pro, potential automotive ventures). The ecosystem effect (sticky customers) is a key pillar of sustainable growth.',
    moat: 'Brand, Switching Costs, Network Effects. The Apple brand is one of the most valuable in the world, commanding premium pricing. The seamless integration of hardware and software (iOS, macOS) creates high switching costs for users invested in the ecosystem. The App Store is a powerful two-sided network effect, attracting both developers and users.',
    market_cap: 2610000000000,
    revenue: 383290, // TTM in millions
    eps: 6.13, // TTM
    pe_ratio: 27.5, // TTM
    notes: 'Investment Thesis:\n1. Fortress balance sheet and massive cash flow generation allow for significant R&D spending and shareholder returns (buybacks & dividends).\n2. Services segment provides a recurring, high-margin revenue stream that is growing faster than hardware.\n3. Brand loyalty and ecosystem create a durable competitive advantage.\n\nRisks:\n- Regulatory scrutiny regarding App Store policies.\n- Geopolitical tensions, particularly dependence on China for manufacturing and sales.\n- Key-person risk associated with Tim Cook and the executive team.',
    // Fix: Add seed data for valuation and financials to match the updated Stock type.
    valuation: {
      currentPrice: 170.00
    },
    financials: {
      annual: {
        incomeStatement: [
          { period: '2023', revenue: 383290, netIncome: 97000, eps: 6.13 },
          { period: '2022', revenue: 394328, netIncome: 99803, eps: 6.11 },
          { period: '2021', revenue: 365817, netIncome: 94680, eps: 5.61 },
        ],
        balanceSheet: [
          { period: '2023', totalEquity: 62146 },
        ],
        cashFlow: [
          { period: '2023', operatingCashFlow: 110543 },
        ],
      },
      quarterly: {
        incomeStatement: [],
        balanceSheet: [],
        cashFlow: [],
      }
    }
  }
];