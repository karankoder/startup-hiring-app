import React from 'react';
import { Menu, X, Users } from 'lucide-react';
import Button from '../ui/Button';

const Header = ({ sidebarOpen, toggleSidebar, selectedCount = 0, maxSelection = 5 }) => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 z-40">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleSidebar}
                            icon={sidebarOpen ? X : Menu}
                            className="lg:hidden mr-2"
                            aria-label="Toggle sidebar"
                        />

                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="ml-3">
                                <h1 className="text-xl font-bold text-gray-900">
                                    Hiring Dashboard
                                </h1>
                                <p className="text-sm text-gray-500">
                                    $100M Seed Round
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Selected:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${selectedCount === maxSelection
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                                }`}>
                                {selectedCount}/{maxSelection}
                            </span>
                        </div>

                        {selectedCount > 0 && (
                            <Button
                                variant="success"
                                size="sm"
                                disabled={selectedCount !== maxSelection}
                            >
                                {selectedCount === maxSelection ? 'Complete Team' : 'Finalize Team'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;