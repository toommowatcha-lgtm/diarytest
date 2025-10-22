
import React from 'react';
import { Link } from 'react-router-dom';
import { useStock } from '../contexts/StockContext';

const Watchlist = () => {
    const { stocks, loading } = useStock();

    if (loading) {
        return <div>Loading watchlist...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Watchlist</h1>
                {/* Add stock button would go here */}
            </div>
            {stocks.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Your watchlist is empty.</p>
                    <p className="text-sm text-muted-foreground mt-2">Add a stock to get started.</p>
                    <p className="text-sm text-muted-foreground mt-4"> (You can seed sample data from the Admin page via Settings)</p>
                </div>
            ) : (
                <div className="border rounded-lg">
                    <div className="grid grid-cols-3 font-semibold p-4 border-b bg-muted/50">
                        <div>Symbol</div>
                        <div>Company Name</div>
                        <div>Tags</div>
                    </div>
                    {stocks.map(stock => (
                        <Link to={`/stock/${stock.symbol}`} key={stock.id} className="grid grid-cols-3 p-4 border-b hover:bg-muted/50 transition-colors">
                            <div className="font-mono text-primary">{stock.symbol}</div>
                            <div>{stock.companyName}</div>
                            <div className="flex gap-2">
                                {stock.tags?.map(tag => (
                                    <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
