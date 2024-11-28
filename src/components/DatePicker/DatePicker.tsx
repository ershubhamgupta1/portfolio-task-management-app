import React, { useState } from 'react';
import './DatePicker.css';

interface DatePickerProps {
  selectedDate?: Date; // Optional pre-selected date as a Date object
  onDateChange: (date: Date) => void; // Callback when the date changes
  label?: string;
  classes?:string
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange, label, classes='' }) => {
  const [date, setDate] = useState<Date | undefined>(selectedDate);

  // Helper function to format date
  const formatDate = (dateObj: Date | undefined): string => {
    if (!dateObj) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: '2-digit',
    }).format(dateObj);
  };

  // Helper function to convert a Date object to ISO string for input[type="date"]
  const toISOStringForInput = (dateObj: Date | undefined): string => {
    if (!dateObj) return '';
    return dateObj.toISOString().split('T')[0]; // Extract only the date part
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value); // Create a Date object from the input value
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div className={`${classes} date-picker`}>
    {label && <label htmlFor="task-date" className="date-label">{label}</label>}
      <input
        type="date"
        id="task-date"
        value={toISOStringForInput(date)}
        onChange={handleDateChange}
        className="date-input"
      />
    </div>
  );
};

export default DatePicker;
