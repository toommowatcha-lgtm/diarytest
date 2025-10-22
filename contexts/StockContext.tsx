import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Stock } from '../types';
import { IDataClient } from '../lib/data/IDataClient';
import { LocalDataClient } from '../lib/data/LocalDataClient';
import { seedStocks } from '../data/seed';

interface StockContextState {
  stocks: Stock[];
  loading: boolean;
  getStock: (ticker: string) => Promise<Stock | null>;
  createStock: (stock: Omit<Stock, 'id'>) => Promise<Stock>;
  updateStock: (stock: Stock) => Promise<Stock>;
  deleteStock: (ticker: string) => Promise<void>;
  // Fix: Add seedData and clearData to the context state type to fix error in Admin.tsx
  seedData: () => Promise<void>;
  clearData: () => Promise<void>;
}

const StockContext = createContext<StockContextState | undefined>(undefined);

const dataClient: IDataClient = new LocalDataClient();
const TABLE_NAME = 'stocks';

const bootstrapData = async () => {
    await dataClient.createTableIfMissing(TABLE_NAME);
    const existingStocks = await dataClient.list<Stock>(TABLE_NAME);
    if (existingStocks.length === 0) {
        console.log('No stocks found, seeding initial data...');
        for (const stock of seedStocks) {
            await dataClient.upsert(TABLE_NAME, stock);
        }
    }
};

// FIX: Define props for StockProvider using an interface for better readability and to resolve type errors in App.tsx.
interface StockProviderProps {
  children: ReactNode;
}

export const StockProvider = ({ children }: StockProviderProps) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStocks = useCallback(async () => {
    setLoading(true);
    try {
      await bootstrapData();
      const stockList = await dataClient.list<Stock>(TABLE_NAME);
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

  const getStock = async (ticker: string): Promise<Stock | null> => {
    return await dataClient.get<Stock>(TABLE_NAME, ticker);
  };

  const createStock = async (stockData: Omit<Stock, 'id'>): Promise<Stock> => {
    const newStock: Stock = { ...stockData, id: stockData.ticker.toUpperCase() };
    const savedStock = await dataClient.upsert<Stock>(TABLE_NAME, newStock);
    await fetchStocks(); // refetch all stocks to update the list
    return savedStock;
  };

  const updateStock = async (stock: Stock): Promise<Stock> => {
    const updatedStock = await dataClient.upsert<Stock>(TABLE_NAME, stock);
    // Update local state for immediate feedback
    setStocks(prev => prev.map(s => s.id === updatedStock.id ? updatedStock : s));
    return updatedStock;
  };

  const deleteStock = async (ticker: string): Promise<void> => {
    await dataClient.delete(TABLE_NAME, ticker);
    await fetchStocks(); // refetch
  }

  // Fix: Implement seedData and clearData functions.
  const seedData = async () => {
    setLoading(true);
    await dataClient.clear(TABLE_NAME);
    for (const stock of seedStocks) {
        await dataClient.upsert(TABLE_NAME, stock);
    }
    await fetchStocks();
  };

  const clearData = async () => {
      setLoading(true);
      await dataClient.clear(TABLE_NAME);
      await fetchStocks();
  };


  const value = {
    stocks,
    loading,
    getStock,
    createStock,
    updateStock,
    deleteStock,
    // Fix: Expose seedData and clearData on the context value.
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