import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  reset,
} from '../features/tasks/taskSlice';
import { PencilIcon, TrashIcon, XIcon, CheckIcon, CalendarIcon, RocketIcon } from '../components/Icons';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, isSuccess, message } = useSelector((state) => state.tasks);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
  });

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    if (isError) alert(message);
    if (isSuccess) {
      setShowForm(false);
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        deadline: '',
        priority: 'medium',
      });
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      dispatch(updateTask({ id: editingTask._id, taskData: formData }));
    } else {
      dispatch(createTask(formData));
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      deadline: task.deadline ? task.deadline.split('T')[0] : '',
      priority: task.priority || 'medium',
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleToggleComplete = (task) => {
    dispatch(updateTask({ id: task._id, taskData: { ...task, completed: !task.completed } }));
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
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10 bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">Task Studio</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Capture your ideas, let AI organize the rest.</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-8 py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95 ${showForm
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-200'
                }`}
            >
              {showForm ? 'Close Form' : '+ New Task'}
            </button>
          </div>

          {/* Creation Form */}
          {showForm && (
            <div className="mb-10 animate-fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-primary-100 dark:border-primary-900/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 dark:bg-primary-900/10 rounded-full blur-[80px] -mr-32 -mt-32 opacity-60"></div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 z-10 relative">
                  {editingTask ? 'Refine Your Task' : 'What\'s on your mind?'}
                </h3>
                <form onSubmit={onSubmit} className="space-y-6 z-10 relative">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Task Name</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={onChange}
                        required
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white"
                        placeholder="e.g. Prepare for Biology Midterm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Priority Level</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={onChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Description (Optional)</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={onChange}
                      rows="3"
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white"
                      placeholder="Add sub-tasks or specific requirements..."
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-2">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Deadline Date</label>
                      <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={onChange}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div className="flex items-end gap-3 flex-1">
                      <button type="submit" className="flex-1 px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-200 dark:shadow-none">
                        {editingTask ? 'Save Changes' : 'Create Task'}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowForm(false); setEditingTask(null); }}
                        className="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
                      >
                        <XIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {tasks.length > 0 ? (
              [...tasks]
                .sort((a, b) => {
                  if (a.completed !== b.completed) return a.completed ? 1 : -1;
                  return new Date(a.deadline) - new Date(b.deadline);
                })
                .map((task) => (
                  <div
                    key={task._id}
                    className={`group bg-white dark:bg-slate-900 p-6 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-slate-100/50 dark:hover:shadow-none transition-all duration-300 ${task.completed ? 'opacity-60 grayscale-[0.5]' : ''
                      }`}
                  >
                    <div className="flex items-start gap-6">
                      <div className="mt-1">
                        <button
                          onClick={() => handleToggleComplete(task)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${task.completed
                            ? 'bg-violet-500 border-violet-500 text-white shadow-lg shadow-violet-100 dark:shadow-none'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-violet-500'
                            }`}
                        >
                          {task.completed && <CheckIcon className="w-5 h-5" />}
                        </button>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className={`text-xl font-bold transition-all ${task.completed ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-900 dark:text-white'
                            }`}>
                            {task.title}
                          </h3>
                          {task.category && (
                            <span className="px-3 py-1 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 font-bold text-[10px] uppercase tracking-widest rounded-lg border border-violet-100 dark:border-violet-900/30">
                              {task.category}
                            </span>
                          )}
                          {task.importance > 3 && (
                            <span className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 font-bold text-[10px] uppercase tracking-widest rounded-lg animate-pulse border border-amber-100 dark:border-amber-900/30">
                              High Stakes
                            </span>
                          )}
                        </div>

                        {task.description && (
                          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed mb-4 line-clamp-2 italic">
                            "{task.description}"
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-6">
                          {task.deadline && (
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                              <CalendarIcon className="w-4 h-4" /> <span>Due:</span>
                              <span className="text-slate-700 dark:text-slate-300">{new Date(task.deadline).toLocaleDateString()}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-violet-500'
                              }`}></span>
                            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">{task.priority}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors flex items-center justify-center"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[40px] border-dashed border-2 border-slate-100 dark:border-slate-800 flex flex-col items-center">
                <div className="mb-6">
                  <RocketIcon className="w-16 h-16 text-slate-300 dark:text-slate-700" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Workspace Empty</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">Ready to start your next big academic project?</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-200"
                >
                  Create Your First Task
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tasks;
