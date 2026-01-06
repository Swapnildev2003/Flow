import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await login(email, password);
        setIsLoading(false);

        if (res.success) {
            toast.success('Access granted.');
            navigate('/');
        } else {
            toast.error(res.error || 'Authentication failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#030712] relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="w-full max-w-[420px] p-10 glass-card relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-12 shadow-xl shadow-white/10">
                        <div className="w-6 h-6 bg-black rounded-lg"></div>
                    </div>
                    <h2 className="text-3xl font-bold font-display text-white tracking-tight mb-2">Welcome back</h2>
                    <p className="text-gray-500">Secure access to your personal instance</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="group">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-white transition-colors">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    className="input-modern pl-12"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-white transition-colors">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    className="input-modern pl-12"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-modern flex items-center justify-center space-x-2 mt-4"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin text-black" size={20} />
                        ) : (
                            <>
                                <span>Establish Connection</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-sm text-gray-500">
                        Need an instance?{' '}
                        <Link to="/register" className="font-semibold text-white hover:underline transition-all">
                            Initialize account
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
