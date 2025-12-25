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
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">
                    Hello, <span className="text-blue-600">{user && user.name}</span> 👋
                </h1>
                <button
                    className="btn-primary flex items-center gap-2"
                    onClick={() => setShowCreate(!showCreate)}
                >
                    {showCreate ? 'Close Form' : '+ New Event'}
                </button>
            </div>

            {showCreate && (
                <div className="mb-12 glass-panel p-8 rounded-2xl animate-fade-in-down">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Event</h2>
                    <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                            <input className="input-field" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Birthday Party" />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea className="input-field min-h-[100px]" value={description} onChange={e => setDescription(e.target.value)} placeholder="What's the plan?" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Possible Dates (YYYY-MM-DD)</label>
                            <input className="input-field" placeholder="2024-12-25, 2024-12-26" onChange={e => setDateOptions(e.target.value.split(','))} />
                            <p className="text-xs text-gray-500 mt-1">Comma separated</p>
                        </div>

                        <div className="col-span-1 md:col-span-2 mt-4 border-t border-gray-200 pt-4">
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Add a Poll</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                                    <input className="input-field" value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} placeholder="e.g. Best time to meet?" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                                    <input className="input-field" placeholder="Option 1, Option 2" onChange={e => setPollOptions(e.target.value.split(','))} />
                                    <p className="text-xs text-gray-500 mt-1">Comma separated</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
                            <button type="submit" className="btn-primary w-full md:w-auto px-8">Save Event</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-blue-600 pl-4">My Created Events</h2>
                {myEvents.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">You haven't created any events yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {myEvents.map(event => (
                            <div key={event._id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover relative group">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleDelete(event._id)}
                                        className="text-red-400 hover:text-red-600 p-1"
                                        title="Delete Event"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                                <div className="mb-4">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Proposed Dates</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {event.dateOptions.map((d, idx) => (
                                            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                {formatDate(d.date)}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {event.poll && (
                                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">{event.poll.question}</h4>
                                        <div className="space-y-2">
                                            {event.poll.options.map((opt, idx) => (
                                                <div key={idx} className="flex justify-between text-sm">
                                                    <span className="text-gray-600">{opt.optionText}</span>
                                                    <span className="font-bold text-gray-900">{opt.votes} votes</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex gap-2">
                                        <input
                                            className="flex-1 p-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                            type="email"
                                            placeholder="Invite friend@email.com"
                                            id={`invite-${event._id}`}
                                        />
                                        <button
                                            className="px-4 py-2 bg-gray-900 text-white rounded text-sm hover:bg-gray-800 transition-colors"
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

            <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-purple-600 pl-4">Invited Events</h2>
                {invitedEvents.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No pending invitations.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {invitedEvents.map(event => (
                            <div key={event._id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                <p className="text-gray-600 mb-4">{event.description}</p>

                                <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                                    <h4 className="text-sm font-bold text-purple-800 mb-3">
                                        {event.poll?.question || "Poll"}
                                    </h4>
                                    <div className="space-y-2">
                                        {event.poll?.options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleVote(event._id, idx)}
                                                className="w-full text-left p-3 bg-white hover:bg-purple-100 border border-purple-200 rounded-md transition-all duration-200 flex justify-between items-center group"
                                            >
                                                <span className="text-gray-700 font-medium group-hover:text-purple-700">{opt.optionText}</span>
                                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">{opt.votes}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-center text-xs text-purple-400 mt-3">Click an option to vote</p>
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
