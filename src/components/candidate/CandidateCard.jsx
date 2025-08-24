import { MapPin, GraduationCap, Briefcase, Eye, CheckCircle, Users, Mail, Phone } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const CandidateCard = ({
    candidate,
    isSelected = false,
    onSelect,
    onViewDetails,
    disabled = false
}) => {
    const getScoreColor = (score) => {
        if (score >= 80) return 'success';
        if (score >= 60) return 'warning';
        return 'danger';
    };

    const formatSalary = (salary) => {
        if (!salary) return 'Not specified';
        return typeof salary === 'string' ? salary : `$${salary.toLocaleString()}`;
    };

    return (
        <div className={`flex items-start bg-white rounded-lg shadow-md p-6 border-2 transition-all duration-200 hover:shadow-lg
      ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
            {/* Left Section: Candidate Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {candidate.name}
                </h3>
                <p className="text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{candidate.location}</span>
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-1">Expected Salary:</span>
                        <span className="truncate">
                            {formatSalary(candidate.annual_salary_expectation?.["full-time"])}
                        </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">
                            {candidate.education?.highest_level || 'Not specified'}
                        </span>
                    </div>
                    {candidate.phone && (
                        <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span>{candidate.phone}</span>
                        </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">
                            {candidate.work_experiences?.length || 0} roles
                        </span>
                    </div>
                    {candidate.email && (
                        <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span>{candidate.email}</span>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Top Skills:</p>
                    <div className="flex flex-wrap gap-2">
                        {(candidate.topSkills || candidate.skills || []).slice(0, 3).map((skill, idx) => (
                            <Badge key={idx} variant="default" size="sm">
                                {skill}
                            </Badge>
                        ))}
                        {(candidate.skills?.length || 0) > 3 && (
                            <Badge variant="outline" size="sm">
                                +{(candidate.skills?.length || 0) - 3} more
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Section: Actions */}
            <div className="flex flex-col items-end space-y-4 ml-6">
                <Badge variant={getScoreColor(candidate.score || 0)}>
                    Score: {candidate.score || 0}
                </Badge>
                <div className="flex space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(candidate)}
                        icon={Eye}
                    >
                        View Details
                    </Button>
                    <Button
                        variant={isSelected ? "success" : "primary"}
                        size="sm"
                        onClick={() => onSelect(candidate)}
                        disabled={disabled}
                        icon={isSelected ? CheckCircle : undefined}
                    >
                        {isSelected ? 'Selected' : 'Select'}
                    </Button>
                </div>
                {candidate.work_availability && (
                    <div className="flex flex-wrap gap-1 mt-3">
                        {candidate.work_availability.map((availability, idx) => (
                            <Badge key={idx} variant="outline" size="sm">
                                {availability}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CandidateCard;