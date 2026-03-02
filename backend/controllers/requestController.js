const MaintenanceRequest = require('../models/MaintenanceRequest');
const Equipment = require('../models/Equipment');

// GET all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .populate('equipmentId', 'equipmentName serialNumber category')
      .populate('teamId', 'teamName specialization')
      .populate('assignedTechnicianId', 'fullName email')
      .populate('createdBy', 'fullName')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single request
const getRequestById = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id)
      .populate('equipmentId', 'equipmentName serialNumber category department')
      .populate('teamId', 'teamName specialization')
      .populate('assignedTechnicianId', 'fullName email role')
      .populate('createdBy', 'fullName email');
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST create request
const createRequest = async (req, res) => {
  try {
    const {
      subject, description, requestType,
      equipmentId, teamId, assignedTechnicianId,
      priority, scheduledDate,
    } = req.body;

    // Auto-fill teamId from equipment if not provided
    let resolvedTeamId = teamId;
    if (!resolvedTeamId && equipmentId) {
      const equipment = await Equipment.findById(equipmentId);
      if (equipment?.teamId) {
        resolvedTeamId = equipment.teamId;
      }
    }

    const request = await MaintenanceRequest.create({
      subject,
      description,
      requestType,
      equipmentId,
      teamId: resolvedTeamId,
      assignedTechnicianId,
      priority,
      scheduledDate,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, data: request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT update request
const updateRequest = async (req, res) => {
  try {
    // Calculate total cost if parts/labor cost provided
    if (req.body.partsCost || req.body.laborCost) {
      req.body.totalCost =
        (Number(req.body.partsCost) || 0) +
        (Number(req.body.laborCost) || 0);
    }

    const request = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE request
const deleteRequest = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH update status only
const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'Assigned', 'In Progress', 'Repaired', 'Scrapped'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const updateData = { status };

    // If status is Repaired set completedDate
    if (status === 'Repaired') {
      updateData.completedDate = new Date();
    }

    const request = await MaintenanceRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
    res.status(200).json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET requests for calendar
const getCalendarRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find({
      scheduledDate: { $exists: true, $ne: null },
    })
      .populate('equipmentId', 'equipmentName')
      .select('subject requestType scheduledDate status priority');
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
  updateStatus,
  getCalendarRequests,
};