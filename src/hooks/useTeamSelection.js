import { useState, useCallback, useEffect } from 'react';

const useTeamSelection = (maxTeamSize = 5) => {
  const [selectedCandidates, setSelectedCandidates] = useState(() => {
    // Load initial state from localStorage
    const storedCandidates = localStorage.getItem('selectedCandidates');
    return storedCandidates ? JSON.parse(storedCandidates) : [];
  });

  // Synchronize state with localStorage
  useEffect(() => {
    localStorage.setItem(
      'selectedCandidates',
      JSON.stringify(selectedCandidates)
    );
  }, [selectedCandidates]);

  // Toggle candidate selection
  const toggleCandidate = useCallback(
    (candidate) => {
      setSelectedCandidates((prev) => {
        const isSelected = prev.some((c) => c.id === candidate.id);

        if (isSelected) {
          // Remove candidate
          return prev.filter((c) => c.id !== candidate.id);
        } else {
          // Add candidate if under limit
          if (prev.length < maxTeamSize) {
            return [...prev, candidate];
          }
          // Optionally could replace oldest selection or show error
          return prev;
        }
      });
    },
    [maxTeamSize]
  );

  // Remove specific candidate
  const removeCandidate = useCallback((candidate) => {
    setSelectedCandidates((prev) => prev.filter((c) => c.id !== candidate.id));
  }, []);

  // Clear all selections
  const clearSelection = useCallback(() => {
    setSelectedCandidates([]);
  }, []);

  // Check if candidate is selected
  const isSelected = useCallback(
    (candidate) => {
      return selectedCandidates.some((c) => c.id === candidate.id);
    },
    [selectedCandidates]
  );

  // Check if selection is at maximum
  const isMaxReached = selectedCandidates.length >= maxTeamSize;

  // Check if team is complete
  const isTeamComplete = selectedCandidates.length === maxTeamSize;

  // Get selection count
  const selectionCount = selectedCandidates.length;

  // Calculate team statistics
  const teamStats = {
    averageScore:
      selectedCandidates.length > 0
        ? selectedCandidates.reduce((sum, c) => sum + (c.score || 0), 0) /
          selectedCandidates.length
        : 0,
    totalExperience: selectedCandidates.reduce(
      (sum, c) => sum + (c.experienceYears || 0),
      0
    ),
    uniqueLocations: [...new Set(selectedCandidates.map((c) => c.location))]
      .length,
    skillCoverage: [
      ...new Set(selectedCandidates.flatMap((c) => c.skills || [])),
    ].length,
  };

  return {
    selectedCandidates,
    toggleCandidate,
    removeCandidate,
    clearSelection,
    isSelected,
    isMaxReached,
    isTeamComplete,
    selectionCount,
    teamStats,
    maxTeamSize,
  };
};

export default useTeamSelection;
