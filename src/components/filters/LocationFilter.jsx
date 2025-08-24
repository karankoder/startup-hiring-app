import React from 'react';
import { MapPin } from 'lucide-react';
import Select from '../ui/Select';

const LocationFilter = ({ value, onChange }) => {
    const locationOptions = [
        'San Francisco, CA',
        'New York, NY',
        'Los Angeles, CA',
        'Chicago, IL',
        'Austin, TX',
        'Seattle, WA',
        'Boston, MA',
        'Denver, CO',
        'Atlanta, GA',
        'Remote',
        'International'
    ];

    return (
        <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location
            </h4>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                options={locationOptions}
                placeholder="All Locations"
            />
        </div>
    );
};

export default LocationFilter;