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
                    {/* FIX: Removed 'Tags' column and adjusted grid to 2 columns. */}
                    <div className="grid grid-cols-2 font-semibold p-4 border-b bg-muted/50">
                        <div>Symbol</div>
                        <div>Company Name</div>
                    </div>
                    {stocks.map(stock => (
                        // FIX: Updated link to correct route and property 'ticker'. Adjusted grid to 2 columns.
                        <Link to={`/company/${stock.ticker}`} key={stock.id} className="grid grid-cols-2 p-4 border-b hover:bg-muted/50 transition-colors">
                            {/* FIX: Changed 'symbol' to 'ticker'. */}
                            <div className="font-mono text-primary">{stock.ticker}</div>
                            {/* FIX: Changed 'companyName' to 'name'. */}
                            <div>{stock.name}</div>
                            {/* FIX: Removed non-existent 'tags' property. */}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;