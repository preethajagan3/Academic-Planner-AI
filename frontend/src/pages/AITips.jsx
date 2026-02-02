import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import { getAITips } from '../features/ai/aiSlice';
import { formatTimeTo12Hour } from '../utils/timeFormat';
import { BoltIcon, LightBulbIcon, BrainIcon, ChartIcon, TargetIcon, FireIcon, UserIcon, SunIcon, MoonIcon, ClockIcon, RobotIcon, CalendarIcon, SparklesIcon } from '../components/Icons';

const AssistantAvatar = () => (
  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-3xl flex items-center justify-center text-xl font-black text-white shadow-xl shadow-indigo-200 border-4 border-white animate-bounce-slow">
    AI
  </div>
);

const AITips = () => {
  const dispatch = useDispatch();
  const { tips, preferences, smartSlots, isLoading, isError, message } = useSelector((state) => state.ai);

  useEffect(() => {
    dispatch(getAITips());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getAITips());
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300">
      <Navbar />
      <Sidebar />

      <main className="ml-64 mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50 dark:bg-violet-900/10 rounded-full blur-[80px] -mr-32 -mt-32 opacity-60"></div>
            <AssistantAvatar />
            <div className="flex-1 text-center md:text-left z-10">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Smart Insights</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">
                I've analyzed your habits! Here's your personalized game plan for maximum productivity.
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="px-8 py-4 bg-slate-900 dark:bg-primary-600 text-white rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-primary-700 transition-all shadow-xl shadow-slate-200 dark:shadow-none active:scale-95 flex items-center gap-3 z-10"
            >
              <span><BoltIcon className="w-5 h-5" /></span>
              Re-Calculate
            </button>
          </div>

          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-3xl mb-8 font-medium animate-fade-in">
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content: Slots & Tips */}
            <div className="lg:col-span-2 space-y-8">
              {/* Smart Scheduling Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl text-lg"><CalendarIcon className="w-6 h-6" /></span>
                      Optimized Study Slots
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-md font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"><SparklesIcon className="w-3 h-3" /> AI-Powered</span>
                      Generated using NLP analysis of your timetable and task patterns
                    </p>
                  </div>
                </div>
                {smartSlots && smartSlots.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {smartSlots.map((slot, index) => (
                      <div key={index} className="card dark:bg-slate-900 dark:border-slate-800 group hover:border-amber-200 dark:hover:border-amber-900/50 hover:bg-amber-50/20 dark:hover:bg-amber-900/10 transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                            {slot.day}
                          </span>
                          <span className="text-amber-600 dark:text-amber-400 group-hover:rotate-12 transition-transform"><ClockIcon className="w-6 h-6" /></span>
                        </div>
                        <p className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                          {formatTimeTo12Hour(slot.start)} - {formatTimeTo12Hour(slot.end)}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                          {slot.message}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card dark:bg-slate-900 dark:border-slate-800 text-center py-10 bg-slate-50 border-dashed border-2 border-slate-200 dark:border-slate-700">
                    <p className="text-slate-400 dark:text-slate-500 font-bold italic">Update your timetable to unlock smart slots</p>
                  </div>
                )}
              </section>

              {/* Recommendations Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl text-lg"><LightBulbIcon className="w-5 h-5" /></span>
                      Personalized Tips
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-md font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"><BrainIcon className="w-3 h-3" /> NLP Analysis</span>
                      Recommendations based on your study behavior and task priorities
                    </p>
                  </div>
                </div>
                {tips && tips.length > 0 ? (
                  <div className="space-y-4">
                    {tips.map((tip, index) => (
                      <div key={index} className="card bg-white dark:bg-slate-900 dark:border-slate-800 hover:scale-[1.01] border-l-8 border-l-primary-500 transition-all">
                        <div className="flex items-start gap-5">
                          <div className="text-3xl p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                            {tip.category === 'insight' ? <ChartIcon className="w-7 h-7" /> : tip.category === 'recommendation' ? <TargetIcon className="w-7 h-7" /> : <FireIcon className="w-7 h-7" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{tip.title}</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                              {tip.content}
                            </p>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                              {tip.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card dark:bg-slate-900 dark:border-slate-800 text-center py-10">
                    <p className="text-slate-400 dark:text-slate-500 font-bold italic">Waiting for more study data to provide tips...</p>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
              <section>
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-lg"><UserIcon className="w-5 h-5" /></span>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Preference Model</h3>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-md font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"><SparklesIcon className="w-3 h-3" /> AI-Powered</span>
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md font-bold text-[10px] uppercase tracking-wider">Machine Learning</span>
                  </div>
                </div>

                {/* Dominant Peak Card */}
                <div className="card bg-slate-900 text-white shadow-2xl shadow-emerald-500/20 border-2 border-emerald-500/30 mb-4">
                  <div className="p-4 bg-white/5 rounded-2xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Dominant Peak</p>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-500">{preferences.preferredStudyTime === 'Morning' ? <SunIcon className="w-8 h-8" /> : <MoonIcon className="w-8 h-8" />}</span>
                      <span className="text-xl font-bold">{preferences.preferredStudyTime || 'Calculating...'}</span>
                    </div>
                  </div>
                </div>

                {/* Focused Areas Card */}
                {preferences.topSubjects && preferences.topSubjects.length > 0 && (
                  <div className="card bg-slate-900 text-white shadow-2xl shadow-emerald-500/20 border-2 border-emerald-500/30 mb-4">
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Focused Areas</p>
                      <div className="flex flex-wrap gap-2">
                        {preferences.topSubjects.map((sub, i) => (
                          <span key={i} className="px-3 py-1 bg-primary-600/30 text-primary-200 text-[10px] font-bold rounded-lg border border-primary-500/30">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Avg Session Length Card */}
                {preferences.avgStudyDuration && (
                  <div className="card bg-slate-900 text-white shadow-2xl shadow-emerald-500/20 border-2 border-emerald-500/30 mb-4">
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Avg Session Length</p>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-500"><ClockIcon className="w-8 h-8" /></span>
                        <span className="text-xl font-bold">{preferences.avgStudyDuration} min</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Analysis Footer */}
                <div className="text-center pt-2">
                  <p className="text-xs text-slate-400 italic">
                    <BrainIcon className="w-3 h-3 inline" /> Real-time AI analysis
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AITips;
