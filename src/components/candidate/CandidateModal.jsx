import React from 'react';
import { MapPin, Phone, Mail, DollarSign, Calendar, Star } from 'lucide-react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const CandidateModal = ({
    candidate,
    isOpen,
    onClose,
    isSelected = false,
    onSelect,
    disabled = false
}) => {
    if (!candidate) return null;

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
                .toString()
                .padStart(2, '0')}/${date.getFullYear()}`;
        } catch {
            return dateString;
        }
    };

    const formatSalary = (salary) => {
        if (!salary) return 'Not specified';
        return typeof salary === 'string' ? salary : `${salary.toLocaleString()}`;
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={candidate.name}
            size="lg"
        >
            <div className="space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                        <div className="space-y-2">
                            <p className="flex items-center text-gray-600">
                                <Mail className="w-4 h-4 mr-2" />
                                {candidate.email}
                            </p>
                            {candidate.phone && (
                                <p className="flex items-center text-gray-600">
                                    <Phone className="w-4 h-4 mr-2" />
                                    {candidate.phone}
                                </p>
                            )}
                            <p className="flex items-center text-gray-600">
                                <MapPin className="w-4 h-4 mr-2" />
                                {candidate.location}
                            </p>
                            {candidate.submitted_at && (
                                <p className="flex items-center text-gray-600">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Applied: {formatDate(candidate.submitted_at)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Key Metrics</h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Overall Score:</span>
                                <Badge variant={candidate.score >= 80 ? 'success' : candidate.score >= 60 ? 'warning' : 'danger'}>
                                    {candidate.score || 0}/100
                                </Badge>
                            </div>
                            {candidate.diversity && (
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Diversity Score:</span>
                                    <Badge variant="primary">{candidate.diversity}/100</Badge>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Salary Expectation:</span>
                                <span className="text-gray-900">
                                    {formatSalary(candidate.annual_salary_expectation?.["full-time"])}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Availability */}
                {candidate.work_availability && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Availability</h3>
                        <div className="flex flex-wrap gap-2">
                            {candidate.work_availability.map((availability, idx) => (
                                <Badge key={idx} variant="outline">
                                    {availability}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {candidate.education && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Education</h3>
                        <div className="space-y-3">
                            {candidate.education.degrees?.map((degree, idx) => (
                                <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {degree.degree} in {degree.subject}
                                            </p>
                                            <p className="text-gray-600">{degree.school}</p>
                                            {degree.originalSchool && degree.originalSchool !== degree.school && (
                                                <p className="text-sm text-gray-500">({degree.originalSchool})</p>
                                            )}
                                            <p className="text-sm text-gray-500">
                                                {degree.startDate} - {degree.endDate}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            {degree.gpa && (
                                                <Badge variant="outline" size="sm">
                                                    {degree.gpa}
                                                </Badge>
                                            )}
                                            {degree.isTop50 && (
                                                <Badge variant="success" size="sm" className="ml-2">
                                                    <Star className="w-3 h-3 mr-1" />
                                                    Top 50
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )) || (
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="font-semibold text-gray-900">{candidate.education.highest_level}</p>
                                    </div>
                                )}
                        </div>
                    </div>
                )}

                {/* Work Experience */}
                {candidate.work_experiences && candidate.work_experiences.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Work Experience</h3>
                        <div className="space-y-3">
                            {candidate.work_experiences.map((exp, idx) => (
                                <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-900">{exp.roleName}</p>
                                            <p className="text-gray-600">{exp.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {candidate.skills && candidate.skills.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, idx) => (
                                <Badge key={idx} variant="primary">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        variant={isSelected ? "success" : "primary"}
                        onClick={() => onSelect(candidate)}
                        disabled={disabled}
                    >
                        {isSelected ? 'Selected' : 'Select Candidate'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CandidateModal;