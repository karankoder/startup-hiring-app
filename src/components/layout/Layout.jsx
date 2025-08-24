import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SelectedTeamPanel from '../candidate/SelectedTeamPanel';

const Layout = ({
    children,
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    filters,
    onFilterChange,
    onClearFilters,
    selectedCandidates = [],
    candidateCount = 0,
    onRemoveCandidate
}) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                sidebarOpen={sidebarOpen}
                toggleSidebar={toggleSidebar}
                selectedCount={selectedCandidates.length}
                maxSelection={5}
            />

            <div className="flex h-[calc(100vh-4rem)]">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={closeSidebar}
                    filters={filters}
                    onFilterChange={onFilterChange}
                    onClearFilters={onClearFilters}
                    candidateCount={candidateCount}
                />

                <main className={`
                    flex-1 overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}
                    `}>
                    <div className="h-full overflow-y-auto">
                        {selectedCandidates.length > 0 && (
                            <SelectedTeamPanel
                                selectedCandidates={selectedCandidates}
                                onRemoveCandidate={onRemoveCandidate}
                            />
                        )}

                        <div className="p-6">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;