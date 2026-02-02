import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {
    getNotifications,
    markAsRead,
    clearNotifications,
    checkDeadlines
} from '../features/notifications/notificationSlice';
import { ClockIcon, ClipboardIcon, SparklesIcon } from '../components/Icons';

const Notifications = () => {
    const dispatch = useDispatch();
    const { notifications, isLoading } = useSelector((state) => state.notifications);

    useEffect(() => {
        dispatch(checkDeadlines());
        dispatch(getNotifications());
    }, [dispatch]);

    const handleRead = (id) => {
        dispatch(markAsRead(id));
    };

    const handleClear = () => {
        if (window.confirm('Clear all notifications?')) {
            dispatch(clearNotifications());
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300">
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10 bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-4">
                                Notification Center
                                {unreadCount > 0 && (
                                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-black rounded-full animate-pulse">
                                        {unreadCount} NEW
                                    </span>
                                )}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Your personal assistant for upcoming deadlines.</p>
                        </div>
                        {notifications.length > 0 && (
                            <button
                                onClick={handleClear}
                                className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-bold hover:bg-red-50 hover:text-red-500 transition-all active:scale-95"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Notification List */}
                    <div className="space-y-4">
                        {notifications.length > 0 ? (
                            notifications.map((n) => (
                                <div
                                    key={n._id}
                                    onClick={() => !n.read && handleRead(n._id)}
                                    className={`group relative bg-white dark:bg-slate-900 p-6 rounded-[32px] shadow-sm border ${n.read
                                        ? 'border-slate-100 dark:border-slate-800 opacity-60'
                                        : 'border-primary-100 dark:border-primary-900/40 border-l-8 border-l-primary-500 active:scale-[0.99]'
                                        } cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-slate-100/50 dark:hover:shadow-none`}
                                >
                                    <div className="flex items-start gap-6">
                                        <div className={`mt-1 w-12 h-12 rounded-2xl flex items-center justify-center ${n.type === 'deadline' ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-primary-50 dark:bg-primary-900/20 text-primary-500'
                                            }`}>
                                            {n.type === 'deadline' ? <ClockIcon className="w-6 h-6" /> : <SparklesIcon className="w-6 h-6" />}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{n.title}</h3>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                    {new Date(n.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed mb-1">
                                                {n.message}
                                            </p>
                                            {!n.read && (
                                                <span className="text-[10px] font-black text-primary-500 uppercase tracking-wider">
                                                    New Message • Click to mark as read
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[40px] border-dashed border-2 border-slate-100 dark:border-slate-800 flex flex-col items-center">
                                <ClipboardIcon className="w-16 h-16 text-slate-200 dark:text-slate-800 mb-6" />
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Inbox Empty</h3>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">You're all caught up! No upcoming deadlines in the next 24 hours.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Notifications;
