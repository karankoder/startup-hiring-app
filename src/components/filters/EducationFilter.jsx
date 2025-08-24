import React from 'react';
import { GraduationCap } from 'lucide-react';
import Select from '../ui/Select';

const EducationFilter = ({ value, onChange }) => {
    const educationOptions = [
        { value: 'PhD', label: 'PhD / Doctorate' },
        { value: "Master's Degree", label: "Master's Degree" },
        { value: "Bachelor's Degree", label: "Bachelor's Degree" },
        { value: 'Associate Degree', label: 'Associate Degree' },
        { value: 'High School', label: 'High School Diploma' },
        { value: 'Other', label: 'Other / Self-taught' }
    ];

    return (
        <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                Education Level
            </h4>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                options={educationOptions}
                placeholder="All Education Levels"
            />
        </div>
    );
};

export default EducationFilter;