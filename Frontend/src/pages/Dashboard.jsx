// User Dashboard Component
import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [myEvents, setMyEvents] = useState([]);
    const [invitedEvents, setInvitedEvents] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateOptions, setDateOptions] = useState(['']);
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOptions, setPollOptions] = useState(['', '']);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const myRes = await api.get('/events');
            setMyEvents(myRes.data);
            const invitedRes = await api.get('/events/invited');
            setInvitedEvents(invitedRes.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        const dates = dateOptions.filter(d => d.trim() !== '').map(d => ({ date: d }));
        const pOptions = pollOptions.filter(o => o.trim() !== '');

        try {
            await api.post('/events', {
                title,
                description,
                dateOptions: dates,
                pollQuestion,
                pollOptions: pOptions
            });
            setShowCreate(false);
            fetchData();
            setTitle('');
            setDescription('');
            setDateOptions(['']);
            setPollQuestion('');
            setPollOptions(['', '']);
        } catch (error) {
            alert('Failed to create event');
        }
    };

    const handleInvite = async (eventId, email) => {
        try {
            await api.post(`/events/${eventId}/invite`, { email });
            alert('User invited successfully');
            fetchData();
        } catch (error) {
            alert('Failed to invite user');
        }
    };

    const handleVote = async (eventId, optionIndex) => {
        try {
            await api.post(`/events/${eventId}/vote`, { optionIndex });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to vote');
        }
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/events/${eventId}`);
            fetchData();
        } catch (error) {
            alert('Failed to delete event');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'TBD';
        return new Date(dateString).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 relative min-h-screen">
            {/* Animated Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none fixed">
                <div className="absolute top-10 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-10 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 animate-fade-in-up gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight dark:text-white">
                        Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user && user.name}</span> 👋
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg dark:text-gray-400">Manage your events and polls from here.</p>
                </div>
                <button
                    className="btn-primary flex items-center gap-2 shadow-xl shadow-blue-500/20"
                    onClick={() => setShowCreate(!showCreate)}
                >
                    <span className="text-xl">{showCreate ? '×' : '+'}</span> {showCreate ? 'Close Form' : 'Create Event'}
                </button>
            </div>

            {showCreate && (
                <div className="mb-16 glass-panel p-8 rounded-3xl animate-fade-in-up border border-blue-100 shadow-2xl relative overflow-hidden dark:border-gray-700">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none dark:bg-blue-900/20"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3 dark:text-white">
                            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm dark:bg-blue-900/40 dark:text-blue-300">✨</span>
                            Create New Event
                        </h2>
                        <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">Event Title</label>
                                <input className="input-field bg-white/70 dark:bg-gray-800/70" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Summer Beach Party 🏖️" />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">Description</label>
                                <textarea className="input-field bg-white/70 min-h-[120px] dark:bg-gray-800/70" value={description} onChange={e => setDescription(e.target.value)} placeholder="What's the plan? Add details..." />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">Possible Dates</label>
                                <input className="input-field bg-white/70 dark:bg-gray-800/70" placeholder="2024-12-25, 2024-12-26" onChange={e => setDateOptions(e.target.value.split(','))} />
                                <p className="text-xs text-gray-400 mt-2 font-medium">Format: YYYY-MM-DD (Comma separated)</p>
                            </div>

                            <div className="col-span-1 md:col-span-2 mt-4 bg-gray-50/50 p-6 rounded-2xl border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700">
                                <h3 className="text-lg font-bold mb-4 text-gray-700 flex items-center gap-2 dark:text-gray-200">
                                    <span className="text-purple-500">📊</span> Add a Poll
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-400">Question</label>
                                        <input className="input-field bg-white dark:bg-gray-800" value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} placeholder="e.g. Best time to meet?" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-2 dark:text-gray-400">Options</label>
                                        <input className="input-field bg-white dark:bg-gray-800" placeholder="Option 1, Option 2" onChange={e => setPollOptions(e.target.value.split(','))} />
                                        <p className="text-xs text-gray-400 mt-2 font-medium">Comma separated</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                                <button type="submit" className="btn-primary w-full md:w-auto px-10 py-3 text-lg">🚀 Launch Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="mb-16 animate-fade-in-up delay-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-10 w-1 bg-blue-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Created Events</h2>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full dark:bg-blue-900/40 dark:text-blue-300">{myEvents.length}</span>
                </div>

                {myEvents.length === 0 ? (
                    <div className="text-center py-20 bg-white/60 rounded-3xl border border-dashed border-gray-300 backdrop-blur-sm dark:bg-gray-800/60 dark:border-gray-700">
                        <div className="text-6xl mb-4 opacity-50">📅</div>
                        <p className="text-gray-500 text-lg font-medium dark:text-gray-400">You haven't created any events yet.</p>
                        <button onClick={() => setShowCreate(true)} className="text-blue-600 font-semibold mt-2 hover:underline dark:text-blue-400">Create your first event</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myEvents.map(event => (
                            <div key={event._id} className="glass-panel p-6 rounded-2xl card-hover relative group border border-white/50">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                    <button
                                        onClick={() => handleDelete(event._id)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                                        title="Delete Event"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 pr-8 dark:text-white">{event.title}</h3>
                                <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed dark:text-gray-300">{event.description}</p>

                                <div className="mb-6">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        🗓️ Proposed Dates
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {event.dateOptions.map((d, idx) => (
                                            <span key={idx} className="bg-blue-50/80 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/30">
                                                {formatDate(d.date)}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {event.poll && (
                                    <div className="mb-6 bg-gray-50/80 p-4 rounded-xl border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700">
                                        <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2 dark:text-gray-200">
                                            📊 {event.poll.question}
                                        </h4>
                                        <div className="space-y-3">
                                            {event.poll.options.map((opt, idx) => (
                                                <div key={idx} className="relative pt-1">
                                                    <div className="flex justify-between text-xs font-medium mb-1">
                                                        <span className="text-gray-600 dark:text-gray-400">{opt.optionText}</span>
                                                        <span className="text-gray-900 dark:text-gray-300">{opt.votes} votes</span>
                                                    </div>
                                                    <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                                                        <div style={{ width: `${Math.min((opt.votes / (event.poll.totalVotes || 1)) * 100, 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-auto pt-5 border-t border-gray-100/50">
                                    <div className="flex gap-2">
                                        <input
                                            className="flex-1 p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all dark:bg-gray-800/50 dark:border-gray-700 dark:text-white"
                                            type="email"
                                            placeholder="Invite friend@email.com"
                                            id={`invite-${event._id}`}
                                        />
                                        <button
                                            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95 dark:bg-blue-600 dark:hover:bg-blue-700"
                                            onClick={() => handleInvite(event._id, document.getElementById(`invite-${event._id}`).value)}
                                        >
                                            Invite
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mb-10 animate-fade-in-up delay-200">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-10 w-1 bg-purple-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Invited Events</h2>
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full dark:bg-purple-900/40 dark:text-purple-300">{invitedEvents.length}</span>
                </div>

                {invitedEvents.length === 0 ? (
                    <div className="text-center py-20 bg-white/60 rounded-3xl border border-dashed border-gray-300 backdrop-blur-sm dark:bg-gray-800/60 dark:border-gray-700">
                        <div className="text-6xl mb-4 opacity-50">💌</div>
                        <p className="text-gray-500 text-lg font-medium dark:text-gray-400">No pending invitations.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {invitedEvents.map(event => (
                            <div key={event._id} className="glass-panel p-6 rounded-2xl card-hover border border-purple-50 dark:border-purple-900/30">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 dark:text-white">{event.title}</h3>
                                <p className="text-gray-600 mb-6 text-sm dark:text-gray-300">{event.description}</p>

                                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-100/50 dark:from-purple-900/20 dark:to-indigo-900/20 dark:border-purple-700/30">
                                    <h4 className="text-sm font-bold text-purple-900 mb-4 flex items-center gap-2 dark:text-purple-300">
                                        <span>🗳️</span> {event.poll?.question || "Poll"}
                                    </h4>
                                    <div className="space-y-3">
                                        {event.poll?.options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleVote(event._id, idx)}
                                                className="w-full text-left p-3 bg-white/80 hover:bg-white hover:shadow-md border border-purple-100 rounded-xl transition-all duration-300 flex justify-between items-center group active:scale-[0.98] dark:bg-gray-800/80 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-300"
                                            >
                                                <span className="text-gray-700 font-medium group-hover:text-purple-700 text-sm transition-colors dark:text-gray-300 dark:group-hover:text-purple-400">{opt.optionText}</span>
                                                <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-bold shadow-sm dark:bg-purple-900/40 dark:text-purple-300">{opt.votes}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-center text-xs text-purple-400 mt-4 font-medium dark:text-purple-500/70">Click an option to cast your vote</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
