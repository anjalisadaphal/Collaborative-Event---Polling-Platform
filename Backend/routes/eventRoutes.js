const express = require('express');
const router = express.Router();
const {
    getEvents,
    getInvitedEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    inviteUser,
    votePoll
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getEvents).post(protect, createEvent);
router.route('/invited').get(protect, getInvitedEvents);
router.route('/:id').put(protect, updateEvent).delete(protect, deleteEvent);
router.route('/:id/invite').post(protect, inviteUser);
router.route('/:id/vote').post(protect, votePoll);

module.exports = router;
