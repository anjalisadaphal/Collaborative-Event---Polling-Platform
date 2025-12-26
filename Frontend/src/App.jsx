// Main Component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Router>
                    <Navbar />
                    <div className="w-full"> {/* Removed padding/container to allow Hero to be full width */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </div>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
