import api from './axios';

export const fetchTeamHeads = () => api.get('/admin/heads');