// Event Management Logic
const Event = require('../models/Event');
const User = require('../models/User');

// @desc    Get user events
// @route   GET /api/events
// @access  Private
const getEvents = async (req, res) => {
    const events = await Event.find({ user: req.user.id });
    res.status(200).json(events);
};

// @desc    Get invited events
// @route   GET /api/events/invited
// @access  Private
const getInvitedEvents = async (req, res) => {
    const events = await Event.find({ participants: req.user.id });
    res.status(200).json(events);
};


// @desc    Create event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
    const { title, description, dateOptions, pollQuestion, pollOptions } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    let poll = {};
    if (pollQuestion && pollOptions) {
        poll = {
            question: pollQuestion,
            options: pollOptions.map(opt => ({ optionText: opt })),
            voters: []
        };
    }

    const event = await Event.create({
        user: req.user.id,
        title,
        description,
        dateOptions, // Expecting array of objects or strings, ideally [{date: '...'}]
        poll
    });

    res.status(200).json(event);
};


// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    // Check for user
    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the event user
    if (event.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedEvent);
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
    }

    if (event.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await event.deleteOne();

    res.status(200).json({ id: req.params.id });
};

// @desc    Invite user to event
// @route   POST /api/events/:id/invite
// @access  Private
const inviteUser = async (req, res) => {
    const { email } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    if (event.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to invite' });
    }

    const userToInvite = await User.findOne({ email });
    if (!userToInvite) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!event.participants.includes(userToInvite._id)) {
        event.participants.push(userToInvite._id);
        await event.save();
    }

    res.status(200).json(event);
};


// @desc    Vote on poll
// @route   POST /api/events/:id/vote
// @access  Private
const votePoll = async (req, res) => {
    const { optionIndex } = req.body; // Index of the option in the array
    const event = await Event.findById(req.params.id);

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is participant or creator (optional, requirement says invited users)
    const isParticipant = event.participants.includes(req.user.id);
    const isCreator = event.user.toString() === req.user.id;

    if (!isParticipant && !isCreator) {
        return res.status(401).json({ message: 'Not authorized to vote' });
    }

    // Check if already voted
    const alreadyVoted = event.poll.voters.find(v => v.user.toString() === req.user.id);
    if (alreadyVoted) {
        return res.status(400).json({ message: 'Already voted' });
    }

    if (optionIndex < 0 || optionIndex >= event.poll.options.length) {
        return res.status(400).json({ message: 'Invalid option' });
    }

    event.poll.options[optionIndex].votes += 1;
    event.poll.voters.push({ user: req.user.id, optionIndex });

    await event.save();
    res.status(200).json(event);
};

module.exports = {
    getEvents,
    getInvitedEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    inviteUser,
    votePoll
};
