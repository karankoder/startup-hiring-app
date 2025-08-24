import React from 'react';
import { Search } from 'lucide-react';
import Input from '../ui/Input';

const SearchFilter = ({ value, onChange }) => {
    return (
        <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 flex items-center">
                <Search className="w-4 h-4 mr-2" />
                Search
            </h4>
            <Input
                type="text"
                placeholder="Search candidates, skills, locations..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                icon={Search}
            />
        </div>
    );
};

export default SearchFilter;
