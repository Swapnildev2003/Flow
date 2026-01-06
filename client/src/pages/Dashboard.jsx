import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
    Plus,
    Trash2,
    Edit2,
    Check,
    X,
    Search,
    MoreHorizontal,
    Clock,
    Target,
    Layout
} from 'lucide-react';
import AuthContext from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        fetchTasks();
    }, [user]);

    const fetchTasks = async () => {
        try {
            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const { data } = await axios.get(`${apiBase}/api/tasks`, config);
            setTasks(data);
        } catch (error) {
            toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        try {
            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const { data } = await axios.post(
                `${apiBase}/api/tasks`,
                { text: newTask },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setTasks([...tasks, data]);
            setNewTask('');
            toast.success('Task added');
        } catch (error) {
            toast.error('Could not add task');
        }
    };

    const deleteTask = async (id) => {
        try {
            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.delete(`${apiBase}/api/tasks/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setTasks(tasks.filter((t) => t._id !== id));
            toast.success('Task deleted');
        } catch (error) {
            toast.error('Deletion failed');
        }
    };

    const updateTask = async (id) => {
        if (!editText.trim()) return;
        try {
            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const { data } = await axios.put(
                `${apiBase}/api/tasks/${id}`,
                { text: editText },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            setTasks(tasks.map((t) => (t._id === id ? data : t)));
            setEditingId(null);
            toast.success('Task updated');
        } catch (error) {
            toast.error('Update failed');
        }
    };

    const filteredTasks = tasks.filter(t => t.text.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className="min-h-screen bg-[#030712] text-gray-100 flex">
            <Sidebar />

            <main className="flex-1 ml-64 p-6 md:p-10 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold font-display text-white tracking-tight mb-2">Overview</h1>
                        <p className="text-gray-500">Welcome back, {user?.name.split(' ')[0]}. Here's your workspace overview.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500/30 outline-none w-full md:w-64 transition-all"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                {/* Bento Grid */}
                <div className="grid grid-cols-12 gap-6 mb-12">
                    {/* Main Task Creator - Large Cell */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="col-span-12 lg:col-span-8 glass-card p-8 flex flex-col justify-between min-h-[240px] relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-2">What's on your mind?</h2>
                            <p className="text-gray-500 mb-8">Quickly add a new task to your workspace.</p>
                            <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    className="input-modern"
                                    placeholder="e.g. Redesign the landing page"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                />
                                <button type="submit" className="btn-modern flex items-center justify-center gap-2 whitespace-nowrap">
                                    <Plus size={20} />
                                    <span>Add Task</span>
                                </button>
                            </form>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all duration-500"></div>
                    </motion.div>

                    {/* Quick Stats - Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="col-span-12 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
                    >
                        <div className="glass-card p-6 flex items-center justify-between group">
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-1">Total Effort</p>
                                <p className="text-3xl font-bold font-display">{tasks.length}</p>
                            </div>
                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl group-hover:scale-110 transition-transform">
                                <Target size={24} />
                            </div>
                        </div>
                        <div className="glass-card p-6 flex items-center justify-between group">
                            <div>
                                <p className="text-gray-500 text-sm font-medium mb-1">Time Invested</p>
                                <p className="text-3xl font-bold font-display">12h</p>
                            </div>
                            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl group-hover:scale-110 transition-transform">
                                <Clock size={24} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Task List Section - Large Cell */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="col-span-12 glass-card p-8"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-xl"><Layout size={20} /></div>
                                <h2 className="text-2xl font-bold">Active Tasks</h2>
                            </div>
                            <button className="text-gray-500 hover:text-white transition-colors"><MoreHorizontal size={20} /></button>
                        </div>

                        <div className="space-y-3">
                            <AnimatePresence mode="popLayout">
                                {filteredTasks.length === 0 ? (
                                    <div className="py-12 text-center text-gray-600 border border-white/5 border-dashed rounded-3xl">
                                        No active tasks found.
                                    </div>
                                ) : (
                                    filteredTasks.map((task) => (
                                        <motion.div
                                            layout
                                            key={task._id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="group flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] rounded-2xl transition-all duration-300"
                                        >
                                            {editingId === task._id ? (
                                                <div className="flex-1 flex items-center gap-3">
                                                    <input
                                                        type="text"
                                                        className="flex-1 bg-transparent border-none focus:ring-0 outline-none p-0 text-white"
                                                        value={editText}
                                                        onChange={(e) => setEditText(e.target.value)}
                                                        autoFocus
                                                        onKeyDown={(e) => e.key === 'Enter' && updateTask(task._id)}
                                                    />
                                                    <div className="flex gap-1">
                                                        <button onClick={() => updateTask(task._id)} className="p-2 text-green-400 hover:bg-green-400/10 rounded-xl"><Check size={18} /></button>
                                                        <button onClick={() => setEditingId(null)} className="p-2 text-gray-500 hover:bg-white/10 rounded-xl"><X size={18} /></button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                                        <span className="font-medium text-gray-200">{task.text}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => { setEditingId(task._id); setEditText(task.text); }}
                                                            className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                                        ><Edit2 size={16} /></button>
                                                        <button
                                                            onClick={() => deleteTask(task._id)}
                                                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                                                        ><Trash2 size={16} /></button>
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
