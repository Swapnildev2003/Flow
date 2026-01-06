import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    CheckSquare,
    Calendar,
    Settings,
    LogOut,
    ChevronRight
} from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { name: 'My Tasks', icon: <CheckSquare size={20} />, path: '#' },
        { name: 'Schedule', icon: <Calendar size={20} />, path: '#' },
        { name: 'Settings', icon: <Settings size={20} />, path: '#' },
    ];

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-[#030712] border-r border-white/[0.05] z-50 flex flex-col p-6">
            <div className="flex items-center space-x-3 mb-12">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-white/5">
                    <div className="w-5 h-5 bg-black rounded-lg transform rotate-12"></div>
                </div>
                <span className="text-xl font-bold font-display tracking-tight text-white">Flow.</span>
            </div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item, i) => (
                    <NavLink
                        key={i}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group
              ${isActive && item.path !== '#' ? 'bg-white/5 text-white' : 'text-gray-500 hover:text-white hover:bg-white/[0.02]'}
            `}
                    >
                        <div className="flex items-center space-x-3">
                            <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/[0.05]">
                <div className="mb-6 flex items-center space-x-3 p-2 rounded-2xl bg-white/[0.02]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
                        {user?.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-300"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
