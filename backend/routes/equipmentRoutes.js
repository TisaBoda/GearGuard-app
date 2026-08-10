const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const {
  getAllEquipment, getEquipment,
  createEquipment, updateEquipment, deleteEquipment
} = require('../controllers/equipmentController');

router.get('/', protect, getAllEquipment);
router.get('/:id', protect, getEquipment);
router.post('/', protect, authorize('Admin', 'Manager'), createEquipment);
router.put('/:id', protect, authorize('Admin', 'Manager'), updateEquipment);
router.delete('/:id', protect, authorize('Admin'), deleteEquipment);

module.exports = router;