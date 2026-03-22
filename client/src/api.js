const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const fetchProjects = () =>
  fetch(`${BASE}/api/projects`).then((r) => {
    if (!r.ok) throw new Error('Failed to fetch projects');
    return r.json();
  });

export const fetchSkills = () =>
  fetch(`${BASE}/api/skills`).then((r) => {
    if (!r.ok) throw new Error('Failed to fetch skills');
    return r.json();
  });

export const fetchExperience = () =>
  fetch(`${BASE}/api/experience`).then((r) => {
    if (!r.ok) throw new Error('Failed to fetch experience');
    return r.json();
  });

export const postContact = (data) =>
  fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((r) => r.json());
