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

                <div className="text-center max-w-4xl mx-auto glass-panel p-12 rounded-3xl border border-white/40 shadow-2xl relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-6 drop-shadow-sm animate-fade-in-up">
                        Plan Events Together.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-100">
                        The easiest way to schedule events, poll your friends, and find the perfect time for everyone.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                        <Link to="/register" className="btn-primary text-lg px-8 py-4 shadow-lg shadow-blue-500/30">
                            Get Started Free
                        </Link>
                        <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                            Log In
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left animate-fade-in-up delay-300">
                        <div className="p-8 bg-white/40 rounded-2xl border border-white/60 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 text-3xl group-hover:scale-110 transition-transform duration-300">
                                📅
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-800">Smart Scheduling</h3>
                            <p className="text-gray-600 leading-relaxed">Propose multiple dates and let your group vote for the best one.</p>
                        </div>
                        <div className="p-8 bg-white/40 rounded-2xl border border-white/60 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group">
                            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 text-3xl group-hover:scale-110 transition-transform duration-300">
                                📊
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-800">Real-time Polls</h3>
                            <p className="text-gray-600 leading-relaxed">Instantly see who voted for what and make decisions faster.</p>
                        </div>
                        <div className="p-8 bg-white/40 rounded-2xl border border-white/60 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group">
                            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 text-3xl group-hover:scale-110 transition-transform duration-300">
                                💌
                            </div>
                            <h3 className="font-bold text-xl mb-3 text-gray-800">Easy Invites</h3>
                            <p className="text-gray-600 leading-relaxed">Invite friends via email to join your private event dashboard.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
