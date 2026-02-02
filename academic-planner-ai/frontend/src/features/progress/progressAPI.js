import api from '../../services/api';

export const progressAPI = {
  getProgress: async () => {
    const response = await api.get('/api/progress');
    return response.data;
  },

  createProgress: async (progressData) => {
    const response = await api.post('/api/progress', progressData);
    return response.data;
  },

  updateProgress: async (id, progressData) => {
    const response = await api.put(`/api/progress/${id}`, progressData);
    return response.data;
  },

  deleteProgress: async (id) => {
    const response = await api.delete(`/api/progress/${id}`);
    return response.data;
  },
};

