import React from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import SearchFilter from '../filters/SearchFilter';
import LocationFilter from '../filters/LocationFilter';
import SalaryFilter from '../filters/SalaryFilter';
import EducationFilter from '../filters/EducationFilter';
import SortFilter from '../filters/SortFilter';

const Sidebar = ({
    isOpen,
    onClose,
    filters,
    onFilterChange,
    onClearFilters,
    candidateCount = 0
}) => {
    const handleFilterChange = (key, value) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const hasActiveFilters = Object.values(filters).some(value =>
        value && value !== '' && value !== 'score'
    );

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="flex flex-col h-full">
                    {/* Sidebar header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
                        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            icon={X}
                            aria-label="Close sidebar"
                        />
                    </div>

                    {/* Filter content */}
                    <div className="flex-1 overflow-y-auto py-6">
                        <div className="px-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Filters
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {candidateCount} candidates
                                </span>
                            </div>

                            <div className="space-y-6">
                                <SearchFilter
                                    value={filters.search || ''}
                                    onChange={(value) => handleFilterChange('search', value)}
                                />

                                <LocationFilter
                                    value={filters.location || ''}
                                    onChange={(value) => handleFilterChange('location', value)}
                                />

                                <SalaryFilter
                                    minValue={filters.salaryMin || ''}
                                    maxValue={filters.salaryMax || ''}
                                    onMinChange={(value) => handleFilterChange('salaryMin', value)}
                                    onMaxChange={(value) => handleFilterChange('salaryMax', value)}
                                />

                                <EducationFilter
                                    value={filters.education || ''}
                                    onChange={(value) => handleFilterChange('education', value)}
                                />

                                <SortFilter
                                    value={filters.sortBy || 'score'}
                                    onChange={(value) => handleFilterChange('sortBy', value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Clear filters button */}
                    {hasActiveFilters && (
                        <div className="p-4 border-t border-gray-200">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onClearFilters}
                                className="w-full"
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;