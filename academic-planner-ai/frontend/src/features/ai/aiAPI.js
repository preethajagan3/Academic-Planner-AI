import api from '../../services/api';

export const aiAPI = {
  getTips: async () => {
    const response = await api.get('/api/ai/tips');
    return response.data;
  },
};

