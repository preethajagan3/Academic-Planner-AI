import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import Loader from '../components/Loader';
import { ClipboardIcon, BoltIcon, FireIcon, TargetIcon, RobotIcon, BeakerIcon, BookIcon, CalendarIcon } from '../components/Icons';
import { getTasks } from '../features/tasks/taskSlice';
import { getProgress } from '../features/progress/progressSlice';
import { getAITips } from '../features/ai/aiSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, isLoading: tasksLoading } = useSelector((state) => state.tasks);
  const { data: progressData, isLoading: progressLoading } = useSelector((state) => state.progress);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getProgress());
  }, [dispatch]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const upcomingDeadlines = tasks
    .filter((task) => !task.completed && task.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 4);

  const totalStudyHours = progressData.reduce((sum, item) => sum + (item.hours || 0), 0);

  if (tasksLoading || progressLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // Dynamic AI Insight Logic
  const getAIInsight = () => {
    if (totalTasks === 0) return "Initialize your first task to start the AI analysis.";
    if (completedTasks === totalTasks) return "Incredible! All tracks complete. Time to recharge.";
    if (pendingTasks > 5) return `High workload detected(${pendingTasks} items).Focus on Science first.`;
    if (totalStudyHours > 10) return "Your focus velocity is peak. Keep this momentum!";
    return "You're ahead of schedule. Review your planner for late entries.";
  };

  // Calculate Efficiency for Study Pulse
  const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-900 dark:text-white selection:bg-violet-500/10 transition-colors duration-300">
      <Navbar />
      <Sidebar />

      <main className="lg:ml-64 pt-24 pb-12 px-6 lg:px-12 transition-all duration-500">
        <div className="max-w-[100rem] mx-auto">

          {/* Hero Section */}
          <div className="mb-12 flex flex-col md:flex-row md:items-start justify-between gap-10 transition-all duration-700 animate-fade-in">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="px-4 py-1.5 bg-violet-600 dark:bg-violet-500 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg shadow-violet-600/20 dark:shadow-violet-500/10">
                  Academic OS
                </span>
                <span className="text-slate-300 dark:text-slate-600">/</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px] font-black uppercase tracking-widest">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <h1 className="text-6xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
                Focus <br />
                <span className="text-violet-600 dark:text-violet-400">
                  {user?.name?.split(' ')[0] || 'Scholar'}
                </span>
              </h1>
            </div>

            {/* AI Insight Card - Now Responsive & Dynamic */}
            <div className="premium-card !p-8 border-none ring-1 ring-slate-100 dark:ring-slate-800 shadow-2xl shadow-violet-100 dark:shadow-none flex items-center gap-8 max-w-lg bg-white dark:bg-slate-800">
              <div className="w-16 h-16 bg-violet-600 dark:bg-violet-500 rounded-3xl flex items-center justify-center text-white text-3xl shadow-xl shadow-violet-600/30 dark:shadow-violet-500/20 shrink-0">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Neural Insight</p>
                <p className="text-lg font-black text-slate-900 dark:text-white leading-tight italic">
                  "{getAIInsight()}"
                </p>
              </div>
            </div>
          </div>

          {/* Stats Boxed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="Total Tracks"
              value={totalTasks}
              icon={<ClipboardIcon />}
              color="violet"
              type="tracks"
              completedCount={completedTasks}
              totalCount={totalTasks}
            />
            <StatCard
              title="In Progress"
              value={pendingTasks}
              icon={<BoltIcon />}
              color="violet"
              type="progress"
            />
            <StatCard
              title="Focus Hours"
              value={`${totalStudyHours} h`}
              icon={<FireIcon />}
              color="violet"
              type="hours"
            />
            <StatCard
              title="Efficiency"
              value={totalTasks > 0 ? `${efficiency}% ` : '0%'}
              icon={<TargetIcon />}
              color="violet"
              type="efficiency"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* Stream Area */}
            <div className="xl:col-span-2 space-y-8">
              <div className="premium-card min-h-[500px] border-none shadow-2xl shadow-slate-200/40 dark:shadow-none bg-white dark:bg-slate-800">
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Priority Stream</h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em]">Active Task Sequencing</p>
                  </div>
                  <button onClick={() => navigate('/tasks')} className="px-6 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-violet-50 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-slate-200/50 dark:border-slate-600 hover:border-violet-200 dark:hover:border-slate-500">
                    Open Track →
                  </button>
                </div>

                {upcomingDeadlines.length > 0 ? (
                  <div className="space-y-6">
                    {upcomingDeadlines.map((task) => (
                      <div key={task._id} className="group flex items-center justify-between p-7 rounded-[2rem] bg-slate-50/50 dark:bg-slate-900/50 border border-transparent hover:border-violet-500/20 dark:hover:border-violet-500/10 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-violet-500/10 dark:hover:shadow-none transition-all duration-500 cursor-pointer">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center text-violet-600 dark:text-violet-400 shadow-sm group-hover:scale-110 group-hover:bg-violet-600 group-hover:dark:bg-violet-500 group-hover:text-white transition-all duration-500">
                            {task.category === 'science' ? <BeakerIcon className="w-8 h-8" /> : <BookIcon className="w-8 h-8" />}
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors uppercase tracking-tight">{task.title}</h4>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                Deadline / {new Date(task.deadline).toLocaleDateString()}
                              </span>
                              <span className="w-1.5 h-1.5 bg-violet-500 rounded-full" />
                              <span className="text-[11px] font-black text-violet-500 uppercase tracking-widest">Urgent Rank</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl font-black text-slate-200 dark:text-slate-700 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-all">
                          →
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[350px] text-center">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-800 uppercase text-xs font-black text-slate-300 dark:text-slate-600">
                      <ClipboardIcon className="w-10 h-10" />
                    </div>
                    <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-[0.2em] text-xs">No active sequences found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-8">
              <div className="relative overflow-hidden backdrop-blur-xl rounded-[2.5rem] p-8 border transition-all duration-500 shadow-2xl bg-violet-600 dark:bg-violet-700 border-none text-white shadow-violet-600/30 dark:shadow-none hover:-translate-y-2 hover:shadow-violet-600/40">
                <h3 className="text-2xl font-black mb-8 text-white">Study Pulse</h3>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.2em]">Efficiency Rating</p>
                      <p className="text-lg font-black text-white">{efficiency}%</p>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-white transition-all duration-1000 ease-out shadow-[0_0_15px_white]" style={{ width: `${efficiency}%` }} />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-white/80 leading-relaxed italic border-l-2 border-white/20 pl-4">
                    {efficiency > 80 ? '"Peak performance detected. Maximum retention state active."' :
                      efficiency > 50 ? '"Steady progress. maintain focus velocity."' :
                        '"Initiate focus protocols to increase efficiency rating."'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <button
                  onClick={() => navigate('/planner')}
                  className="premium-card !p-8 flex items-center gap-6 hover:bg-white dark:hover:bg-slate-800 group border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none bg-white dark:bg-slate-800"
                >
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:scale-110 group-hover:bg-violet-600 group-hover:dark:bg-violet-500 group-hover:text-white transition-all shadow-sm">
                    <CalendarIcon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">Planner</span>
                </button>
                <button
                  onClick={() => navigate('/ai-tips')}
                  className="premium-card !p-8 flex items-center gap-6 hover:bg-white dark:hover:bg-slate-800 group border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/30 dark:shadow-none bg-white dark:bg-slate-800"
                >
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-violet-600 group-hover:dark:bg-violet-500 group-hover:text-white transition-all shadow-sm">
                    <RobotIcon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">AI Assistant</span>
                </button>
              </div>

              <button
                onClick={() => navigate('/tasks')}
                className="btn-premium w-full !py-8 !rounded-[2rem] flex items-center justify-center gap-5 group hover:scale-[1.02]"
              >
                <span className="text-3xl group-hover:rotate-180 transition-transform duration-700 font-normal">＋</span>
                <span className="font-black text-sm uppercase tracking-[0.4em]">New Track</span>
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};


export default Dashboard;
