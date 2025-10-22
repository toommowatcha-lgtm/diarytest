import React from 'react';
import { useParams } from 'react-router-dom';
import { useStock } from '../../contexts/StockContext';
import { Stock } from '../../types';

const StockDetail = () => {
    const { ticker } = useParams<{ ticker: string }>();
    const { getStock } = useStock();
    const [stock, setStock] = React.useState<Stock | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (ticker) {
            getStock(ticker).then(data => {
                setStock(data);
                setLoading(false);
            });
        }
    }, [ticker, getStock]);

    if (loading) {
        return <div>Loading stock details for {ticker}...</div>
    }

    if (!stock) {
        return <div>Stock {ticker} not found.</div>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">{stock.name} ({stock.ticker})</h1>
            <p className="mt-4">Stock detail page with tabs for Business Overview, Financials, etc. would go here.</p>
        </div>
    );
};

export default StockDetail;