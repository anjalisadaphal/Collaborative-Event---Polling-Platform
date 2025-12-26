import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(name, email, password);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)] relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <form onSubmit={handleSubmit} className="glass-panel p-10 rounded-3xl w-full max-w-md mx-4 relative z-10 animate-fade-in-up">
                <div className="mb-10 text-center">
                    <h2 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">Create Account</h2>
                    <p className="text-gray-500">Join us to start planning events.</p>
                </div>

                {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm border border-red-100 flex items-center gap-2 animate-fade-in-up">⚠️ {error}</div>}

                <div className="space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input-field"

                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary w-full mt-8 shadow-xl shadow-pink-500/20 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 py-4 text-lg">Sign Up</button>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-pink-600 font-bold hover:text-pink-700 transition-colors">Log In</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
