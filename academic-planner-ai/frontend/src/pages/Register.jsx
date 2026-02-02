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
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-[-10%] w-[30%] h-[30%] bg-amber-50 rounded-full blur-[100px] opacity-60"></div>
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-primary-50 rounded-full blur-[120px] opacity-50"></div>

      <div className="max-w-5xl w-full mx-4 grid md:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 relative z-10">
        {/* Left Side: Illustration Area */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-slate-900 text-white relative">
          <div className="mb-10">
            <span className="px-4 py-2 bg-primary-600 rounded-full text-xs font-bold uppercase tracking-widest">Free for Students</span>
          </div>
          <h1 className="text-4xl font-bold mb-6">Start Your Journey To Academic Excellence</h1>
          <p className="text-slate-400 leading-relaxed mb-8">
            Join thousands of students using AI to master their schedules, track their progress, and achieve their goals.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex flex-col items-start">
              <TargetIcon className="w-8 h-8 text-primary-500 mb-2" />
              <p className="text-sm font-bold">Goal Tracking</p>
            </div>
            <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex flex-col items-start">
              <BrainIcon className="w-8 h-8 text-indigo-400 mb-2" />
              <p className="text-sm font-bold">AI Assistance</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500 font-medium">Get started for free today.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                required
                className="input-field"
                placeholder="Adya Gupta"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="input-field"
                placeholder="adya@university.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Confirm</label>
                <input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  required
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-4 mt-4 text-lg bg-gradient-to-r from-primary-600 to-indigo-600 hover:opacity-90 shadow-xl shadow-primary-100"
            >
              {isLoading ? 'Creating Account...' : 'Get Started'}
            </button>
          </form>

          <p className="text-center text-slate-500 font-semibold mt-8">
            Already a member?{' '}
            <Link to="/login" className="text-primary-600 hover:text-indigo-600 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
