import { Stock, MoatPowerRating, StoryTone, RiskRating } from '@/types';

export const seedStocks: Stock[] = [
  {
    id: 'MSFT',
    symbol: 'MSFT',
    companyName: 'Microsoft Corp',
    tags: ['Tech', 'Cloud', 'Software'],
    businessOverview: {
      businessModel: 'Diversified software, hardware, and cloud services company. Sells licenses for software (Windows, Office), subscriptions (Azure, Office 365), hardware (Xbox, Surface), and advertising (LinkedIn, Bing).',
      customerSegments: [
        { segment: 'Enterprises', description: 'Cloud services (Azure), productivity suites (Office 365), business applications (Dynamics 365).' },
        { segment: 'Consumers', description: 'Windows OS, Surface devices, Xbox gaming, Office software.' },
        { segment: 'Developers', description: 'Azure cloud platform, GitHub, Visual Studio.' },
      ],
      revenueBreakdown: [
        { segment: 'Server products and cloud services', percentage: 40 },
        { segment: 'Office products and cloud services', percentage: 25 },
        { segment: 'Windows', percentage: 10 },
        { segment: 'Gaming', percentage: 10 },
        { segment: 'LinkedIn', percentage: 5 },
        { segment: 'Other', percentage: 10 },
      ],
      channels: 'Direct sales force for enterprise, online store, retail partners, OEMs.',
      growthEngine: 'Azure cloud adoption continues to be the primary growth driver. Expansion of AI services (OpenAI partnership) is expected to accelerate this growth. Gaming division is another key area with the acquisition of Activision Blizzard.',
      tam: 500000000000,
      sam: 300000000000,
      som: 150000000000,
      tippingPoint: 'The shift to cloud is largely complete, the next tipping point is the widespread adoption of AI-powered copilots across the entire software stack.',
      moat: {
        counterPositioning: { rating: MoatPowerRating.Low, reason: '' },
        networkEffects: { rating: MoatPowerRating.High, reason: 'Windows, Office, and Azure have massive ecosystems and user bases.' },
        switchingCosts: { rating: MoatPowerRating.High, reason: 'Deeply integrated into enterprise IT infrastructure. Migrating from Azure or Office 365 is complex and costly.' },
        branding: { rating: MoatPowerRating.High, reason: 'One of the most recognized and trusted tech brands globally.' },
        scaleEconomies: { rating: MoatPowerRating.High, reason: 'Massive global data center infrastructure for Azure provides significant cost advantages.' },
        processPower: { rating: MoatPowerRating.Moderate, reason: 'Efficient software development and deployment pipeline.' },
        corneredResource: { rating: MoatPowerRating.Moderate, reason: 'Exclusive partnership with OpenAI for certain models.' },
      },
    },
    financials: {
      metrics: [
        {
          id: 'revenue',
          name: 'Revenue',
          isCustom: false,
          data: [
            { period: 'Q1 2023', value: 52.9 },
            { period: 'Q2 2023', value: 56.2 },
            { period: 'Q3 2023', value: 52.7 },
            { period: 'Q4 2023', value: 56.2 },
          ],
        },
        {
            id: 'net_income',
            name: 'Net Income',
            isCustom: false,
            data: [
              { period: 'Q1 2023', value: 18.3 },
              { period: 'Q2 2023', value: 21.9 },
              { period: 'Q3 2023', value: 20.1 },
              { period: 'Q4 2023', value: 20.1 },
            ],
          },
        {
          id: 'custom_azure_growth',
          name: 'Azure Growth (%)',
          isCustom: true,
          data: [
            { period: 'Q1 2023', value: 27 },
            { period: 'Q2 2023', value: 31 },
            { period: 'Q3 2023', value: 26 },
            { period: 'Q4 2023', value: 27 },
          ],
        },
      ],
    },
    valuation: {
        currentPrice: 420,
        investmentHorizon: 5,
        currentSales: 211900000000, // TTM Sales
        salesCagr: 12,
        netProfitMargin: 35,
        sharesOutstanding: 7430000000,
        peTarget: 30,
        shareChange: -1,
    },
    story: [
      {
        id: 'q4-2023-note',
        period: 'Q4 2023',
        summary: 'Azure growth steady, AI showing early promise.',
        tone: StoryTone.Bullish,
        notes: 'Management highlighted strong demand for AI services on the Azure platform. The OpenAI partnership is starting to contribute meaningfully to revenue. Gaming segment performance was solid post-Activision deal closure. Overall, the company is executing well on its key strategic pillars.',
      },
    ],
    riskAssessment: {
        keyBusinessRisks: 'Antitrust regulation in the US and EU. Intense competition in cloud (AWS, Google) and gaming (Sony). Potential for a slowdown in IT spending.',
        financialRisks: 'Foreign exchange headwinds. Large goodwill on the balance sheet from acquisitions.',
        managementRisks: 'Key person risk with Satya Nadella. Integration risk from large acquisitions like Activision.',
        macroRisks: 'Global economic slowdown impacting enterprise and consumer spending.',
        overallRating: RiskRating.Low,
    }
  },
  {
    id: 'AAPL',
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    tags: ['Tech', 'Consumer Electronics', 'Hardware'],
  }
];