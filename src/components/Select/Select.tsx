import React, { useState } from 'react';
import './Select.css';

export interface Option {
  label: string; // The text to display for the option
  value: string; // The underlying value of the option
}

interface SelectProps {
  label?: string; // Optional label for the select
  defaultLabel? : string;
  className? : string;
  options: Option[]; // Array of options for the dropdown
  onChange: (selectedValue: string) => void; // Callback function when an option is selected
  defaultValue?: string; // Optional default value
}

const Select: React.FC<SelectProps> = ({ className, defaultLabel, label, options, onChange, defaultValue = '' }) => {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value); // Update the internal state
    onChange(value); // Trigger the callback with the selected value
  };

  return (
      <select
        id="generic-select"
        value={selectedValue}
        onChange={handleSelectChange}
        className={className || "generic-select-dropdown"}
      >
        <option value="">{defaultLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
  );
};

export default Select;
