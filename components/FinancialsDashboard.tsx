import React, { useState } from 'react';
import { Stock, IncomeStatement, BalanceSheet, CashFlow } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import FinancialChart from './FinancialChart';
import { Scale } from 'lucide-react';

type PeriodType = 'annual' | 'quarterly';

const FinancialsDashboard = ({ stock }: { stock: Stock }) => {
    const [periodType, setPeriodType] = useState<PeriodType>('annual');

    const financials = stock.financials[periodType];

    const renderIncomeStatement = (data: IncomeStatement[]) => (
        <div className="space-y-4">
            <FinancialChart data={data} dataKey="revenue" name="Revenue" unit="M" />
            <FinancialChart data={data} dataKey="netIncome" name="Net Income" unit="M" />
            <FinancialChart data={data} dataKey="eps" name="EPS" unit="" />
        </div>
    );

    const renderBalanceSheet = (data: BalanceSheet[]) => (
        <FinancialChart data={data} dataKey="totalEquity" name="Total Equity" unit="M" />
    );

    const renderCashFlow = (data: CashFlow[]) => (
        <FinancialChart data={data} dataKey="operatingCashFlow" name="Operating Cash Flow" unit="M" />
    );
    
    return (
        <Card className="rounded-xl">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center"><Scale className="h-5 w-5 mr-2" /> Financials</CardTitle>
                    <ToggleGroup 
                        type="single" 
                        defaultValue="annual" 
                        value={periodType}
                        onValueChange={(value: PeriodType) => value && setPeriodType(value)}
                        aria-label="Annual or Quarterly"
                        size="sm"
                    >
                        <ToggleGroupItem value="annual" aria-label="Annual">Annual</ToggleGroupItem>
                        <ToggleGroupItem value="quarterly" aria-label="Quarterly">Quarterly</ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="income">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="income">Income Statement</TabsTrigger>
                        <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
                        <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
                    </TabsList>
                    <TabsContent value="income">
                        {financials.incomeStatement.length > 0 ? renderIncomeStatement(financials.incomeStatement) : <p className="text-center text-muted-foreground p-4">No {periodType} income statement data available.</p>}
                    </TabsContent>
                    <TabsContent value="balance">
                        {financials.balanceSheet.length > 0 ? renderBalanceSheet(financials.balanceSheet) : <p className="text-center text-muted-foreground p-4">No {periodType} balance sheet data available.</p>}
                    </TabsContent>
                    <TabsContent value="cashflow">
                        {financials.cashFlow.length > 0 ? renderCashFlow(financials.cashFlow) : <p className="text-center text-muted-foreground p-4">No {periodType} cash flow data available.</p>}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default FinancialsDashboard;