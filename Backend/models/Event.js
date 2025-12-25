const mongoose = require('mongoose');

const pollOptionSchema = mongoose.Schema({
    optionText: { type: String, required: true },
    votes: { type: Number, default: 0 },
});

const eventSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dateOptions: [
        {
            date: { type: Date }, // Or String depending on flexibility needed
            voteCount: { type: Number, default: 0 } // If polling for dates specifically
        }
    ],
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    poll: {
        question: { type: String },
        options: [pollOptionSchema],
        voters: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            optionIndex: { type: Number }
        }]
    },
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
