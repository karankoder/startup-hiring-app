import { useState, useCallback, useEffect } from 'react';

const useTeamSelection = (maxTeamSize = 5) => {
  const [selectedCandidates, setSelectedCandidates] = useState(() => {
    const storedCandidates = localStorage.getItem('selectedCandidates');
    return storedCandidates ? JSON.parse(storedCandidates) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      'selectedCandidates',
      JSON.stringify(selectedCandidates)
    );
  }, [selectedCandidates]);

  const toggleCandidate = useCallback(
    (candidate) => {
      setSelectedCandidates((prev) => {
        const isSelected = prev.some((c) => c.id === candidate.id);

        if (isSelected) {
          return prev.filter((c) => c.id !== candidate.id);
        } else {
          if (prev.length < maxTeamSize) {
            return [...prev, candidate];
          }
          return prev;
        }
      });
    },
    [maxTeamSize]
  );

  const removeCandidate = useCallback((candidate) => {
    setSelectedCandidates((prev) => prev.filter((c) => c.id !== candidate.id));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCandidates([]);
  }, []);

  const isSelected = useCallback(
    (candidate) => {
      return selectedCandidates.some((c) => c.id === candidate.id);
    },
    [selectedCandidates]
  );

  const isMaxReached = selectedCandidates.length >= maxTeamSize;

  const isTeamComplete = selectedCandidates.length === maxTeamSize;

  const selectionCount = selectedCandidates.length;

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
