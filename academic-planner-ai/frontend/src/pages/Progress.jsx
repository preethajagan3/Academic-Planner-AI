import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import { ChartIcon, TargetIcon, PencilIcon, TrashIcon, BookIcon, BeakerIcon, AcademicCapIcon, SparklesIcon, CodeIcon } from '../components/Icons';
import {
  getProgress,
  createProgress,
  updateProgress,
  deleteProgress,
  reset,
} from '../features/progress/progressSlice';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const getLocalDate = (date = new Date()) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Progress = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess, message } = useSelector((state) => state.progress);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    hours: '',
    date: getLocalDate(),
    notes: '',
  });

  const CHART_COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#F59E0B', '#10B981'];

  useEffect(() => {
    dispatch(getProgress());
  }, [dispatch]);

  useEffect(() => {
    if (isError) alert(message);
    if (isSuccess) {
      setShowForm(false);
      setEditingId(null);
      setFormData({ subject: '', hours: '', date: getLocalDate(), notes: '' });
      dispatch(getProgress());
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
      dispatch(updateProgress({ id: editingId, progressData: formData }));
    } else {
      dispatch(createProgress(formData));
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      subject: item.subject || 'General Study',
      hours: item.hours || item.studyHours || 0,
      date: getLocalDate(item.date),
      notes: item.notes || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Erase this milestone?')) {
      dispatch(deleteProgress(id));
    }
  };

  const totalHours = data.reduce((sum, item) => sum + (parseFloat(item.hours || item.studyHours || 0)), 0);

  const sortedData = [...data].sort(
    (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
  );

  const weeklyData = (() => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = getLocalDate(date);
      last7Days.push({ day: weekDays[date.getDay()], hours: 0, date: dateStr });
    }
    data.forEach((item) => {
      let itemDateStr = item.date ? new Date(item.date).toISOString().split('T')[0] : getLocalDate(item.createdAt);
      const dayData = last7Days.find(d => d.date === itemDateStr);
      if (dayData) dayData.hours += parseFloat(item.hours || item.studyHours || 0);
    });
    return last7Days;
  })();

  const avgHoursPerDay = (weeklyData.reduce((sum, d) => sum + d.hours, 0) / 7).toFixed(1);

  const growthData = (() => {
    let cumulative = 0;
    return weeklyData.map(d => {
      cumulative += d.hours;
      return { ...d, cumulative };
    });
  })();

  const predictionData = (() => {
    const last3DaysAvg = weeklyData.slice(-3).reduce((sum, d) => sum + d.hours, 0) / 3;
    const trend = (weeklyData[6].hours - weeklyData[0].hours) / 6;

    const predictions = [];
    for (let i = 1; i <= 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
      const predictedHours = Math.max(0, last3DaysAvg + (trend * i));
      predictions.push({ day: dayName, hours: parseFloat(predictedHours.toFixed(1)) });
    }
    return predictions;
  })();

  const pieData = (() => {
    const subjects = {};
    data.forEach(item => {
      const subject = item.subject || 'Other';
      subjects[subject] = (subjects[subject] || 0) + (parseFloat(item.hours || item.studyHours || 0));
    });
    return Object.entries(subjects).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(1)) }));
  })();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <Sidebar />

      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header & Main Stat */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h2 className="text-4xl font-bold text-slate-900 mb-2">Academic Pulse</h2>
              <p className="text-slate-500 font-medium mb-8 uppercase tracking-widest text-xs">Visualization of your academic journey.</p>
              <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary-100/50 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary-200 transition-colors"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Daily Study Velocity</p>
                    <div className="flex items-baseline gap-4">
                      <span className="text-7xl font-black text-slate-900 tracking-tighter">{avgHoursPerDay}</span>
                      <span className="text-2xl font-bold text-primary-500">HRS / DAY</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Total Depth</p>
                    <p className="text-2xl font-black text-slate-900">{totalHours.toFixed(1)}h</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-[40px] p-10 flex flex-col justify-between shadow-xl shadow-slate-200">
              <div>
                <h3 className="text-2xl font-black text-white mb-3">Record Progress</h3>
                <p className="text-white text-base mb-8 leading-relaxed">Every hour spent studying is an investment in your future self.</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full py-5 bg-primary-600 hover:bg-primary-700 text-white rounded-3xl font-black uppercase tracking-widest transition-all shadow-xl shadow-primary-900/20 active:scale-95"
              >
                {showForm ? 'Cancel Entry' : '+ Log Session'}
              </button>
            </div>
          </div>

          {showForm && (
            <div className="mb-12 animate-fade-in">
              <div className="bg-white rounded-[40px] p-12 shadow-2xl shadow-slate-200 border border-primary-100">
                <h3 className="text-3xl font-black text-slate-900 mb-10">Session Details</h3>
                <form onSubmit={onSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <label className="block text-sm font-black text-slate-900 uppercase tracking-wider">
                        Domain
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={onChange}
                        required
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-semibold text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="e.g. Mathematics"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-black text-slate-900 uppercase tracking-wider">
                        Duration (Hours)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        name="hours"
                        value={formData.hours}
                        onChange={onChange}
                        required
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-semibold text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none transition-colors"
                        placeholder="e.g. 2.5"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-black text-slate-900 uppercase tracking-wider">
                        Event Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={onChange}
                        required
                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-black text-slate-900 uppercase tracking-wider">
                      Reflections / Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={onChange}
                      rows="4"
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-semibold text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                      placeholder="Summary of topics covered..."
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 btn-primary py-5 rounded-2xl text-lg font-black">
                      Save Milestone
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-10 py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-black text-lg transition-colors"
                    >
                      Discard
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Visualization Layer */}
          {data.length > 0 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="p-2 bg-primary-50 rounded-lg"><ChartIcon className="w-5 h-5 text-primary-600" /></span> Weekly Velocity
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyData}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }} dy={15} />
                      <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Bar dataKey="hours" fill="url(#barGradient)" radius={[10, 10, 10, 10]} barSize={32} />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#818CF8" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="p-2 bg-indigo-50 rounded-lg"><TargetIcon className="w-5 h-5 text-indigo-600" /></span> Domain Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={8} dataKey="value">
                        {pieData.map((_, index) => <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="none" />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm neon-card">
                  <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="p-2 bg-green-50 rounded-lg"><ChartIcon className="w-5 h-5 text-green-600" /></span> Study Growth (Cumulative)
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={growthData}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }} dy={15} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Line type="monotone" dataKey="cumulative" stroke="#10B981" strokeWidth={4} dot={{ r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-slate-900 rounded-[40px] p-10 border border-slate-800 shadow-sm neon-card !bg-slate-900">
                  <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                    <span className="p-2 bg-primary-500/20 rounded-lg"><SparklesIcon className="w-5 h-5 text-primary-400" /></span> AI Study Forecast
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={predictionData}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }} dy={15} />
                      <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                      <Line type="monotone" dataKey="hours" stroke="#6366F1" strokeWidth={4} strokeDasharray="5 5" dot={{ r: 6, fill: '#6366F1', strokeWidth: 2, stroke: '#fff' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {/* History Layer */}
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm overflow-hidden relative">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Study Chronicles</h3>
            {sortedData.length > 0 ? (
              <div className="space-y-4">
                {sortedData.map((item, index) => (
                  <div key={index} className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50/50 rounded-[32px] hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 border border-transparent hover:border-slate-100">
                    <div className="flex gap-6 items-center">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        {[
                          <BookIcon className="w-8 h-8 text-primary-600" />,
                          <BeakerIcon className="w-8 h-8 text-emerald-600" />,
                          <SparklesIcon className="w-8 h-8 text-indigo-600" />,
                          <AcademicCapIcon className="w-8 h-8 text-amber-600" />,
                          <CodeIcon className="w-8 h-8 text-violet-600" />
                        ][index % 5]}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{new Date(item.date || item.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <h4 className="text-xl font-bold text-slate-900 uppercase tracking-tight">{item.subject}</h4>
                        <p className="text-sm text-slate-500 font-medium italic mt-1">{item.notes || 'No focus notes recorded.'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-4 md:mt-0 pl-20 md:pl-0">
                      <div className="text-right">
                        <p className="text-2xl font-black text-primary-600 tracking-tighter">{item.hours || item.studyHours || 0}h</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Focused</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)} className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-all"><PencilIcon className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(item._id)} className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"><TrashIcon className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50/50 rounded-[32px] border-dashed border-2 border-slate-100">
                <p className="text-slate-400 font-bold italic">The chronicles are empty. Time to write your first chapter.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Progress;
