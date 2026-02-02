import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { BookIcon, UserIcon } from './Icons';
import { getAvatarUrl } from '../utils/avatarHelper';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const name = profile?.name || user?.name || user?.email || 'Student';
  const profileImage = profile?.profileImage || user?.profileImage;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800 h-20 transition-colors duration-300">
      <div className="max-w-full h-full px-6 lg:px-12 flex items-center justify-between">

        {/* Left: Branding */}
        <div
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-violet-500/30 group-hover:scale-110 transition-all duration-500">
            <BookIcon className="w-7 h-7" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
              Academic Planner AI
            </h1>
          </div>
        </div>

        {/* Right: Profile & Logout */}
        <div className="flex items-center gap-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => {
              if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
              } else {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
              }
            }}
            className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all"
          >
            {/* Sun Icon */}
            <svg className="w-5 h-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {/* Moon Icon */}
            <svg className="w-5 h-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          {/* Profile Name */}
          <div className="hidden sm:block text-right">
            <p className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{name}</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Workspace Active</p>
          </div>

          {/* Logout & Avatar */}
          <div className="flex items-center gap-4 pl-6 border-l border-slate-200 dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-violet-600 hover:dark:bg-violet-600 text-slate-700 dark:text-slate-300 hover:text-white rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-sm hover:shadow-lg hover:shadow-violet-600/20"
            >
              Exit
            </button>
            <div
              className="w-12 h-12 rounded-2xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center bg-white dark:bg-slate-800 cursor-pointer hover:border-violet-500 dark:hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/20 transition-all overflow-hidden"
              onClick={() => navigate('/profile')}
            >
              {profileImage || <UserIcon className="w-6 h-6 text-slate-600 dark:text-white" />}
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
