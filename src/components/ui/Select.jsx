import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({
    value,
    onChange,
    options = [],
    placeholder = 'Select an option',
    className = '',
    label,
    error,
    ...props
}) => {
    const baseClasses = 'w-full px-3 py-2 border rounded-lg bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none';
    const errorClasses = error
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-blue-500';

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className={`${baseClasses} ${errorClasses} ${className}`}
                    {...props}
                >
                    <option value="">{placeholder}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value || option}>
                            {option.label || option}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Select;