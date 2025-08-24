import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import Select from '../ui/Select';

const SortFilter = ({ value, onChange }) => {
    const sortOptions = [
        { value: 'score', label: 'Highest Score' },
        { value: 'diversity', label: 'Most Diverse' },
        { value: 'salary-high', label: 'Salary: High to Low' },
        { value: 'salary-low', label: 'Salary: Low to High' },
        { value: 'experience', label: 'Most Experience' },
        { value: 'name', label: 'Name: A to Z' },
        { value: 'recent', label: 'Recently Applied' }
    ];

    return (
        <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 flex items-center">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Sort By
            </h4>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                options={sortOptions}
                placeholder="Sort candidates by..."
            />
        </div>
    );
};

export default SortFilter;