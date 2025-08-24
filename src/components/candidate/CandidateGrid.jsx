import React from 'react';
import CandidateCard from './CandidateCard';
import { Users } from 'lucide-react';

const CandidateGrid = ({
    candidates = [],
    selectedCandidates = [],
    onSelectCandidate,
    onViewCandidate,
    loading = false,
    maxSelection = 5
}) => {
    const isSelected = (candidate) =>
        selectedCandidates.some(selected => selected.id === candidate.id);

    const isDisabled = (candidate) =>
        !isSelected(candidate) && selectedCandidates.length >= maxSelection;

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (candidates.length === 0) {
        return (
            <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {candidates.map((candidate, index) => (
                <CandidateCard
                    key={index}
                    candidate={candidate}
                    isSelected={isSelected(candidate)}
                    onSelect={onSelectCandidate}
                    onViewDetails={onViewCandidate}
                    disabled={isDisabled(candidate)}
                />
            ))}
        </div>
    );
};

export default CandidateGrid;