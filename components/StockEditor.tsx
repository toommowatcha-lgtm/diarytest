import React, { useState } from 'react';
import { useStock } from '../contexts/StockContext';
import { Stock } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface StockEditorProps {
  stock?: Stock;
  onSave: (stock: Stock) => void;
}

// FIX: Add missing 'valuation' and 'financials' properties to align with the Stock type.
const emptyStock: Omit<Stock, 'id'> = {
  ticker: '',
  name: '',
  logoUrl: '',
  business_model: '',
  revenue_segment: '',
  growth_engine: '',
  moat: '',
  market_cap: 0,
  revenue: 0,
  eps: 0,
  pe_ratio: 0,
  notes: '',
  valuation: {
    currentPrice: 0,
  },
  financials: {
    annual: {
      incomeStatement: [],
      balanceSheet: [],
      cashFlow: [],
    },
    quarterly: {
      incomeStatement: [],
      balanceSheet: [],
      cashFlow: [],
    },
  },
};

export const StockEditor = ({ stock, onSave }: StockEditorProps) => {
  const { createStock, updateStock } = useStock();
  const [formData, setFormData] = useState(stock || emptyStock);
  const [isSaving, setIsSaving] = useState(false);

  const isEditMode = !!stock;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simple validation
    if (!formData.ticker || !formData.name) {
        alert('Ticker and Name are required.');
        setIsSaving(false);
        return;
    }

    try {
      let savedStock;
      if (isEditMode) {
        savedStock = await updateStock(formData as Stock);
      } else {
        savedStock = await createStock(formData);
      }
      onSave(savedStock);
    } catch (error) {
      console.error('Failed to save stock:', error);
      alert('There was an error saving the stock.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const gridItemClass = "grid grid-cols-4 items-center gap-4";
  const labelClass = "text-right";
  const inputContainerClass = "col-span-3";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className={gridItemClass}>
        <Label htmlFor="ticker" className={labelClass}>Ticker</Label>
        <Input id="ticker" name="ticker" value={formData.ticker} onChange={handleChange} className={inputContainerClass} required disabled={isEditMode} />
      </div>
      <div className={gridItemClass}>
        <Label htmlFor="name" className={labelClass}>Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} className={inputContainerClass} required />
      </div>
       <div className={gridItemClass}>
        <Label htmlFor="logoUrl" className={labelClass}>Logo URL</Label>
        <Input id="logoUrl" name="logoUrl" value={formData.logoUrl} onChange={handleChange} className={inputContainerClass} />
      </div>
      <div className={gridItemClass}>
        <Label htmlFor="market_cap" className={labelClass}>Market Cap</Label>
        <Input id="market_cap" name="market_cap" type="number" value={formData.market_cap} onChange={handleChange} className={inputContainerClass} />
      </div>
       <div className={gridItemClass}>
        <Label htmlFor="revenue" className={labelClass}>Revenue (TTM)</Label>
        <Input id="revenue" name="revenue" type="number" value={formData.revenue} onChange={handleChange} className={inputContainerClass} />
      </div>
      <div className={gridItemClass}>
        <Label htmlFor="eps" className={labelClass}>EPS (TTM)</Label>
        <Input id="eps" name="eps" type="number" value={formData.eps} onChange={handleChange} className={inputContainerClass} />
      </div>
      <div className={gridItemClass}>
        <Label htmlFor="pe_ratio" className={labelClass}>P/E Ratio</Label>
        <Input id="pe_ratio" name="pe_ratio" type="number" value={formData.pe_ratio} onChange={handleChange} className={inputContainerClass} />
      </div>
       <div className="grid gap-2">
        <Label htmlFor="business_model">Business Model</Label>
        <Textarea id="business_model" name="business_model" value={formData.business_model} onChange={handleChange} placeholder="How the company makes money..." />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Your investment thesis, risks, etc." />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
};