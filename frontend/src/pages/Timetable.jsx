import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import {
  getTimetable,
  createTimetableEntry,
  updateTimetableEntry,
  deleteTimetableEntry,
  reset,
} from '../features/timetable/timetableSlice';
import { formatTimeTo12Hour } from '../utils/timeFormat';
import { XIcon, LocationMarkerIcon } from '../components/Icons';

const Timetable = () => {
  const dispatch = useDispatch();
  const { entries, isLoading, isError, isSuccess, message } = useSelector((state) => state.timetable);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    day: '',
    startTime: '',
    endTime: '',
    subject: '',
    location: '',
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = [];
  for (let i = 8; i <= 21; i++) {
    timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
  }

  useEffect(() => {
    dispatch(getTimetable());
  }, [dispatch]);

  useEffect(() => {
    if (isError) alert(message);
    if (isSuccess) {
      setShowForm(false);
      setEditingId(null);
      setFormData({ day: '', startTime: '', endTime: '', subject: '', location: '' });
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateTimetableEntry({ id: editingId, entryData: formData }));
    } else {
      dispatch(createTimetableEntry(formData));
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setFormData({
      day: entry.day,
      startTime: entry.startTime,
      endTime: entry.endTime,
      subject: entry.subject,
      location: entry.location || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this entry?')) {
      dispatch(deleteTimetableEntry(id));
      setShowForm(false);
    }
  };

  const getEntryForCell = (day, time) => {
    return entries.filter(entry => {
      const entryStart = entry.startTime.split(':')[0];
      return entry.day === day && entryStart === time.split(':')[0];
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300">
      <Navbar />
      <Sidebar />

      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Academic Schedule</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium italic">Professional Weekly Overview</p>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                if (!showForm) {
                  setEditingId(null);
                  setFormData({ day: '', startTime: '', endTime: '', subject: '', location: '' });
                }
              }}
              className="px-8 py-3 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-200 dark:shadow-none active:scale-95 flex items-center justify-center gap-2"
            >
              {showForm ? <><XIcon className="w-5 h-5" /> Close Form</> : '+ Add New Session'}
            </button>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="mb-12 animate-fade-in neon-card p-10">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {editingId ? 'Modify Session Details' : 'New Academic Session'}
                </h3>
                {editingId && (
                  <button
                    onClick={() => handleDelete(editingId)}
                    className="text-red-500 font-bold hover:underline text-sm"
                  >
                    Delete Entry
                  </button>
                )}
              </div>
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Day of Week</label>
                    <select name="day" value={formData.day} onChange={onChange} required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white">
                      <option value="">Select Day</option>
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Start Time</label>
                    <input type="time" name="startTime" value={formData.startTime} onChange={onChange} required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">End Time</label>
                    <input type="time" name="endTime" value={formData.endTime} onChange={onChange} required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Subject / Activity</label>
                    <input type="text" name="subject" value={formData.subject} onChange={onChange} required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white" placeholder="e.g. Advanced Calculus" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={onChange} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white" placeholder="e.g. Lecture Hall B" />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-200 dark:shadow-none">
                    {editingId ? 'Update Session' : 'Save Session'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tabular Timetable */}
          <div className="neon-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse">
                <thead>
                  <tr>
                    <th className="p-6 bg-slate-50 dark:bg-slate-800/50 text-left text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 w-24">Time</th>
                    {days.map(day => (
                      <th key={day} className="p-6 bg-slate-50 dark:bg-slate-800/50 text-center text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(time => (
                    <tr key={time} className="border-b border-slate-50 dark:border-slate-800/50 group">
                      <td className="p-6 text-sm font-bold text-slate-400 dark:text-slate-500 align-top">
                        {formatTimeTo12Hour(time)}
                      </td>
                      {days.map(day => {
                        const cellEntries = getEntryForCell(day, time);
                        return (
                          <td key={`${day}-${time}`} className="p-2 border-l border-slate-50 dark:border-slate-800/50 min-h-[100px] align-top bg-white/50 dark:bg-slate-900/30 group-hover:bg-slate-50/50 dark:group-hover:bg-slate-800/30 transition-colors">
                            <div className="space-y-2 min-h-[60px]">
                              {cellEntries.map((entry, i) => (
                                <div
                                  key={i}
                                  onClick={() => handleEdit(entry)}
                                  className="p-3 bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30 rounded-xl cursor-pointer hover:scale-[1.02] transition-transform"
                                >
                                  <p className="text-xs font-bold text-primary-700 dark:text-primary-300 leading-tight mb-1">{entry.subject}</p>
                                  <div className="flex items-center justify-between opacity-70">
                                    <span className="text-[10px] font-bold text-primary-600 dark:text-primary-400">{formatTimeTo12Hour(entry.startTime)} - {formatTimeTo12Hour(entry.endTime)}</span>
                                    {entry.location && <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1"><LocationMarkerIcon className="w-3 h-3" /> {entry.location}</span>}
                                  </div>
                                </div>
                              ))}
                              {cellEntries.length === 0 && (
                                <button
                                  onClick={() => {
                                    setShowForm(true);
                                    setEditingId(null);
                                    setFormData({ ...formData, day, startTime: time, endTime: `${(parseInt(time) + 1).toString().padStart(2, '0')}:00` });
                                  }}
                                  className="w-full h-full min-h-[40px] opacity-0 group-hover:opacity-100 flex items-center justify-center text-primary-500 text-xl font-bold bg-primary-50/30 rounded-xl hover:bg-primary-50 transition-all border-2 border-dashed border-primary-100"
                                >
                                  +
                                </button>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timetable;
