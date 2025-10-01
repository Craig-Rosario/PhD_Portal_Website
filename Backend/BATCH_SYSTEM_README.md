# Batch Management System - PhD Portal

## Overview

The Batch Management System allows administrators to organize PhD students and faculty into manageable groups called "batches". Each batch can contain up to 8 members (students and faculty combined) and serves as a organizational unit for assignments and academic activities.

## Features

### For Administrators
- ✅ Create new batches with custom parameters
- ✅ Add/remove students and faculty to/from batches
- ✅ Update batch information (name, description, capacity, etc.)
- ✅ Delete batches (with proper cleanup of assignments)
- ✅ View all batches with filtering and pagination
- ✅ Monitor batch capacity and member distribution

### For Faculty/Guides
- ✅ View assigned batches
- ✅ Create and upload assignments specific to their batches
- ✅ View batch members and their details
- ✅ Access batch-specific assignment analytics

### For Students
- ✅ View their assigned batch information
- ✅ Access batch-specific assignments
- ✅ See batch members and faculty contacts
- ✅ Track batch-related academic activities

## System Architecture

### Models Created/Modified

1. **Batch Model** (`/Model/Batch.js`)
   - Manages batch information, members, and relationships
   - Includes virtual fields for capacity management
   - Proper indexing for performance optimization

2. **Updated Assignment Model** (`/Model/Assignment.js`)
   - Added batch reference for batch-specific assignments
   - Maintains backward compatibility with existing assignments

3. **Updated User Model** (Referenced)
   - Added batch field in programDetails for students
   - Maintains student-batch relationship

### Controllers

1. **BatchController** (`/Controller/BatchController.js`)
   - Complete CRUD operations for batch management
   - Role-based access control implementation
   - Transaction support for data integrity
   - Comprehensive error handling and validation

2. **Updated AssignmentController** (`/Controller/AssignmentController.js`)
   - Enhanced to support batch-specific assignments
   - Faculty authorization for batch assignments
   - Updated submission tracking for batch assignments

### Routes & Middleware

1. **BatchRouter** (`/routes/BatchRouter.js`)
   - RESTful API endpoints for all batch operations
   - Role-based route protection
   - Proper HTTP method usage

2. **Updated RoleAuthenticator** (`/middlewares/roleAuthenticator.js`)
   - Enhanced to support multiple role authorization
   - Improved error handling and security

## Installation & Setup

1. **Database Models**: All models are ready to use with MongoDB
2. **API Routes**: Batch routes are integrated into the main application
3. **Middleware**: Authentication and authorization are properly configured

## API Endpoints Quick Reference

### Batch Management
- `POST /api/batches/create` - Create new batch (Admin)
- `GET /api/batches/all` - Get all batches (Admin/Faculty/Guide)
- `GET /api/batches/:id` - Get batch details (Admin/Faculty/Guide)
- `PUT /api/batches/:id` - Update batch (Admin)
- `DELETE /api/batches/:id` - Delete batch (Admin)

### Member Management
- `POST /api/batches/add-student` - Add student to batch (Admin)
- `POST /api/batches/add-faculty` - Add faculty to batch (Admin)
- `POST /api/batches/remove-student` - Remove student from batch (Admin)
- `POST /api/batches/remove-faculty` - Remove faculty from batch (Admin)

### User Access
- `GET /api/batches/my/batches` - Get user's batches (All authenticated users)
- `GET /api/batches/:batchId/assignments` - Get batch assignments (Batch members)

### Enhanced Assignment Endpoints
- `POST /api/assignments/create` - Create assignment (with optional batchId)
- `GET /api/assignments/batch/:batchId` - Get assignments for batch

## Usage Examples

### Creating a Batch (Admin)
```javascript
const batchData = {
    name: "PhD Batch 2024-A",
    description: "Computer Science PhD students for Fall 2024",
    academicYear: "2024-25",
    semester: "Fall",
    maxCapacity: 8
};

fetch('/api/batches/create', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(batchData)
});
```

### Adding Students to Batch (Admin)
```javascript
const addStudent = {
    batchId: "batch_id_here",
    studentId: "student_id_here"
};

fetch('/api/batches/add-student', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(addStudent)
});
```

### Creating Batch Assignment (Faculty)
```javascript
const assignmentData = {
    title: "Research Proposal Assignment",
    description: "Submit your research proposal draft",
    deadline: "2024-12-31T23:59:59.000Z",
    batchId: "batch_id_here",
    attachments: []
};

fetch('/api/assignments/create', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(assignmentData)
});
```

## Business Logic & Validation

### Capacity Management
- Each batch has a maximum capacity of 8 members
- System prevents adding members when batch is full
- Real-time capacity tracking with virtual fields

### Academic Year Constraints
- Students can only be in one active batch per academic year
- Faculty can be assigned to multiple batches
- Automatic conflict detection and prevention

### Data Integrity
- Transaction support for multi-document operations
- Proper cleanup when removing students or deleting batches
- Foreign key relationships maintained

### Security & Authorization
- Role-based access control at every endpoint
- Batch membership verification for sensitive operations
- Comprehensive input validation and sanitization

## Error Handling

The system provides comprehensive error handling with:
- Descriptive error messages
- Proper HTTP status codes
- Transaction rollback on failures
- Validation error details

## Performance Optimization

- Database indexing on frequently queried fields
- Pagination support for large datasets
- Efficient population of related documents
- Optimized query patterns

## Testing Recommendations

1. **Unit Tests**: Test individual controller functions
2. **Integration Tests**: Test complete API workflows
3. **Load Tests**: Verify performance with multiple batches
4. **Security Tests**: Validate authorization and input sanitization

## Future Enhancements

Potential improvements for the system:
- Batch analytics and reporting dashboard
- Automated batch creation based on criteria
- Batch communication/messaging features
- Integration with calendar for batch events
- Export/import functionality for batch data

## Support & Maintenance

The batch management system is designed for:
- Easy maintenance and updates
- Scalable architecture
- Comprehensive logging and monitoring
- Clear separation of concerns

For any issues or questions, refer to the API documentation or contact the development team.