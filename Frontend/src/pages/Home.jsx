import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute -top-[30%] -left-[10%] w-[70vw] h-[70vw] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                <div className="text-center max-w-4xl mx-auto glass-panel p-12 rounded-3xl border border-white/40 shadow-2xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-6 drop-shadow-sm">
                        Plan Events Together.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                        The easiest way to schedule events, poll your friends, and find the perfect time for everyone.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-blue-500/30">
                            Get Started Free
                        </Link>
                        <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                            Log In
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="p-6 bg-white/50 rounded-xl hover:bg-white/80 transition-colors duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 text-2xl">
                                📅
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Smart Scheduling</h3>
                            <p className="text-gray-600">Propose multiple dates and let your group vote for the best one.</p>
                        </div>
                        <div className="p-6 bg-white/50 rounded-xl hover:bg-white/80 transition-colors duration-300">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600 text-2xl">
                                📊
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Real-time Polls</h3>
                            <p className="text-gray-600">Instantly see who voted for what and make decisions faster.</p>
                        </div>
                        <div className="p-6 bg-white/50 rounded-xl hover:bg-white/80 transition-colors duration-300">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 text-indigo-600 text-2xl">
                                💌
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">Easy Invites</h3>
                            <p className="text-gray-600">Invite friends via email to join your private event dashboard.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
