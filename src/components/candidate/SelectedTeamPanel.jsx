import React from 'react';
import { CheckCircle, X, Users } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const SelectedTeamPanel = ({ selectedCandidates = [], onRemoveCandidate }) => {
    if (selectedCandidates.length === 0) return null;

    const isTeamComplete = selectedCandidates.length === 5;

    return (
        <div className={`
      border-b mb-6
      ${isTeamComplete ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}
    `}>
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex items-center mr-4">
                            {isTeamComplete ? (
                                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            ) : (
                                <Users className="w-5 h-5 text-blue-600 mr-2" />
                            )}
                            <h2 className={`text-lg font-semibold ${isTeamComplete ? 'text-green-800' : 'text-blue-800'
                                }`}>
                                Your Team ({selectedCandidates.length}/5)
                                {isTeamComplete && <span className="ml-2">- Complete!</span>}
                            </h2>
                        </div>
                    </div>

                    {isTeamComplete && (
                        <Button variant="success" size="md">
                            Proceed with Team
                        </Button>
                    )}
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {selectedCandidates.map((candidate) => (
                        <div key={candidate.id} className="bg-white p-3 rounded-lg border border-gray-200 relative group">
                            <button
                                onClick={() => onRemoveCandidate(candidate)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                aria-label={`Remove ${candidate.name}`}
                            >
                                <X className="w-3 h-3" />
                            </button>

                            <div className="pr-3">
                                <p className="font-medium text-sm text-gray-900 truncate">
                                    {candidate.name}
                                </p>
                                <p className="text-xs text-gray-600 truncate">
                                    {candidate.location}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                    <Badge variant="primary" size="sm">
                                        {candidate.score || 0}
                                    </Badge>
                                    {/* Removed experienceYears */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectedTeamPanel;