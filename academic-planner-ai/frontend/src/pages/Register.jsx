import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { TargetIcon, BrainIcon } from '../components/Icons';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;
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
    if (password !== password2) {
      alert('Passwords do not match');
      return;
    }
    dispatch(register({ name, email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] relative overflow-hidden font-['Inter']">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[150px] opacity-40"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-100 rounded-full blur-[150px] opacity-40"></div>

      <div className="max-w-[1000px] w-full mx-6 grid md:grid-cols-2 bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100 relative z-10 transition-all duration-700 animate-fade-in">

        {/* Visual Brand Side */}
        <div className="hidden md:flex flex-col justify-between p-16 bg-gradient-to-br from-indigo-600 to-violet-700 text-white relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 text-[10rem]">◈</div>
            <div className="absolute bottom-20 right-10 text-[10rem]">◇</div>
          </div>

          <div className="relative z-10">
            <div className="mb-8">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-white/20">Free for Students</span>
            </div>
            <h1 className="text-6xl font-black leading-[0.85] tracking-tighter mb-8">
              Academic <br />
              Excellence.
            </h1>
            <p className="text-lg font-bold opacity-80 leading-relaxed max-w-sm mb-12">
              Join thousands of students using AI to master their schedules and achieve their goals.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm flex flex-col items-start hover:bg-white/10 transition-all cursor-default">
                <TargetIcon className="w-8 h-8 text-primary-400 mb-2" />
                <p className="text-xs font-black uppercase tracking-widest opacity-80">Goal Tracking</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm flex flex-col items-start hover:bg-white/10 transition-all cursor-default">
                <BrainIcon className="w-8 h-8 text-indigo-300 mb-2" />
                <p className="text-xs font-black uppercase tracking-widest opacity-80">AI Assistance</p>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Neural Engine / Version 2.0.4</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-12 md:p-20 flex flex-col justify-center bg-white">
          <div className="mb-12">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-3 leading-none italic uppercase">Create Account</h2>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Get started for free today</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            <div className="flex flex-col space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                required
                className="glass-input !py-5 !px-8 text-base"
                placeholder="Adya Gupta"
              />
            </div>

            <div className="flex flex-col space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="glass-input !py-5 !px-8 text-base"
                placeholder="adya@university.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  className="glass-input !py-5 !px-8 text-base"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Confirm</label>
                <input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  required
                  className="glass-input !py-5 !px-8 text-base"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-premium w-full !py-6 !rounded-3xl !text-xs uppercase tracking-[0.4em] shadow-2xl shadow-indigo-500/30 mt-4"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating Account...</span>
                </div>
              ) : (
                'Get Started'
              )}
            </button>
          </form>

          <p className="text-center mt-12 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">
            Already a member?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 transition-colors border-b-2 border-indigo-100 pb-0.5 ml-2 hover:border-indigo-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>

  );
};

export default Register;
