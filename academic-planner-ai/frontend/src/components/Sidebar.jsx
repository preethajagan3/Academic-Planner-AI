import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  ChartIcon,
  ClipboardIcon,
  CalendarIcon,
  RobotIcon,
  LightBulbIcon,
  UserIcon,
  TargetIcon,
  BellIcon,
  SparklesIcon
} from './Icons';

const Sidebar = () => {
  const { notifications } = useSelector((state) => state.notifications);
  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <ChartIcon className="w-6 h-6" /> },
    { name: 'Tasks', path: '/tasks', icon: <TargetIcon className="w-6 h-6" /> },
    { name: 'Planner', path: '/planner', icon: <CalendarIcon className="w-6 h-6" /> },
    { name: 'Timetable', path: '/timetable', icon: <CalendarIcon className="w-6 h-6" /> },
    { name: 'Metrics', path: '/progress', icon: <ChartIcon className="w-6 h-6" /> },
    { name: 'Scheduler', path: '/ai-tips', icon: <SparklesIcon className="w-6 h-6" /> },
    { name: 'Insights', path: '/recommendations', icon: <LightBulbIcon className="w-6 h-6" /> },
    { name: 'Inbox', path: '/notifications', icon: <BellIcon className="w-6 h-6" /> },
    { name: 'Profile', path: '/profile', icon: <UserIcon className="w-6 h-6" /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200/50 flex flex-col pt-28 px-4 z-40 hidden lg:flex overflow-y-auto">
      <nav className="flex-1 space-y-2 pb-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            <span className="text-sm font-bold">{item.name}</span>
            {item.name === 'Inbox' && unreadCount > 0 && (
              <span className="ml-auto w-5 h-5 rounded-full bg-emerald-500 text-[10px] font-black text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-8 mt-auto border-t border-slate-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">System Online</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
