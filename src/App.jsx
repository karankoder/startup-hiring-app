import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import Layout from './components/layout/Layout';
import CandidateGrid from './components/candidate/CandidateGrid';
import CandidateModal from './components/candidate/CandidateModal';
import useSidebar from './hooks/useSidebar';
import useFilters from './hooks/useFilters';
import useTeamSelection from './hooks/useTeamSelection';

const App = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const { isOpen: sidebarOpen, toggle: toggleSidebar, close: closeSidebar } = useSidebar();
  const {
    selectedCandidates,
    toggleCandidate,
    removeCandidate,
    isSelected,
    isMaxReached
  } = useTeamSelection(5);

  function generateDeterministicId(candidate) {
    const data = candidate.phone + candidate.email;
    return CryptoJS.MD5(data).toString();
  }

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/form_submisson.json');
        if (!response.ok) {
          throw new Error('Failed to fetch candidates data');
        }
        const data = await response.json();
        const candidatesWithIds = data.map((candidate) => ({
          ...candidate,
          id: generateDeterministicId(candidate),
        }));
        setCandidates(candidatesWithIds);
      } catch (error) {
        console.error('Error loading candidates:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

  const {
    filters,
    setFilters,
    clearFilters,
    filteredCandidates
  } = useFilters(candidates);

  const handleSelectCandidate = (candidate) => {
    toggleCandidate(candidate);
  };

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseModal = () => {
    setSelectedCandidate(null);
  };

  const handleRemoveFromTeam = (candidate) => {
    removeCandidate(candidate);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="App">
      <Layout
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        selectedCandidates={selectedCandidates}
        candidateCount={filteredCandidates.length}
        onRemoveCandidate={handleRemoveFromTeam}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Candidates
              </h2>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${filteredCandidates.length} candidates found`}
              </p>
            </div>

            {selectedCandidates.length > 0 && (
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Team Progress: {selectedCandidates.length}/5
                </p>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(selectedCandidates.length / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <CandidateGrid
            candidates={filteredCandidates}
            selectedCandidates={selectedCandidates}
            onSelectCandidate={handleSelectCandidate}
            onViewCandidate={handleViewCandidate}
            loading={loading}
            maxSelection={5}
          />
        </div>
      </Layout>

      <CandidateModal
        candidate={selectedCandidate}
        isOpen={!!selectedCandidate}
        onClose={handleCloseModal}
        isSelected={selectedCandidate ? isSelected(selectedCandidate) : false}
        onSelect={handleSelectCandidate}
        disabled={selectedCandidate ? (!isSelected(selectedCandidate) && isMaxReached) : false}
      />
    </div>
  );
};

export default App;