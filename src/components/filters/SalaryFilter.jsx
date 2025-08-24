import React from 'react';
import { DollarSign } from 'lucide-react';
import Input from '../ui/Input';

const SalaryFilter = ({ minValue, maxValue, onMinChange, onMaxChange }) => {
    return (
        <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Salary Range
            </h4>
            <div className="space-y-3">
                <Input
                    type="number"
                    placeholder="Min Salary"
                    value={minValue}
                    onChange={(e) => onMinChange(e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Max Salary"
                    value={maxValue}
                    onChange={(e) => onMaxChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SalaryFilter;