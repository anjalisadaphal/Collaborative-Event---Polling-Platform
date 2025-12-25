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
        <div className="flex justify-center items-center h-[80vh] relative">
            <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob animation-delay-4000"></div>
            <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob"></div>

            <form onSubmit={handleSubmit} className="glass-panel p-10 rounded-2xl w-full max-w-md mx-4">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Create Account</h2>
                {error && <p className="bg-red-50 text-red-500 p-3 rounded mb-6 text-sm border border-red-100">{error}</p>}
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-field"
                        placeholder="John Doe"
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                        placeholder="you@example.com"
                    />
                </div>
                <div className="mb-8">
                    <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                        placeholder="••••••••"
                    />
                </div>
                <button type="submit" className="btn-primary w-full shadow-lg shadow-blue-500/30">Sign Up</button>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
