import api from './axios';

export const loginUser = (data) => api.post('/auth/signin', data);
export const registerUser = (data) => api.post('/auth/signup', data);