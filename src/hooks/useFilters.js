import { useState, useMemo } from 'react';

const useFilters = (candidates = [], requiredSkills = [], budget = 0) => {
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

  const filteredCandidates = useMemo(() => {
    let filtered = [...candidates];

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

    if (filters.location) {
      filtered = filtered.filter((candidate) =>
        candidate.location
          ?.toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

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

    if (filters.education) {
      filtered = filtered.filter(
        (candidate) => candidate.education?.highest_level === filters.education
      );
    }

    if (filters.availability) {
      filtered = filtered.filter((candidate) =>
        candidate.work_availability?.includes(filters.availability)
      );
    }

    if (filters.skills) {
      const skillsTerm = filters.skills.toLowerCase();
      filtered = filtered.filter((candidate) =>
        candidate.skills?.some((skill) =>
          skill.toLowerCase().includes(skillsTerm)
        )
      );
    }

    const calculateCandidateScore = (candidate, requiredSkills, budget) => {
      let score = 0;

      const matchedSkills = candidate.skills.filter((skill) =>
        requiredSkills.includes(skill)
      ).length;
      score += (matchedSkills / requiredSkills.length) * 40;

      const experienceCount = candidate.work_experiences.length;
      score += Math.min(experienceCount, 10) * 3;

      const highestLevel = candidate.education.highest_level || '';
      if (highestLevel.includes('PhD')) score += 20;
      else if (highestLevel.includes('Master')) score += 15;
      else if (highestLevel.includes('Bachelor')) score += 10;

      const expectedSalary = parseInt(
        candidate.annual_salary_expectation?.['full-time']?.replace(
          /[$,]/g,
          ''
        ) || '0'
      );
      if (expectedSalary <= budget) score += 10;
      else {
        const over = expectedSalary - budget;
        score += Math.max(0, 10 - (over / budget) * 10);
      }

      return Math.round(score);
    };

    const candidatesWithScore = filtered.map((candidate) => {
      const score = calculateCandidateScore(candidate, requiredSkills, budget);
      console.log(`Candidate: ${candidate.name}, Score: ${score}`);
      return { ...candidate, score };
    });

    candidatesWithScore.sort((a, b) => {
      switch (filters.sortBy) {
        case 'score':
          return (b.score || 0) - (a.score || 0);

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
          const expA = a.work_experiences?.length || 0;
          const expB = b.work_experiences?.length || 0;
          return expB - expA;

        case 'name':
          return (a.name || '').localeCompare(b.name || '');

        case 'recent':
          return new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0);

        default:
          return 0;
      }
    });

    return candidatesWithScore;
  }, [candidates, filters]);

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

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      if (key === 'sortBy') return false;
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
