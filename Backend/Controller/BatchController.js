const Batch = require('../Model/Batch');
const User = require('../Model/User');
const Assignment = require('../Model/Assignment');
const mongoose = require('mongoose');

// Create a new batch (Admin only)
async function createBatch(req, res) {
    try {
        const { name, description, academicYear, semester, maxCapacity } = req.body;

        if (!name || !academicYear || !semester) {
            return res.status(400).json({ 
                success: false, 
                message: "Name, academic year, and semester are required." 
            });
        }

        // Check if batch with same name exists for the academic year
        const existingBatch = await Batch.findOne({ name, academicYear });
        if (existingBatch) {
            return res.status(400).json({ 
                success: false, 
                message: "Batch with this name already exists for the academic year." 
            });
        }

        const batch = await Batch.create({
            name,
            description: description || "",
            academicYear,
            semester,
            maxCapacity: maxCapacity || 8,
            createdBy: req.user._id,
            students: [],
            faculties: []
        });

        const populatedBatch = await Batch.findById(batch._id)
            .populate('students', 'profile.name profile.email role')
            .populate('faculties', 'profile.name profile.email role')
            .populate('createdBy', 'profile.name profile.email');

        return res.status(201).json({ 
            success: true, 
            data: populatedBatch,
            message: "Batch created successfully." 
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
    }
}

// Get all batches (Admin and Faculty)
async function getAllBatches(req, res) {
    try {
        const { page = 1, limit = 10, isActive = true, academicYear, semester } = req.query;

        const filter = {};
        if (isActive !== undefined) filter.isActive = isActive === 'true';
        if (academicYear) filter.academicYear = academicYear;
        if (semester) filter.semester = semester;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            populate: [
                { path: 'students', select: 'profile.name profile.email role' },
                { path: 'faculties', select: 'profile.name profile.email role' },
                { path: 'createdBy', select: 'profile.name profile.email' }
            ],
            sort: { createdAt: -1 }
        };

        const batches = await Batch.find(filter)
            .populate('students', 'profile.name profile.email role')
            .populate('faculties', 'profile.name profile.email role')
            .populate('createdBy', 'profile.name profile.email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Batch.countDocuments(filter);

        return res.json({ 
            success: true, 
            data: batches,
            pagination: {
                current: parseInt(page),
                total: Math.ceil(total / limit),
                count: batches.length,
                totalRecords: total
            }
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
    }
}

// Get batch by ID
async function getBatchById(req, res) {
    try {
        const { id } = req.params;

        const batch = await Batch.findById(id)
            .populate('students', 'profile.name profile.email role programDetails.semester programDetails.domain')
            .populate('faculties', 'profile.name profile.email role programDetails.department')
            .populate('createdBy', 'profile.name profile.email');

        if (!batch) {
            return res.status(404).json({ 
                success: false, 
                message: 'Batch not found' 
            });
        }

        return res.json({ 
            success: true, 
            data: batch 
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
    }
}

// Add student to batch (Admin only)
async function addStudentToBatch(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { batchId, studentId } = req.body;

        if (!batchId || !studentId) {
            return res.status(400).json({ 
                success: false, 
                message: "Batch ID and Student ID are required." 
            });
        }

        const batch = await Batch.findById(batchId).session(session);
        if (!batch) {
            return res.status(404).json({ 
                success: false, 
                message: 'Batch not found' 
            });
        }

        const student = await User.findById(studentId).session(session);
        if (!student || student.role !== 'Student') {
            return res.status(404).json({ 
                success: false, 
                message: 'Student not found or invalid role' 
            });
        }

        // Check if batch is full
        if (batch.totalMembers >= batch.maxCapacity) {
            return res.status(400).json({ 
                success: false, 
                message: 'Batch is full. Cannot add more members.' 
            });
        }

        // Check if student is already in the batch
        if (batch.students.includes(studentId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Student is already in this batch.' 
            });
        }

        // Check if student is already in another batch for the same academic year
        const existingBatch = await Batch.findOne({
            students: studentId,
            academicYear: batch.academicYear,
            isActive: true
        }).session(session);

        if (existingBatch) {
            return res.status(400).json({ 
                success: false, 
                message: `Student is already assigned to batch "${existingBatch.name}" for academic year ${batch.academicYear}.` 
            });
        }

        // Add student to batch
        batch.students.push(studentId);
        await batch.save({ session });

        // Update student's batch field
        await User.findByIdAndUpdate(
            studentId, 
            { 'programDetails.batch': batch.name },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        const updatedBatch = await Batch.findById(batchId)
            .populate('students', 'profile.name profile.email role')
            .populate('faculties', 'profile.name profile.email role');

        return res.json({ 
            success: true, 
            data: updatedBatch,
            message: "Student added to batch successfully." 
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
    }
}

// Add faculty to batch (Admin only)
async function addFacultyToBatch(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { batchId, facultyId } = req.body;

        if (!batchId || !facultyId) {
            return res.status(400).json({ 
                success: false, 
                message: "Batch ID and Faculty ID are required." 
            });
        }

        const batch = await Batch.findById(batchId).session(session);
        if (!batch) {
            return res.status(404).json({ 
                success: false, 
                message: 'Batch not found' 
            });
        }

        const faculty = await User.findById(facultyId).session(session);
        if (!faculty || !['Faculty', 'Guide'].includes(faculty.role)) {
            return res.status(404).json({ 
                success: false, 
                message: 'Faculty not found or invalid role' 
            });
        }

        // Check if batch is full
        if (batch.totalMembers >= batch.maxCapacity) {
            return res.status(400).json({ 
                success: false, 
                message: 'Batch is full. Cannot add more members.' 
            });
        }

        // Check if faculty is already in the batch
        if (batch.faculties.includes(facultyId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Faculty is already in this batch.' 
            });
        }

        // Add faculty to batch
        batch.faculties.push(facultyId);
        await batch.save({ session });

        await session.commitTransaction();
        session.endSession();

        const updatedBatch = await Batch.findById(batchId)
            .populate('students', 'profile.name profile.email role')
            .populate('faculties', 'profile.name profile.email role');

        return res.json({ 
            success: true, 
            data: updatedBatch,
            message: "Faculty added to batch successfully." 
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
    }
}

// Remove student from batch (Admin only)
async function removeStudentFromBatch(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { batchId, studentId } = req.body;

        if (!batchId || !studentId) {
            return res.status(400).json({ 
                success: false, 
                message: "Batch ID and Student ID are required." 
            });
        }

        const batch = await Batch.findById(batchId).session(session);
        if (!batch) {
            return res.status(404).json({ 
                success: false, 
                message: 'Batch not found' 
            });
        }

        // Check if student is in the batch
        if (!batch.students.includes(studentId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Student is not in this batch.' 
            });
        }

        // Remove student from batch
        batch.students = batch.students.filter(id => id.toString() !== studentId);
        await batch.save({ session });

        // Update student's batch field
        await User.findByIdAndUpdate(
            studentId, 
            { $unset: { 'programDetails.batch': "" } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        const updatedBatch = await Batch.findById(batchId)
            .populate('students', 'profile.name profile.email role')
            .populate('faculties', 'profile.name profile.email role');

        return res.json({ 
            success: true, 
            data: updatedBatch,
            message: "Student removed from batch successfully." 
        });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
    }
}

// Remove faculty from batch (Admin only)
async function removeFacultyFromBatch(req, res) {
    try {
        const { batchId, facultyId } = req.body;

        if (!batchId || !facultyId) {
            return res.status(400).json({ 
                success: false, 
                message: "Batch ID and Faculty ID are required." 
            });
        }

        const batch = await Batch.findById(batchId);
        if (!batch) {
            return res.status(404).json({ 
                success: false, 
                message: 'Batch not found' 
            });
        }

        // Check if faculty is in the batch
        if (!batch.faculties.includes(facultyId)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Faculty is not in this batch.' 
            });
        }

        // Remove faculty from batch
        batch.faculties = batch.faculties.filter(id => id.toString() !== facultyId);
        await batch.save();

        const updatedBatch = await Batch.findById(batchId)
            .populate('students', 'profile.name profile.email role')
            .populate('faculties', 'profile.name profile.email role');

        return res.json({ 
            success: true, 
            data: updatedBatch,
            message: "Faculty removed from batch successfully." 
        });

    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
    }
}

// Get assignments for a specific batch
async function getBatchAssignments(req, res) {
    try {
        const { batchId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const batch = await Batch.findById(batchId);
        if (!batch) {
            return res.status(404).json({ 
                success: false, 
                message: 'Batch not found' 
            });
        }

        const assignments = await Assignment.find({ batch: batchId })
            .populate('createdBy', 'profile.name profile.email role')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Assignment.countDocuments({ batch: batchId });

        return res.json({ 
            success: true, 
            data: assignments,
            pagination: {
                current: parseInt(page),
                total: Math.ceil(total / limit),
                count: assignments.length,
                totalRecords: total
            }
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
    }
}

// Get batches for current user (Student/Faculty)
async function getMyBatches(req, res) {
    try {
        const userId = req.user._id;
        const userRole = req.user.role;

        let batches;
        if (userRole === 'Student') {
            batches = await Batch.find({ students: userId, isActive: true })
                .populate('students', 'profile.name profile.email role')
                .populate('faculties', 'profile.name profile.email role')
                .sort({ createdAt: -1 });
        } else if (['Faculty', 'Guide'].includes(userRole)) {
            batches = await Batch.find({ faculties: userId, isActive: true })
                .populate('students', 'profile.name profile.email role')
                .populate('faculties', 'profile.name profile.email role')
                .sort({ createdAt: -1 });
        } else {
            return res.status(403).json({ 
                success: false, 
                message: 'Access denied' 
            });
        }

        return res.json({ 
            success: true, 
            data: batches 
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
    }
}

// Update batch details (Admin only)
async function updateBatch(req, res) {
    try {
        const { id } = req.params;
        const { name, description, academicYear, semester, maxCapacity, isActive } = req.body;

        const batch = await Batch.findById(id);
        if (!batch) {
            return res.status(404).json({ 
                success: false, 
                message: 'Batch not found' 
            });
        }

        // If name or academicYear is being changed, check for duplicates
        if ((name && name !== batch.name) || (academicYear && academicYear !== batch.academicYear)) {
            const existingBatch = await Batch.findOne({ 
                name: name || batch.name, 
                academicYear: academicYear || batch.academicYear,
                _id: { $ne: id }
            });
            if (existingBatch) {
                return res.status(400).json({ 
                    success: false, 
                    message: "Batch with this name already exists for the academic year." 
                });
            }
        }

        // If maxCapacity is being reduced, check if current members exceed new capacity
        if (maxCapacity && maxCapacity < batch.totalMembers) {
            return res.status(400).json({ 
                success: false, 
                message: `Cannot reduce capacity to ${maxCapacity}. Current members: ${batch.totalMembers}` 
            });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (academicYear) updateData.academicYear = academicYear;
        if (semester) updateData.semester = semester;
        if (maxCapacity) updateData.maxCapacity = maxCapacity;
        if (isActive !== undefined) updateData.isActive = isActive;

        const updatedBatch = await Batch.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        )
        .populate('students', 'profile.name profile.email role')
        .populate('faculties', 'profile.name profile.email role')
        .populate('createdBy', 'profile.name profile.email');

        return res.json({ 
            success: true, 
            data: updatedBatch,
            message: "Batch updated successfully." 
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
    }
}

// Delete batch (Admin only)
async function deleteBatch(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        const batch = await Batch.findById(id).session(session);
        if (!batch) {
            return res.status(404).json({ 
                success: false, 
                message: 'Batch not found' 
            });
        }

        // Remove batch reference from all students
        await User.updateMany(
            { _id: { $in: batch.students } },
            { $unset: { 'programDetails.batch': "" } },
            { session }
        );

        // Delete all assignments associated with this batch
        await Assignment.deleteMany({ batch: id }, { session });

        // Delete the batch
        await Batch.findByIdAndDelete(id, { session });

        await session.commitTransaction();
        session.endSession();

        return res.json({ 
            success: true, 
            message: "Batch deleted successfully." 
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
    }
}

module.exports = {
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
};
