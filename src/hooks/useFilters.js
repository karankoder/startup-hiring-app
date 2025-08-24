import { useState, useMemo } from 'react';

const useFilters = (candidates = []) => {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    education: '',
    availability: '',
    skills: '',
    sortBy: 'score',
  });

  // Filter and sort candidates
  const filteredCandidates = useMemo(() => {
    let filtered = [...candidates];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (candidate) =>
          candidate.name?.toLowerCase().includes(searchTerm) ||
          candidate.location?.toLowerCase().includes(searchTerm) ||
          candidate.skills?.some((skill) =>
            skill.toLowerCase().includes(searchTerm)
          ) ||
          candidate.work_experiences?.some(
            (exp) =>
              exp.company?.toLowerCase().includes(searchTerm) ||
              exp.roleName?.toLowerCase().includes(searchTerm)
          )
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter((candidate) =>
        candidate.location
          ?.toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    // Apply salary filters
    if (filters.salaryMin || filters.salaryMax) {
      filtered = filtered.filter((candidate) => {
        const salary = parseInt(
          candidate.annual_salary_expectation?.['full-time']?.replace(
            /[$,]/g,
            ''
          ) || '0'
        );

        const meetsMin =
          !filters.salaryMin || salary >= parseInt(filters.salaryMin);
        const meetsMax =
          !filters.salaryMax || salary <= parseInt(filters.salaryMax);

        return meetsMin && meetsMax;
      });
    }

    // Apply education filter
    if (filters.education) {
      filtered = filtered.filter(
        (candidate) => candidate.education?.highest_level === filters.education
      );
    }

    // Apply availability filter
    if (filters.availability) {
      filtered = filtered.filter((candidate) =>
        candidate.work_availability?.includes(filters.availability)
      );
    }

    // Apply skills filter
    if (filters.skills) {
      const skillsTerm = filters.skills.toLowerCase();
      filtered = filtered.filter((candidate) =>
        candidate.skills?.some((skill) =>
          skill.toLowerCase().includes(skillsTerm)
        )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'score':
          return (b.score || 0) - (a.score || 0);

        case 'diversity':
          return (b.diversity || 0) - (a.diversity || 0);

        case 'salary-high':
          const salaryA = parseInt(
            a.annual_salary_expectation?.['full-time']?.replace(/[$,]/g, '') ||
              '0'
          );
          const salaryB = parseInt(
            b.annual_salary_expectation?.['full-time']?.replace(/[$,]/g, '') ||
              '0'
          );
          return salaryB - salaryA;

        case 'salary-low':
          const salaryA2 = parseInt(
            a.annual_salary_expectation?.['full-time']?.replace(/[$,]/g, '') ||
              '0'
          );
          const salaryB2 = parseInt(
            b.annual_salary_expectation?.['full-time']?.replace(/[$,]/g, '') ||
              '0'
          );
          return salaryA2 - salaryB2;

        case 'experience':
          return (b.experienceYears || 0) - (a.experienceYears || 0);

        case 'name':
          return (a.name || '').localeCompare(b.name || '');

        case 'recent':
          return new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0);

        default:
          return 0;
      }
    });

    return filtered;
  }, [candidates, filters]);

  // Clear all filters except sortBy
  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      salaryMin: '',
      salaryMax: '',
      education: '',
      availability: '',
      skills: '',
      sortBy: 'score',
    });
  };

  // Update individual filter
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      if (key === 'sortBy') return false; // sortBy doesn't count as active filter
      return value && value !== '';
    });
  }, [filters]);

  return {
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    filteredCandidates,
    hasActiveFilters,
  };
};

export default useFilters;
