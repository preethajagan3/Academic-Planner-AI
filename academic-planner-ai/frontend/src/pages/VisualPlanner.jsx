import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    addWeeks,
    subWeeks,
    addDays,
    subDays,
    startOfDay,
    endOfDay,
    parseISO
} from 'date-fns';
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    LayoutGrid,
    Columns,
    Activity,
    Clock,
    Plus,
    X,
    Trash2,
    CheckCircle2,
    Circle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { getTasks, createTask, updateTask, deleteTask, reset } from '../features/tasks/taskSlice';

const VisualPlanner = () => {
    const dispatch = useDispatch();
    const { tasks, isSuccess } = useSelector((state) => state.tasks);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month'); // 'month', 'week', 'day'

    // Task Management State
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        priority: 'medium',
    });

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess && showModal) {
            setShowModal(false);
            setEditingTask(null);
            setFormData({ title: '', description: '', deadline: '', priority: 'medium' });
            dispatch(reset());
        }
    }, [isSuccess, showModal, dispatch]);

    const viewOptions = [
        { id: 'month', name: 'Month', icon: LayoutGrid },
        { id: 'week', name: 'Week', icon: Columns },
        { id: 'day', name: 'Day', icon: Activity },
    ];

    const handlePrev = () => {
        if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
        if (view === 'week') setCurrentDate(subWeeks(currentDate, 1));
        if (view === 'day') setCurrentDate(subDays(currentDate, 1));
    };

    const handleNext = () => {
        if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
        if (view === 'week') setCurrentDate(addWeeks(currentDate, 1));
        if (view === 'day') setCurrentDate(addDays(currentDate, 1));
    };

    const resetToToday = () => setCurrentDate(new Date());

    const getDayTasks = (day) => {
        return tasks.filter(task => task.deadline && isSameDay(new Date(task.deadline), day));
    };

    const handleDayClick = (day) => {
        setFormData({
            ...formData,
            deadline: format(day, 'yyyy-MM-dd'),
        });
        setEditingTask(null);
        setShowModal(true);
    };

    const handleTaskClick = (e, task) => {
        e.stopPropagation();
        setEditingTask(task);
        setFormData({
            title: task.title,
            description: task.description || '',
            deadline: task.deadline ? task.deadline.split('T')[0] : '',
            priority: task.priority || 'medium',
        });
        setShowModal(true);
    };

    const handleToggleComplete = (e, task) => {
        e.stopPropagation();
        dispatch(updateTask({ id: task._id, taskData: { ...task, completed: !task.completed } }));
    };

    const handleDeleteTask = () => {
        if (editingTask && window.confirm('Delete this task?')) {
            dispatch(deleteTask(editingTask._id));
            setShowModal(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (editingTask) {
            dispatch(updateTask({ id: editingTask._id, taskData: formData }));
        } else {
            dispatch(createTask(formData));
        }
    };

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Render Month View
    const renderMonthView = () => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const calendarDays = eachDayOfInterval({
            start: startDate,
            end: endDate,
        });

        const rows = [];
        let days = [];
        calendarDays.forEach((day, i) => {
            const dayTasks = getDayTasks(day);
            days.push(
                <div
                    key={day.toString()}
                    onClick={() => handleDayClick(day)}
                    className={`min-h-[120px] p-2 border-r border-b border-slate-100 dark:border-slate-800 transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 ${!isSameMonth(day, monthStart)
                        ? 'bg-slate-50/30 dark:bg-slate-900/10 text-slate-300 dark:text-slate-600'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200'
                        } ${isSameDay(day, new Date()) ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}`}
                >
                    <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full ${isSameDay(day, new Date()) ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 dark:shadow-none' : ''
                            }`}>
                            {format(day, 'd')}
                        </span>
                    </div>
                    <div className="space-y-1 overflow-y-auto max-h-[80px] custom-scrollbar">
                        {dayTasks.slice(0, 3).map(task => (
                            <div
                                key={task._id}
                                onClick={(e) => handleTaskClick(e, task)}
                                className={`text-[10px] p-1.5 rounded-lg truncate border transition-transform hover:scale-[1.02] ${task.completed
                                    ? 'bg-slate-100 border-slate-200 text-slate-400 line-through dark:bg-slate-800 dark:border-slate-700'
                                    : 'bg-primary-50 border-primary-100 text-primary-700 dark:bg-primary-900/20 dark:border-primary-800 dark:text-primary-300'
                                    }`}
                            >
                                {task.title}
                            </div>
                        ))}
                        {dayTasks.length > 3 && (
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold pl-1">
                                + {dayTasks.length - 3} more
                            </div>
                        )}
                    </div>
                </div>
            );
            if ((i + 1) % 7 === 0) {
                rows.push(<div key={i} className="grid grid-cols-7">{days}</div>);
                days = [];
            }
        });

        return (
            <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="grid grid-cols-7 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            {day}
                        </div>
                    ))}
                </div>
                <div>{rows}</div>
            </div>
        );
    };

    // Render Week View
    const renderWeekView = () => {
        const startDate = startOfWeek(currentDate);
        const weekDays = eachDayOfInterval({
            start: startDate,
            end: endOfWeek(startDate),
        });

        return (
            <div className="grid grid-cols-7 gap-4">
                {weekDays.map(day => {
                    const dayTasks = getDayTasks(day);
                    return (
                        <div key={day.toString()} className="flex flex-col gap-4">
                            <div
                                onClick={() => handleDayClick(day)}
                                className={`p-4 rounded-3xl text-center border cursor-pointer transition-all hover:scale-105 ${isSameDay(day, new Date())
                                    ? 'bg-primary-600 border-primary-500 text-white shadow-xl shadow-primary-200 dark:shadow-none'
                                    : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                                    }`}
                            >
                                <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">{format(day, 'EEE')}</div>
                                <div className="text-2xl font-black">{format(day, 'd')}</div>
                            </div>
                            <div className="flex-1 space-y-3">
                                {dayTasks.map(task => (
                                    <div
                                        key={task._id}
                                        onClick={(e) => handleTaskClick(e, task)}
                                        className="group relative bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                                    >
                                        <div className={`w-1 h-8 absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full ${task.completed ? 'bg-slate-300 dark:bg-slate-700' : 'bg-primary-500'
                                            }`} />
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-xs font-bold truncate pr-4 ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
                                                {task.title}
                                            </h4>
                                            <button
                                                onClick={(e) => handleToggleComplete(e, task)}
                                                className={`transition-colors ${task.completed ? 'text-green-500' : 'text-slate-300 dark:text-slate-700 hover:text-primary-500'}`}
                                            >
                                                {task.completed ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 uppercase font-black">
                                            <Clock size={10} />
                                            {task.deadline ? format(new Date(task.deadline), 'HH:mm') : 'No time'}
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleDayClick(day)}
                                    className="w-full h-12 flex items-center justify-center rounded-2xl border-2 border-dashed border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-700 hover:border-primary-400 hover:text-primary-500 transition-all group"
                                >
                                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    // Render Day View
    const renderDayView = () => {
        const dayTasks = getDayTasks(currentDate);
        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3">
                            <Clock className="text-primary-500" />
                            Hourly Schedule
                        </h3>
                        <div className="space-y-4">
                            {[...Array(24)].map((_, i) => {
                                const hourTasks = dayTasks.filter(t => t.deadline && new Date(t.deadline).getHours() === i);
                                return (
                                    <div key={i} className="flex gap-6 group">
                                        <span className="w-12 text-xs font-bold text-slate-400 mt-1">{format(new Date().setHours(i, 0), 'HH:mm')}</span>
                                        <div className="flex-1 pb-4 border-b border-slate-50 dark:border-slate-800 group-last:border-0 min-h-[40px]">
                                            {hourTasks.map(task => (
                                                <div
                                                    key={task._id}
                                                    onClick={(e) => handleTaskClick(e, task)}
                                                    className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-2xl border border-primary-100 dark:border-primary-800 mb-2 cursor-pointer hover:shadow-md transition-all"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <h4 className="font-bold text-primary-900 dark:text-primary-100">{task.title}</h4>
                                                        <span className="text-[10px] px-2 py-1 bg-white dark:bg-slate-800 rounded-lg font-bold text-primary-600 uppercase">
                                                            {task.priority}
                                                        </span>
                                                    </div>
                                                    {task.description && <p className="text-xs text-primary-700/70 dark:text-primary-400/70 mt-1 italic">{task.description}</p>}
                                                </div>
                                            ))}
                                            {hourTasks.length === 0 && (
                                                <div
                                                    onClick={() => {
                                                        const d = new Date(currentDate);
                                                        d.setHours(i, 0, 0, 0);
                                                        handleDayClick(d);
                                                    }}
                                                    className="h-1 bg-slate-50 dark:bg-slate-800/50 rounded-full w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-8 rounded-[32px] text-white shadow-xl shadow-primary-200 dark:shadow-none">
                        <h3 className="text-4xl font-black mb-2">{format(currentDate, 'd')}</h3>
                        <p className="text-lg font-bold opacity-80">{format(currentDate, 'MMMM yyyy')}</p>
                        <div className="mt-8 pt-8 border-t border-white/20">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold opacity-80">Tasks Today</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full font-black text-sm">{dayTasks.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-bold opacity-80">Completed</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full font-black text-sm">
                                    {dayTasks.filter(t => t.completed).length}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => handleDayClick(currentDate)}
                        className="w-full bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center gap-3 font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group active:scale-95"
                    >
                        <Plus className="text-primary-500 group-hover:rotate-90 transition-transform" />
                        Quick Add Task
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300">
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header & Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center shadow-inner">
                                    <CalendarIcon className="text-primary-600 dark:text-primary-400" />
                                </div>
                                Visual Planner
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                                {format(currentDate, 'MMMM yyyy')} • {view.charAt(0).toUpperCase() + view.slice(1)} View
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-[24px] shadow-sm border border-slate-100 dark:border-slate-800">
                            {/* View Switches */}
                            <div className="flex p-1 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                                {viewOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setView(opt.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${view === opt.id
                                            ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-sm scale-105'
                                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                            }`}
                                    >
                                        <opt.icon size={14} />
                                        {opt.name}
                                    </button>
                                ))}
                            </div>

                            <div className="h-6 w-px bg-slate-100 dark:bg-slate-800 hidden sm:block" />

                            {/* Navigation */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePrev}
                                    className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-primary-600 transition-all active:scale-90"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={resetToToday}
                                    className="px-4 py-2 text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl uppercase tracking-[0.2em] animate-pulse-slow"
                                >
                                    Today
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-primary-600 transition-all active:scale-90"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Render Active View */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {view === 'month' && renderMonthView()}
                        {view === 'week' && renderWeekView()}
                        {view === 'day' && renderDayView()}
                    </div>
                </div>
            </main>

            {/* Task Management Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[40px] shadow-2xl border border-white/20 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 dark:bg-primary-900/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>

                        <div className="p-10 relative z-10">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                    {editingTask ? 'Edit Task' : 'New Task'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={onSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={onChange}
                                        required
                                        autoFocus
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500 transition-all"
                                        placeholder="Preparation for exam..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                                        <input
                                            type="date"
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={onChange}
                                            required
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Priority</label>
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={onChange}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-black uppercase text-xs tracking-wider focus:ring-2 focus:ring-primary-500 transition-all cursor-pointer"
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notes</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={onChange}
                                        rows="3"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-primary-500 transition-all"
                                        placeholder="Any specific details?"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary-600 text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-primary-700 shadow-xl shadow-primary-200 dark:shadow-none transition-all active:scale-95"
                                    >
                                        {editingTask ? 'Apply Changes' : 'Create Task'}
                                    </button>
                                    {editingTask && (
                                        <button
                                            type="button"
                                            onClick={handleDeleteTask}
                                            className="p-4 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisualPlanner;
