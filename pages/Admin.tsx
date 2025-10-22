
import React, { useState } from 'react';
import { useStock } from '../contexts/StockContext';

const Admin = () => {
    const { seedData, clearData } = useStock();
    const [isSeeding, setIsSeeding] = useState(false);
    const [isClearing, setIsClearing] = useState(false);

    const handleSeed = async () => {
        if (window.confirm('Are you sure you want to clear all data and seed with sample stocks?')) {
            setIsSeeding(true);
            await seedData();
            setIsSeeding(false);
            alert('Sample data has been seeded.');
        }
    };
    
    const handleClear = async () => {
        if (window.confirm('Are you sure you want to delete ALL local data? This cannot be undone.')) {
            setIsClearing(true);
            await clearData();
            setIsClearing(false);
            alert('All local data has been cleared.');
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Admin & Debug</h1>
            <p className="text-muted-foreground mt-2">Tools for managing local application state.</p>
            <div className="mt-8 space-y-4">
                <div className="p-4 border rounded-lg">
                    <h2 className="font-semibold">Local Database Management</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Use these actions to manage the data stored in your browser's IndexedDB.
                    </p>
                    <div className="mt-4 flex gap-4">
                        <button
                            onClick={handleSeed}
                            disabled={isSeeding}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
                        >
                            {isSeeding ? 'Seeding...' : 'Seed Local Database'}
                        </button>
                        <button
                            onClick={handleClear}
                            disabled={isClearing}
                            className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90 disabled:opacity-50"
                        >
                           {isClearing ? 'Clearing...' : 'Clear All Local Data'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
