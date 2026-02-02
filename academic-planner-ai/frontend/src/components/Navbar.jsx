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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 h-20">
      <div className="max-w-full h-full px-6 lg:px-12 flex items-center justify-between">

        {/* Left: Branding */}
        <div
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 group-hover:scale-110 transition-all duration-500">
            <BookIcon className="w-7 h-7" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase leading-none">
              Academic Planner AI
            </h1>
          </div>
        </div>

        {/* Right: Profile & Logout */}
        <div className="flex items-center gap-6">
          {/* Profile Name */}
          <div className="hidden sm:block text-right">
            <p className="text-lg font-black text-slate-900 uppercase tracking-tight">{name}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Workspace Active</p>
          </div>

          {/* Logout & Avatar */}
          <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-slate-50 hover:bg-emerald-600 text-slate-700 hover:text-white rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-sm hover:shadow-lg hover:shadow-emerald-600/20"
            >
              Exit
            </button>
            <div
              className="w-12 h-12 rounded-2xl border-2 border-slate-200 flex items-center justify-center bg-white cursor-pointer hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/20 transition-all overflow-hidden"
              onClick={() => navigate('/profile')}
            >
              {profileImage || <UserIcon className="w-6 h-6 text-slate-600" />}
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
