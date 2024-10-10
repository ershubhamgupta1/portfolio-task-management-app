import React from 'react';
import './Input.css';  // Assuming you'd style it similarly to `filter-input`

interface InputProps {
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ type = 'text', value, placeholder, onChange, className }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className || 'generic-input'} // Fallback class for styling
    />
  );
};

export default Input;
