import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) alert(message);
    if (isSuccess || user) navigate('/dashboard');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden font-['Inter']">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[150px] opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-100 rounded-full blur-[150px] opacity-40"></div>

      <div className="max-w-[1000px] w-full mx-6 grid md:grid-cols-2 bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100 relative z-10 transition-all duration-700 animate-fade-in">

        {/* Visual Brand Side */}
        <div className="hidden md:flex flex-col justify-between p-20 bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 text-[10rem]">◈</div>
            <div className="absolute bottom-20 right-10 text-[10rem]">◇</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black opacity-10 tracking-tighter">STUDIO</div>
          </div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-5xl mb-12 border border-white/20 shadow-2xl">
              ◈
            </div>
            <h1 className="text-7xl font-black leading-[0.85] tracking-tighter mb-10">
              Elite <br />
              Intelligence.
            </h1>
            <p className="text-xl font-bold opacity-80 leading-relaxed max-w-sm">
              The next dimension of academic architecture. Powered by Neural Core.
            </p>
          </div>

          <div className="pt-16 border-t border-white/10 relative z-10">
            <div className="flex -space-x-4 mb-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-indigo-600 bg-slate-100 flex items-center justify-center text-[10px] font-black text-indigo-600 shadow-xl">
                  USR
                </div>
              ))}
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] opacity-60">System Integrated / 24.5k Active Sessions</p>
          </div>
        </div>

        {/* Input Side */}
        <div className="p-16 md:p-28 flex flex-col justify-center bg-white">
          <div className="mb-16">
            <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-none italic uppercase">Login</h2>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[11px]">Academic Planner AI</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-10">
            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Identity Token</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="glass-input !py-6 !px-10 text-lg"
                placeholder="email@example.edu"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Security Hash</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="glass-input !py-6 !px-10 text-lg"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-premium w-full !py-8 !rounded-[2.5rem] !text-sm uppercase tracking-[0.5em] shadow-2xl shadow-indigo-500/40"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-4">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Syncing...</span>
                </div>
              ) : (
                'Initialize Session'
              )}
            </button>
          </form>

          <p className="text-center mt-16 text-slate-400 font-black uppercase tracking-[0.2em] text-[11px]">
            New Scholar?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-700 transition-colors border-b-2 border-indigo-100 pb-1 ml-4 hover:border-indigo-500">
              Create Credentials
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
