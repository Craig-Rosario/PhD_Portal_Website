const express = require('express');
const router = express.Router();
const {
    createBatch,
    getAllBatches,
    getBatchById,
    addStudentToBatch,
    addFacultyToBatch,
    removeStudentFromBatch,
    removeFacultyFromBatch,
    getBatchAssignments,
    getMyBatches,
    updateBatch,
    deleteBatch
} = require('../Controller/BatchController');

const authMiddleware = require('../middlewares/auth');
const { authorizeRoles } = require('../middlewares/roleAuthenticator');

// Admin only routes
router.post('/create', authMiddleware, authorizeRoles('Admin'), createBatch);
router.post('/add-student', authMiddleware, authorizeRoles('Admin'), addStudentToBatch);
router.post('/add-faculty', authMiddleware, authorizeRoles('Admin'), addFacultyToBatch);
router.post('/remove-student', authMiddleware, authorizeRoles('Admin'), removeStudentFromBatch);
router.post('/remove-faculty', authMiddleware, authorizeRoles('Admin'), removeFacultyFromBatch);
router.put('/:id', authMiddleware, authorizeRoles('Admin'), updateBatch);
router.delete('/:id', authMiddleware, authorizeRoles('Admin'), deleteBatch);

// Admin and Faculty routes
router.get('/all', authMiddleware, authorizeRoles('Admin', 'Faculty', 'Guide'), getAllBatches);
router.get('/:id', authMiddleware, authorizeRoles('Admin', 'Faculty', 'Guide'), getBatchById);
router.get('/:batchId/assignments', authMiddleware, authorizeRoles('Admin', 'Faculty', 'Guide', 'Student'), getBatchAssignments);

// All user routes
router.get('/my/batches', authMiddleware, getMyBatches);

module.exports = router;
