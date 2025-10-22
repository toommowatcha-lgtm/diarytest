
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Stock } from '../types';
import { IDataClient } from '../lib/data/IDataClient';
import { LocalDataClient } from '../lib/data/LocalDataClient';

interface StockContextState {
  stocks: Stock[];
  loading: boolean;
  getStock: (symbol: string) => Promise<Stock | null>;
  addStock: (stock: Omit<Stock, 'id'>) => Promise<Stock>;
  updateStock: (stock: Stock) => Promise<Stock>;
  deleteStock: (symbol: string) => Promise<void>;
  seedData: () => Promise<void>;
  clearData: () => Promise<void>;
}

const StockContext = createContext<StockContextState | undefined>(undefined);

// Use LocalDataClient by default. This can be swapped with SupabaseDataClient later.
const dataClient: IDataClient = new LocalDataClient();

export const StockProvider = ({ children }: { children: ReactNode }) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStocks = useCallback(async () => {
    setLoading(true);
    try {
      await dataClient.createTableIfMissing('stocks');
      const stockList = await dataClient.list<Stock>('stocks');
      setStocks(stockList);
    } catch (error) {
      console.error("Failed to fetch stocks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  const getStock = async (symbol: string): Promise<Stock | null> => {
    return await dataClient.get<Stock>('stocks', symbol);
  };

  const addStock = async (stockData: Omit<Stock, 'id'>): Promise<Stock> => {
    const newStock: Stock = { ...stockData, id: stockData.symbol };
    const savedStock = await dataClient.upsert<Stock>('stocks', newStock);
    setStocks(prev => [...prev, savedStock]);
    return savedStock;
  };

  const updateStock = async (stock: Stock): Promise<Stock> => {
    const updatedStock = await dataClient.upsert<Stock>('stocks', stock);
    setStocks(prev => prev.map(s => s.id === updatedStock.id ? updatedStock : s));
    return updatedStock;
  };

  const deleteStock = async (symbol: string): Promise<void> => {
    await dataClient.delete('stocks', symbol);
    setStocks(prev => prev.filter(s => s.id !== symbol));
  };

  const seedData = async (): Promise<void> => {
    const { seedStocks } = await import('../data/seed');
    setLoading(true);
    await dataClient.clear('stocks');
    for (const stock of seedStocks) {
        await dataClient.upsert('stocks', stock);
    }
    await fetchStocks();
  };

  const clearData = async (): Promise<void> => {
    setLoading(true);
    await dataClient.clear('stocks');
    await fetchStocks();
  };

  const value = {
    stocks,
    loading,
    getStock,
    addStock,
    updateStock,
    deleteStock,
    seedData,
    clearData,
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = (): StockContextState => {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};
