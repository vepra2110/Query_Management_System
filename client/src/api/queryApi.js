import api from './axios';

export const fetchQueries = () => api.get('/queries');
export const createQuery = (data) => api.post('/queries', data);
export const assignQuery = (id, teamHeadId) => api.patch(`/queries/${id}/assign`, { teamHeadId });
export const resolveQuery = (id, answer) => api.patch(`/queries/${id}/resolve`, { answer });
export const rejectQuery = (id) => api.patch(`/queries/${id}/reject`); // Maps to Dismantle