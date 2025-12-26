// Navigation Bar Component
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 shadow-sm transition-all duration-300 dark:bg-gray-900/80 dark:border-gray-800">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight cursor-pointer hover:opacity-80 transition-opacity">
                    <Link to="/">CollabEvents</Link>
                </div>
                <div className="flex items-center space-x-6">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl"
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>

                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400">Dashboard</Link>
                            <button
                                onClick={logout}
                                className="px-5 py-2 rounded-full border border-blue-100 text-blue-600 font-medium hover:bg-blue-50 transition-all duration-300 dark:border-gray-700 dark:text-blue-400 dark:hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300 dark:hover:text-blue-400">Login</Link>
                            <Link to="/register" className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
