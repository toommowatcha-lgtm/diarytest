
import React from 'react';
import { useParams } from 'react-router-dom';
import { useStock } from '../../contexts/StockContext';

const StockDetail = () => {
    const { symbol } = useParams<{ symbol: string }>();
    const { getStock } = useStock();
    const [stock, setStock] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (symbol) {
            getStock(symbol).then(data => {
                setStock(data);
                setLoading(false);
            });
        }
    }, [symbol, getStock]);

    if (loading) {
        return <div>Loading stock details for {symbol}...</div>
    }

    if (!stock) {
        return <div>Stock {symbol} not found.</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">{stock.companyName} ({stock.symbol})</h1>
            <p className="mt-4">Stock detail page with tabs for Business Overview, Financials, etc. would go here.</p>
        </div>
    );
};

export default StockDetail;
