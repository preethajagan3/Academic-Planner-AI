import api from '../../services/api';

export const timetableAPI = {
  getTimetable: async () => {
    const response = await api.get('/timetable');
    return response.data;
  },

  createTimetableEntry: async (entryData) => {
    const response = await api.post('/timetable', entryData);
    return response.data;
  },

  updateTimetableEntry: async (id, entryData) => {
    const response = await api.put(`/timetable/${id}`, entryData);
    return response.data;
  },

  deleteTimetableEntry: async (id) => {
    const response = await api.delete(`/timetable/${id}`);
    return response.data;
  },
};


