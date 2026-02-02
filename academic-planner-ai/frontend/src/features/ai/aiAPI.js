import api from '../../services/api';

export const aiAPI = {
  getTips: async () => {
    const response = await api.get('/ai/tips');
    return response.data;
  },
};
