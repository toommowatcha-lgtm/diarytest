import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStock } from '../contexts/StockContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { StockEditor } from '../components/StockEditor';
import { Stock } from '../types';

const Dashboard = () => {
    const { stocks, loading } = useStock();
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditorOpen, setEditorOpen] = useState(false);

    const filteredStocks = stocks.filter(stock =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatMarketCap = (mc: number) => {
        if (!mc || mc === 0) return 'N/A';
        if (mc > 1_000_000_000_000) return `$${(mc / 1_000_000_000_000).toFixed(2)}T`;
        if (mc > 1_000_000_000) return `$${(mc / 1_000_000_000).toFixed(1)}B`;
        return `$${(mc / 1_000_000).toFixed(1)}M`;
    };

    if (loading) {
        return <div className="text-center py-10">Loading dashboard...</div>;
    }

    const handleEditorSave = (stock: Stock) => {
        setEditorOpen(false);
    }

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tighter">Dashboard</h1>
                <p className="text-muted-foreground">Your personal stock analysis watchlist.</p>
            </header>

            <div className="mb-6">
                <Input
                    type="text"
                    placeholder="Search by name or ticker..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-md"
                    aria-label="Search stocks"
                />
            </div>

            {filteredStocks.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-xl">
                    <h3 className="text-lg font-semibold">Your Watchlist is Empty</h3>
                    <p className="text-muted-foreground mt-2">Click the "+ Add Stock" button to start building your watchlist.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStocks.map(stock => (
                        <Link to={`/company/${stock.ticker}`} key={stock.id} className="block">
                            <Card className="hover:border-primary transition-colors duration-200 h-full flex flex-col rounded-xl shadow-sm hover:shadow-md">
                                <CardHeader className="flex flex-row items-start justify-between pb-4">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{stock.name}</CardTitle>
                                        <CardDescription className="font-mono text-sm">{stock.ticker}</CardDescription>
                                    </div>
                                    <img src={stock.logoUrl} alt={`${stock.name} logo`} className="w-12 h-12 rounded-full border" />
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col justify-end text-sm">
                                    <div className="space-y-1">
                                       <p><span className="font-semibold">Market Cap:</span> {formatMarketCap(stock.market_cap)}</p>
                                       <p><span className="font-semibold">P/E (TTM):</span> {stock.pe_ratio > 0 ? stock.pe_ratio.toFixed(1) : 'N/A'}</p>
                                       <p><span className="font-semibold">Moat:</span> <span className="text-muted-foreground">{stock.moat.split(',')[0]}</span></p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}

            <Dialog open={isEditorOpen} onOpenChange={setEditorOpen}>
                <DialogTrigger asChild>
                    <Button className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-lg" aria-label="Add Stock">
                        <Plus className="h-8 w-8" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Add New Stock</DialogTitle>
                    </DialogHeader>
                    <StockEditor onSave={handleEditorSave} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Dashboard;