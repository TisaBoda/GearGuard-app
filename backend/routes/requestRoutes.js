const express = require('express');
const router = express.Router();
const {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
  updateStatus,
  getCalendarRequests,
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

// Calendar route (before /:id to avoid conflict)
router.get('/calendar', protect, getCalendarRequests);

// Main routes
router.route('/')
  .get(protect, getAllRequests)
  .post(protect, createRequest);

router.route('/:id')
  .get(protect, getRequestById)
  .put(protect, updateRequest)
  .delete(protect, deleteRequest);

// Status update
router.patch('/:id/status', protect, updateStatus);

module.exports = router;