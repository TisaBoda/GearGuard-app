const express = require('express');
const router = express.Router();
const {
  getAllTeams, getTeamById,
  createTeam, updateTeam, deleteTeam,
  addMember, removeMember,
} = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', protect, getAllTeams);
router.get('/:id', protect, getTeamById);
router.post('/', protect, authorize('Admin', 'Manager'), createTeam);
router.put('/:id', protect, authorize('Admin', 'Manager'), updateTeam);
router.delete('/:id', protect, authorize('Admin', 'Manager'), deleteTeam);

router.post('/:id/members', protect, authorize('Admin', 'Manager'), addMember);
router.delete('/:id/members/:userId', protect, authorize('Admin', 'Manager'), removeMember);

module.exports = router;