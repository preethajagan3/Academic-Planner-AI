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
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6 font-['Inter']">
      <div className="max-w-[480px] w-full bg-white rounded-[2rem] shadow-xl p-10 md:p-14 border border-slate-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Please enter your details</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-violet-100 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? 'Signing In...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-10 text-slate-500 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-violet-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

