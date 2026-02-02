import api from '../../services/api';

export const notificationAPI = {
    getNotifications: async () => {
        const response = await api.get('/api/notifications');
        return response.data;
    },
    checkDeadlines: async () => {
        const response = await api.post('/api/notifications/check');
        return response.data;
    },
    markAsRead: async (id) => {
        const response = await api.put(`/api/notifications/${id}/read`);
        return response.data;
    },
    clearAll: async () => {
        const response = await api.delete('/api/notifications/clear');
        return response.data;
    },
};

