
import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="mt-4">Theme toggles, data import/export, and other settings will go here.</p>
            <div className="mt-8">
                <Link to="/admin" className="text-sm text-primary hover:underline">
                    Go to Admin / Debug Page
                </Link>
            </div>
        </div>
    );
};

export default Settings;
