import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStock } from '../contexts/StockContext';
import { Stock } from '../types';
import { ArrowLeft, Briefcase, BrainCircuit, PenLine, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import AIInsightsBox from '../components/AIInsightsBox';
import { EditableField } from '../components/EditableField';
import { Button } from '../components/ui/button';
import FinancialsDashboard from '../components/FinancialsDashboard';
import ValuationPanel from '../components/ValuationPanel';

const CompanyPage = () => {
    const { ticker } = useParams<{ ticker: string }>();
    const navigate = useNavigate();
    const { getStock, updateStock, deleteStock } = useStock();
    const [stock, setStock] = useState<Stock | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (ticker) {
            setLoading(true);
            getStock(ticker).then(data => {
                setStock(data);
                setLoading(false);
            }).catch(() => setLoading(false));
        }
    }, [ticker, getStock]);
    
    const handleFieldSave = (field: keyof Stock, value: string | number) => {
        if (stock) {
            const updatedStock = { ...stock, [field]: value };
            setStock(updatedStock);
            updateStock(updatedStock);
        }
    };

    const handleDelete = async () => {
        if(stock && window.confirm(`Are you sure you want to delete ${stock.name}? This action cannot be undone.`)) {
            await deleteStock(stock.ticker);
            navigate('/');
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading details for {ticker}...</div>;
    }

    if (!stock) {
        return <div className="flex items-center justify-center h-screen">Stock {ticker} not found.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
            </Link>

            <header className="flex items-start justify-between space-x-4 mb-8">
                <div className="flex items-center space-x-4">
                    <img src={stock.logoUrl} alt={`${stock.name} logo`} className="w-20 h-20 rounded-full border" />
                    <div>
                        <EditableField
                            as="h1"
                            value={stock.name}
                            onSave={(value) => handleFieldSave('name', value)}
                            className="text-4xl font-bold tracking-tighter"
                        />
                        <p className="text-xl text-muted-foreground font-mono">{stock.ticker}</p>
                    </div>
                </div>
                 <Button variant="destructive" size="sm" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="rounded-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center"><Briefcase className="h-5 w-5 mr-2" /> Business Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-1">Business Model</h4>
                                <EditableField as="textarea" value={stock.business_model} onSave={value => handleFieldSave('business_model', value)} />
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Revenue Segments</h4>
                                <EditableField as="textarea" value={stock.revenue_segment} onSave={value => handleFieldSave('revenue_segment', value)} />
                            </div>
                             <div>
                                <h4 className="font-semibold mb-1">Growth Engine</h4>
                                <EditableField as="textarea" value={stock.growth_engine} onSave={value => handleFieldSave('growth_engine', value)} />
                            </div>
                             <div>
                                <h4 className="font-semibold mb-1">Moat (Competitive Advantage)</h4>
                                <EditableField as="input" value={stock.moat} onSave={value => handleFieldSave('moat', value)} />
                            </div>
                        </CardContent>
                    </Card>

                    <FinancialsDashboard stock={stock} />

                    <Card className="rounded-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center"><PenLine className="h-5 w-5 mr-2" /> My Notes & Thesis</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <EditableField as="textarea" value={stock.notes} onSave={value => handleFieldSave('notes', value)} className="min-h-[200px]" />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <Card className="rounded-xl">
                        <CardHeader>
                            <CardTitle>Key Metrics</CardTitle>
                            <CardDescription>Click any value to edit</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-medium text-muted-foreground">Market Cap</span>
                                <EditableField type="number" value={stock.market_cap} onSave={value => handleFieldSave('market_cap', Number(value))} className="text-right font-semibold" />
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="font-medium text-muted-foreground">Revenue (TTM)</span>
                                <EditableField type="number" value={stock.revenue} onSave={value => handleFieldSave('revenue', Number(value))} className="text-right font-semibold" />
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="font-medium text-muted-foreground">EPS (TTM)</span>
                                <EditableField type="number" value={stock.eps} onSave={value => handleFieldSave('eps', Number(value))} className="text-right font-semibold" />
                            </div>
                             <div className="flex justify-between items-center">
                                <span className="font-medium text-muted-foreground">P/E Ratio (TTM)</span>
                                <EditableField type="number" value={stock.pe_ratio} onSave={value => handleFieldSave('pe_ratio', Number(value))} className="text-right font-semibold" />
                            </div>
                        </CardContent>
                    </Card>

                    <ValuationPanel stock={stock} />

                    <AIInsightsBox stock={stock} />
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;