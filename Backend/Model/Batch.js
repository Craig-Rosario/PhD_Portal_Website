const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    maxCapacity: {
        type: Number,
        default: 8,
        min: 1,
        max: 8
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    faculties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    academicYear: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: "batches"
});

// Virtual to get total members count
batchSchema.virtual('totalMembers').get(function() {
    return this.students.length + this.faculties.length;
});

// Virtual to check if batch is full
batchSchema.virtual('isFull').get(function() {
    return this.totalMembers >= this.maxCapacity;
});

// Index for better query performance
batchSchema.index({ name: 1, academicYear: 1 });
batchSchema.index({ students: 1 });
batchSchema.index({ faculties: 1 });

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;