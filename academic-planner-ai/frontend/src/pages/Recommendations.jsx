import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {
    CodeIcon, RobotIcon, ChartIcon, AcademicCapIcon, SparklesIcon,
    TrophyIcon, LightBulbIcon, RocketIcon, BoltIcon, BookIcon
} from '../components/Icons';

const Recommendations = () => {
    const { user } = useSelector((state) => state.auth);
    const userCourses = user?.courses || ['General Science', 'Mathematics'];

    const courseRecommendations = [
        { title: 'Advanced React Patterns', provider: 'Coursera', link: 'https://www.coursera.org', category: 'Technology', icon: <CodeIcon className="w-8 h-8 group-hover:text-white transition-colors" /> },
        { title: 'Machine Learning Basics', provider: 'Udemy', link: 'https://www.udemy.com', category: 'AI/ML', icon: <RobotIcon className="w-8 h-8 group-hover:text-white transition-colors" /> },
        { title: 'Digital Marketing Essentials', provider: 'Google', link: 'https://skillshop.google.com', category: 'Marketing', icon: <ChartIcon className="w-8 h-8 group-hover:text-white transition-colors" /> },
        { title: 'Calculus and Applications', provider: 'Khan Academy', link: 'https://www.khanacademy.org', category: 'Mathematics', icon: <AcademicCapIcon className="w-8 h-8 group-hover:text-white transition-colors" /> },
        { title: 'Data Structures & Algorithms', provider: 'MIT OpenCourseWare', link: 'https://ocw.mit.edu', category: 'Computer Science', icon: <CodeIcon className="w-8 h-8 group-hover:text-white transition-colors" /> },
        { title: 'UI/UX Design Fundamentals', provider: 'Figma', link: 'https://www.figma.com/resources/learn-design', category: 'Design', icon: <SparklesIcon className="w-8 h-8 group-hover:text-white transition-colors" /> },
    ];

    const hackathons = [
        { title: 'Smart India Hackathon', date: 'August 2026', link: 'https://sih.gov.in', category: 'Innovation', prize: '₹1L+', icon: <TrophyIcon className="w-8 h-8 group-hover:text-white transition-colors" /> },
        { title: 'Major League Hacking', date: 'Spring 2026', link: 'https://mlh.io', category: 'Coding', prize: '$10K+', icon: <LightBulbIcon className="w-8 h-8 group-hover:text-white transition-colors" /> },
        { title: 'Gemini API Hackathon', date: 'Now Open', link: 'https://ai.google.dev/competition', category: 'AI', prize: '$5K', icon: <RocketIcon className="w-8 h-8 group-hover:text-white transition-colors" /> },
        { title: 'HackMIT', date: 'September 2026', link: 'https://hackmit.org', category: 'Technology', prize: '$20K+', icon: <BoltIcon className="w-8 h-8 group-hover:text-white transition-colors" /> },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] selection:bg-emerald-500/10">
            <Navbar />
            <Sidebar />

            <main className="lg:ml-64 pt-24 pb-12 px-6 lg:px-12 transition-all duration-500">
                <div className="max-w-[100rem] mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-4 py-1.5 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg shadow-emerald-600/20">
                                Insights
                            </span>
                        </div>
                        <h1 className="text-6xl font-black text-slate-900 leading-tight tracking-tighter mb-4">
                            Personalized <br />
                            <span className="text-emerald-600">Recommendations</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium">Curated courses and events based on your interest in {userCourses.join(', ')}.</p>
                    </div>

                    {/* Courses Section */}
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-3xl font-black text-slate-900">Learning Paths</h2>
                            <BookIcon className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courseRecommendations.map((course, idx) => (
                                <div key={idx} className="premium-card group hover:scale-[1.02] transition-all cursor-pointer">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-500">
                                            {course.icon}
                                        </div>
                                        <a
                                            href={course.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all text-xl"
                                        >
                                            ↗
                                        </a>
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] block mb-2">{course.category}</span>
                                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{course.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium">via {course.provider}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hackathons Section */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-3xl font-black text-slate-900">Competitions & Events</h2>
                            <RocketIcon className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {hackathons.map((hack, idx) => (
                                <div key={idx} className="premium-card group hover:scale-[1.02] transition-all cursor-pointer border-l-4 border-l-emerald-500">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-500">
                                                {hack.icon}
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] block">{hack.category}</span>
                                                <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{hack.title}</h3>
                                            </div>
                                        </div>
                                        <a
                                            href={hack.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all text-xl shrink-0"
                                        >
                                            ↗
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100">
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeline</p>
                                            <p className="text-sm font-bold text-slate-700">{hack.date}</p>
                                        </div>
                                        <div className="w-px h-8 bg-slate-200" />
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prize Pool</p>
                                            <p className="text-sm font-bold text-emerald-600">{hack.prize}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Recommendations;
