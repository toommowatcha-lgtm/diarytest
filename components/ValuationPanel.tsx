import React, { useState, useMemo } from 'react';
import { Stock } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Target } from 'lucide-react';

const ValuationPanel = ({ stock }: { stock: Stock }) => {
    const [salesGrowth, setSalesGrowth] = useState(20); // Default 20% CAGR
    const [peTarget, setPeTarget] = useState(30); // Default 30 P/E
    const [horizon, setHorizon] = useState(5); // Default 5 years

    const latestAnnualRevenue = stock.financials.annual.incomeStatement[stock.financials.annual.incomeStatement.length - 1]?.revenue || 0;

    const projectedData = useMemo(() => {
        const futureRevenue = latestAnnualRevenue * Math.pow(1 + salesGrowth / 100, horizon);
        // FIX: Changed from non-existent stock.keyMetrics to use top-level stock properties.
        const futureEPS = (futureRevenue * (stock.eps / stock.revenue)); // Assuming constant margin
        const futureSharePrice = futureEPS * peTarget;
        const upside = (futureSharePrice / stock.valuation.currentPrice - 1) * 100;
        const cagr = (Math.pow(futureSharePrice / stock.valuation.currentPrice, 1 / horizon) - 1) * 100;

        return { futureSharePrice, upside, cagr };
    }, [salesGrowth, peTarget, horizon, stock]);

    return (
        <Card className="rounded-xl">
            <CardHeader>
                <CardTitle className="flex items-center"><Target className="h-5 w-5 mr-2" /> Valuation Calculator</CardTitle>
                <CardDescription>Project a future stock price based on your assumptions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="sales-growth" className="text-sm">Sales Growth (%/yr)</Label>
                        <Input id="sales-growth" type="number" value={salesGrowth} onChange={e => setSalesGrowth(Number(e.target.value))} />
                    </div>
                    <div>
                        <Label htmlFor="pe-target" className="text-sm">Target P/E</Label>
                        <Input id="pe-target" type="number" value={peTarget} onChange={e => setPeTarget(Number(e.target.value))} />
                    </div>
                </div>
                 <div>
                    <Label htmlFor="horizon" className="text-sm">Investment Horizon (Yrs)</Label>
                    <Input id="horizon" type="number" value={horizon} onChange={e => setHorizon(Number(e.target.value))} />
                </div>

                <div className="bg-muted rounded-md p-4 text-center mt-4">
                    <p className="text-sm text-muted-foreground">{horizon}-Year Target Price</p>
                    <p className="text-3xl font-bold">${projectedData.futureSharePrice.toFixed(2)}</p>
                    <div className="flex justify-around mt-2 text-sm">
                        <div>
                            <p className="text-muted-foreground">Upside</p>
                            <p className={`font-semibold ${projectedData.upside >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {projectedData.upside.toFixed(1)}%
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">CAGR</p>
                             <p className={`font-semibold ${projectedData.cagr >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {projectedData.cagr.toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ValuationPanel;