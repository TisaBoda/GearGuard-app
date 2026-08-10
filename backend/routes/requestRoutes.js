const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const {
  getAllRequests, getRequestById,
  createRequest, updateRequest,
  deleteRequest, updateStatus,
  getCalendarRequests,
} = require('../controllers/requestController');

router.get('/calendar', protect, getCalendarRequests);

router.get('/', protect, getAllRequests);
router.post('/', protect, authorize('Admin', 'Manager', 'Technician'), upload.single('image'), createRequest);

router.get('/:id', protect, getRequestById);
router.put('/:id', protect, authorize('Admin', 'Manager', 'Technician'), upload.single('image'), updateRequest);
router.delete('/:id', protect, authorize('Admin', 'Manager'), deleteRequest);

router.patch('/:id/status', protect, authorize('Admin', 'Manager', 'Technician'), updateStatus);

module.exports = router;