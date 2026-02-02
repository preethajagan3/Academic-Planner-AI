import api from '../../services/api';

export const notificationAPI = {
    getNotifications: async () => {
        const response = await api.get('/notifications');
        return response.data;
    },
    checkDeadlines: async () => {
        const response = await api.post('/notifications/check');
        return response.data;
    },
    markAsRead: async (id) => {
        const response = await api.put(`/notifications/${id}/read`);
        return response.data;
    },
    clearAll: async () => {
        const response = await api.delete('/notifications/clear');
        return response.data;
    },
};


