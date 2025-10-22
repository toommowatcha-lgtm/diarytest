import React, { useState, useEffect, useCallback } from 'react';
import { Textarea } from './ui/textarea';

interface NotesEditorProps {
    initialNotes: string;
    onSave: (notes: string) => void;
}

// Debounce hook
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const NotesEditor = ({ initialNotes, onSave }: NotesEditorProps) => {
    const [notes, setNotes] = useState(initialNotes);
    const debouncedNotes = useDebounce(notes, 1000); // 1-second debounce delay
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');

    useEffect(() => {
        if (debouncedNotes !== initialNotes) {
            setSaveStatus('saving');
            onSave(debouncedNotes);
            // In a real app, you'd get a confirmation from onSave promise
            setTimeout(() => setSaveStatus('saved'), 500);
        }
    }, [debouncedNotes, initialNotes, onSave]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
        setSaveStatus('unsaved');
    }

    const getStatusText = () => {
        switch (saveStatus) {
            case 'saved': return 'All changes saved.';
            case 'saving': return 'Saving...';
            case 'unsaved': return 'Unsaved changes.';
        }
    };
    
    return (
        <div>
            <Textarea
                value={notes}
                onChange={handleChange}
                placeholder="Write your investment thesis, risks, or any notes here..."
                className="min-h-[200px]"
                aria-label="Investment Notes"
            />
            <p className="text-xs text-muted-foreground text-right mt-2">{getStatusText()}</p>
        </div>
    );
};

export default NotesEditor;