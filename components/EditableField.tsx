import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../lib/utils';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface EditableFieldProps {
  value: string | number;
  onSave: (value: string | number) => void;
  className?: string;
  as?: 'input' | 'textarea' | 'h1';
  type?: 'text' | 'number';
}

export const EditableField = ({
  value,
  onSave,
  className,
  as = 'input',
  type = 'text',
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const debouncedValue = useDebounce(currentValue, 1000);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== value) {
      onSave(debouncedValue);
    }
  }, [debouncedValue, onSave, value]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    onSave(currentValue);
  };

  const commonProps = {
    ref: inputRef as any,
    value: currentValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCurrentValue(e.target.value),
    onBlur: handleBlur,
    onKeyDown: (e: React.KeyboardEvent) => e.key === 'Enter' && handleBlur(),
    className: `bg-transparent p-1 -m-1 rounded-md focus:bg-muted focus:outline-none focus:ring-1 focus:ring-ring ${className}`,
  };

  if (isEditing) {
    if (as === 'textarea') {
      return <Textarea {...commonProps} />;
    }
    return <Input type={type} {...commonProps} />;
  }
  
  const displayClasses = `hover:bg-muted/50 p-1 -m-1 rounded-md cursor-pointer ${className}`;

  if (as === 'h1') {
      return <h1 onClick={() => setIsEditing(true)} className={displayClasses}>{currentValue || 'Untitled'}</h1>
  }

  return (
    <p onClick={() => setIsEditing(true)} className={displayClasses}>
      {currentValue || <span className="text-muted-foreground">Click to edit...</span>}
    </p>
  );
};
