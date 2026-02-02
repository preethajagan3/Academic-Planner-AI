import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import { getUserProfile, updateUserProfile } from '../features/users/userSlice';
import { getTasks } from '../features/tasks/taskSlice';
import {
  UserIcon,
  BrainIcon,
  AcademicCapIcon,
  DocumentIcon,
  SaveIcon,
  PencilIcon,
  ClipboardIcon,
  RobotIcon,
  SunIcon,
  MoonIcon,
  StarIcon,
  BoltIcon,
  ChartIcon,
  RocketIcon,
  CameraIcon,
  TargetIcon
} from '../components/Icons';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading, isError, message } = useSelector((state) => state.user);
  const { tasks } = useSelector((state) => state.tasks);

  const displayProfile = profile || user;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    theme: 'light',
    profileImage: '',
    preferredStudyTime: '',
    avgStudyDuration: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getTasks()); // Fetch tasks to calculate metrics
  }, [dispatch]);

  useEffect(() => {
    if (displayProfile) {
      setFormData({
        name: displayProfile.name || '',
        email: displayProfile.email || '',
        theme: displayProfile.theme || 'light',
        profileImage: displayProfile.profileImage || '',
        preferredStudyTime: displayProfile.preferredStudyTime || '',
        avgStudyDuration: displayProfile.avgStudyDuration || '',
      });
    }
  }, [displayProfile]);

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleThemeToggle = () => {
    const newTheme = formData.theme === 'light' ? 'dark' : 'light';
    setFormData((prev) => ({ ...prev, theme: newTheme }));
    dispatch(updateUserProfile({ theme: newTheme }));
  };

  const handleSave = () => {
    const updatedData = {
      ...formData,
      avgStudyDuration: formData.avgStudyDuration ? Number(formData.avgStudyDuration) : 0,
    };
    dispatch(updateUserProfile(updatedData));
    setIsEditing(false);
  };

  const profileImages = [
    <UserIcon className="w-8 h-8" />,
    <UserIcon className="w-8 h-8" />,
    <BrainIcon className="w-8 h-8" />,
    <AcademicCapIcon className="w-8 h-8" />,
    <BrainIcon className="w-8 h-8" />,
    <DocumentIcon className="w-8 h-8" />,
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>,
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
  ];

  // Calculate performance metrics
  const completedTasks = tasks?.filter(t => t.completed === true).length || 0;
  const pendingTasks = tasks?.filter(t => t.completed === false).length || 0;
  const totalTasks = tasks?.length || 0;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Debug logging
  console.log('Profile Page - Tasks Data:', {
    totalTasks,
    completedTasks,
    pendingTasks,
    completionRate,
    tasksArray: tasks
  });

  // Generate personalized motivation message
  const getMotivationMessage = () => {
    const firstName = formData.name.split(' ')[0];

    if (completionRate >= 80) {
      return `${firstName}, you're absolutely crushing it! Your ${completionRate}% completion rate shows exceptional dedication. Keep this momentum going - you're on track to achieve amazing things!`;
    } else if (completionRate >= 60) {
      return `${firstName}, you're making solid progress with a ${completionRate}% completion rate. You're building great habits - stay focused and you'll reach your goals in no time!`;
    } else if (completionRate >= 40) {
      return `${firstName}, you're on the right path! Your ${completionRate}% completion rate shows you're committed. Push a little harder and watch your productivity soar!`;
    } else if (totalTasks > 0) {
      return `${firstName}, every journey starts with a single step. You've got ${completedTasks} tasks done - that's progress! Let's build on this foundation and create unstoppable momentum!`;
    } else {
      return `${firstName}, welcome to your academic journey! Set your first goals and watch yourself transform into the high-achiever you're meant to be!`;
    }
  };

  const getPerformanceLevel = () => {
    if (completionRate >= 80) return { label: 'Outstanding', color: 'emerald', icon: <StarIcon className="w-8 h-8 text-emerald-600" /> };
    if (completionRate >= 60) return { label: 'Excellent', color: 'blue', icon: <BoltIcon className="w-8 h-8 text-blue-600" /> };
    if (completionRate >= 40) return { label: 'Good', color: 'amber', icon: <ChartIcon className="w-8 h-8 text-amber-600" /> };
    return { label: 'Building', color: 'slate', icon: <RocketIcon className="w-8 h-8 text-slate-600" /> };
  };

  const performanceLevel = getPerformanceLevel();

  if (isLoading && !isEditing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] selection:bg-emerald-500/10">
      <Navbar />
      <Sidebar />

      <main className="lg:ml-64 pt-24 pb-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-4 py-1.5 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg shadow-emerald-600/20">
                  Profile
                </span>
              </div>
              <h1 className="text-5xl font-black text-slate-900 leading-tight tracking-tighter mb-2">
                Your Student <span className="text-emerald-600">Profile</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium">Manage your academic identity and AI preferences.</p>
            </div>
            <button
              onClick={handleThemeToggle}
              className="p-4 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"
            >
              {formData.theme === 'light' ? <MoonIcon className="w-6 h-6 text-slate-700" /> : <SunIcon className="w-6 h-6 text-amber-500" />}
            </button>
          </div>

          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 font-medium">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Profile Card */}
            <div className="lg:col-span-4">
              <div className="premium-card text-center flex flex-col items-center py-10">
                <div className="relative group cursor-pointer mb-6">
                  <div className="w-32 h-32 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-6xl shadow-inner transition-transform group-hover:scale-105">
                    {formData.profileImage || formData.name.charAt(0)}
                  </div>
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-xl shadow-lg border border-slate-200">
                      <CameraIcon className="w-6 h-6 text-slate-500" />
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="flex flex-wrap justify-center gap-2 mb-6 px-4">
                    {profileImages.map(img => (
                      <button
                        key={img}
                        onClick={() => setFormData(prev => ({ ...prev, profileImage: img }))}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${formData.profileImage === img ? 'bg-emerald-600 text-white scale-110' : 'bg-slate-50 hover:bg-slate-100 scale-100'}`}
                      >
                        {img}
                      </button>
                    ))}
                  </div>
                ) : (
                  <>
                    <h3 className="text-3xl font-black text-slate-900 mb-1">{formData.name}</h3>
                    <p className="text-emerald-600 font-black text-xs uppercase tracking-[0.3em]">Student Member</p>
                  </>
                )}

                <div className="mt-8 pt-8 border-t border-slate-100 w-full px-6">
                  <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className={`w-full px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 ${isEditing ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-600/30' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                  >
                    {isEditing ? <><SaveIcon className="w-5 h-5" /> Save Profile</> : <><PencilIcon className="w-5 h-5" /> Edit Profile</>}
                  </button>
                </div>
              </div>

              {/* Performance Overview */}
              <div className="premium-card mt-6 p-6">
                <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                  <ChartIcon className="w-5 h-5 text-emerald-600" /> Performance Overview
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completion Rate</p>
                      <p className="text-2xl font-black text-emerald-600">{completionRate}%</p>
                    </div>
                    {performanceLevel.icon}
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tasks Completed</p>
                      <p className="text-2xl font-black text-blue-600">{completedTasks}</p>
                    </div>
                    <TargetIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Tasks</p>
                      <p className="text-2xl font-black text-purple-600">{pendingTasks}</p>
                    </div>
                    <ClipboardIcon className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="lg:col-span-8 space-y-6">
              {/* Personalized Motivation */}
              <div className={`premium-card p-8 border-l-4 border-l-${performanceLevel.color}-500 bg-gradient-to-br from-${performanceLevel.color}-50 to-white`}>
                <div className="flex items-start gap-4 mb-4">
                  {performanceLevel.icon}
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 mb-2">
                      Performance Level: <span className={`text-${performanceLevel.color}-600`}>{performanceLevel.label}</span>
                    </h4>
                    <p className="text-base text-slate-700 leading-relaxed font-medium">
                      {getMotivationMessage()}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Overall Progress</span>
                    <span className="text-sm font-black text-emerald-600">{completionRate}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-1000"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                    <p className="text-2xl font-black text-emerald-600">{completedTasks}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-1">Done</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                    <p className="text-2xl font-black text-purple-600">{pendingTasks}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-1">Pending</p>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="premium-card p-8">
                <h4 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <DocumentIcon className="w-6 h-6 text-emerald-600" /> Personal Details
                </h4>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Full Name</p>
                    {isEditing ? (
                      <input name="name" value={formData.name} onChange={onChange} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl p-3 text-base font-semibold focus:ring-0 transition-all" />
                    ) : (
                      <p className="text-slate-900 font-bold text-lg">{formData.name || 'N/A'}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Email Address</p>
                    <p className="text-slate-900 font-bold text-lg opacity-70">{formData.email || 'N/A'}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Study Peak Time</p>
                    {isEditing ? (
                      <select name="preferredStudyTime" value={formData.preferredStudyTime} onChange={onChange} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl p-3 text-base font-semibold focus:ring-0">
                        <option value="">Select Time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                        <option value="Night">Night</option>
                      </select>
                    ) : (
                      <p className="text-slate-900 font-bold text-lg">{formData.preferredStudyTime || 'Not Set'}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Target Daily Hours</p>
                    {isEditing ? (
                      <input type="number" name="avgStudyDuration" value={formData.avgStudyDuration} onChange={onChange} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 rounded-xl p-3 text-base font-semibold focus:ring-0" />
                    ) : (
                      <p className="text-slate-900 font-bold text-lg">{formData.avgStudyDuration ? `${formData.avgStudyDuration}h` : 'Not Set'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Preferences */}
              <div className="premium-card p-8 border-l-4 border-l-emerald-500">
                <h4 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                  <RobotIcon className="w-6 h-6 text-emerald-600" /> AI Preference Model
                </h4>
                <p className="text-base text-slate-500 mb-6 leading-relaxed font-medium">
                  Personalized insights based on your learning patterns and study behavior.
                </p>
                {displayProfile?.preferences ? (
                  <div className="bg-emerald-50 rounded-2xl p-6 font-mono text-sm text-emerald-900 leading-loose">
                    {Object.entries(displayProfile.preferences).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-emerald-100 last:border-0">
                        <span className="font-bold opacity-70">{key}:</span>
                        <span className="text-slate-900">{typeof val === 'object' ? JSON.stringify(val) : String(val)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 rounded-2xl p-8 text-center">
                    <p className="text-slate-400 font-medium">No AI preferences configured yet. Complete more tasks to build your learning profile!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
