# Batch Management API Documentation

## Overview
This API provides comprehensive batch management functionality for the PhD Portal system. A batch can contain up to 8 members (students and faculty combined). Admins can create and manage batches, while faculty can upload assignments to their assigned batches.

## Authentication
All endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Base URL
```
/api/batches
```

---

## Batch Management Endpoints

### 1. Create Batch (Admin Only)
**POST** `/api/batches/create`

Creates a new batch with specified parameters.

**Request Body:**
```json
{
    "name": "Batch 2024-A",
    "description": "PhD students batch for academic year 2024-25",
    "academicYear": "2024-25",
    "semester": "Fall",
    "maxCapacity": 8
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "batch_id",
        "name": "Batch 2024-A",
        "description": "PhD students batch for academic year 2024-25",
        "academicYear": "2024-25",
        "semester": "Fall",
        "maxCapacity": 8,
        "students": [],
        "faculties": [],
        "createdBy": {
            "_id": "admin_id",
            "profile": {
                "name": "Admin Name",
                "email": "admin@example.com"
            }
        },
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "message": "Batch created successfully."
}
```

### 2. Get All Batches (Admin/Faculty/Guide)
**GET** `/api/batches/all`

Retrieves all batches with pagination and filtering options.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `isActive` (optional): Filter by active status (default: true)
- `academicYear` (optional): Filter by academic year
- `semester` (optional): Filter by semester

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "_id": "batch_id",
            "name": "Batch 2024-A",
            "students": [...],
            "faculties": [...],
            "totalMembers": 5,
            "isFull": false
        }
    ],
    "pagination": {
        "current": 1,
        "total": 3,
        "count": 10,
        "totalRecords": 25
    }
}
```

### 3. Get Batch by ID (Admin/Faculty/Guide)
**GET** `/api/batches/:id`

Retrieves detailed information about a specific batch.

**Response:**
```json
{
    "success": true,
    "data": {
        "_id": "batch_id",
        "name": "Batch 2024-A",
        "description": "PhD students batch for academic year 2024-25",
        "students": [
            {
                "_id": "student_id",
                "profile": {
                    "name": "Student Name",
                    "email": "student@example.com"
                },
                "role": "Student",
                "programDetails": {
                    "semester": "Fall",
                    "domain": "Computer Science"
                }
            }
        ],
        "faculties": [
            {
                "_id": "faculty_id",
                "profile": {
                    "name": "Faculty Name",
                    "email": "faculty@example.com"
                },
                "role": "Faculty"
            }
        ]
    }
}
```

### 4. Add Student to Batch (Admin Only)
**POST** `/api/batches/add-student`

Adds a student to a specific batch.

**Request Body:**
```json
{
    "batchId": "batch_id",
    "studentId": "student_id"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        // Updated batch object with new student
    },
    "message": "Student added to batch successfully."
}
```

### 5. Add Faculty to Batch (Admin Only)
**POST** `/api/batches/add-faculty`

Adds a faculty member to a specific batch.

**Request Body:**
```json
{
    "batchId": "batch_id",
    "facultyId": "faculty_id"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        // Updated batch object with new faculty
    },
    "message": "Faculty added to batch successfully."
}
```

### 6. Remove Student from Batch (Admin Only)
**POST** `/api/batches/remove-student`

Removes a student from a specific batch.

**Request Body:**
```json
{
    "batchId": "batch_id",
    "studentId": "student_id"
}
```

### 7. Remove Faculty from Batch (Admin Only)
**POST** `/api/batches/remove-faculty`

Removes a faculty member from a specific batch.

**Request Body:**
```json
{
    "batchId": "batch_id",
    "facultyId": "faculty_id"
}
```

### 8. Update Batch (Admin Only)
**PUT** `/api/batches/:id`

Updates batch information.

**Request Body:**
```json
{
    "name": "Updated Batch Name",
    "description": "Updated description",
    "maxCapacity": 6,
    "isActive": true
}
```

### 9. Delete Batch (Admin Only)
**DELETE** `/api/batches/:id`

Deletes a batch and all associated assignments. Students are automatically removed from the batch.

**Response:**
```json
{
    "success": true,
    "message": "Batch deleted successfully."
}
```

### 10. Get My Batches (Student/Faculty)
**GET** `/api/batches/my/batches`

Retrieves batches that the current user is part of.

**Response:**
```json
{
    "success": true,
    "data": [
        {
            // Batch objects user is part of
        }
    ]
}
```

### 11. Get Batch Assignments (All Users in Batch)
**GET** `/api/batches/:batchId/assignments`

Retrieves all assignments for a specific batch.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
    "success": true,
    "data": [
        {
            "_id": "assignment_id",
            "title": "Assignment Title",
            "description": "Assignment Description",
            "deadline": "2024-12-31T23:59:59.000Z",
            "createdBy": {
                "profile": {
                    "name": "Faculty Name",
                    "email": "faculty@example.com"
                }
            },
            "batch": {
                "name": "Batch 2024-A",
                "academicYear": "2024-25"
            }
        }
    ],
    "pagination": {
        "current": 1,
        "total": 2,
        "count": 5,
        "totalRecords": 15
    }
}
```

---

## Assignment API Updates

The assignment creation endpoint has been updated to support batch assignments:

### Create Assignment with Batch
**POST** `/api/assignments/create`

**Request Body:**
```json
{
    "title": "Assignment Title",
    "description": "Assignment Description",
    "deadline": "2024-12-31T23:59:59.000Z",
    "batchId": "batch_id", // Optional - for batch-specific assignments
    "attachments": [
        {
            "filename": "document.pdf",
            "path": "/uploads/document.pdf",
            "mimetype": "application/pdf",
            "size": 1024
        }
    ]
}
```

### Get Assignments by Batch
**GET** `/api/assignments/batch/:batchId`

Retrieves all assignments for a specific batch (accessible by batch members).

---

## Error Responses

All endpoints return consistent error responses:

```json
{
    "success": false,
    "message": "Error description"
}
```

### Common Error Codes:
- **400**: Bad Request - Invalid parameters or batch full
- **401**: Unauthorized - Not authenticated
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Batch/User not found
- **500**: Internal Server Error

---

## Business Rules

1. **Batch Capacity**: Maximum 8 members (students + faculty) per batch
2. **Student Assignment**: Students can only be in one active batch per academic year
3. **Faculty Assignment**: Faculty can be in multiple batches
4. **Assignment Creation**: Only faculty members in a batch can create assignments for that batch
5. **Access Control**: 
   - Admins: Full CRUD operations on batches
   - Faculty/Guides: Can view batches and create assignments
   - Students: Can view their assigned batches and assignments

---

## Database Schema

### Batch Model
```javascript
{
    name: String (required, unique per academic year),
    description: String,
    maxCapacity: Number (default: 8, min: 1, max: 8),
    students: [ObjectId] (ref: 'User'),
    faculties: [ObjectId] (ref: 'User'),
    createdBy: ObjectId (ref: 'User', required),
    isActive: Boolean (default: true),
    academicYear: String (required),
    semester: String (required),
    timestamps: true
}
```

### Updated Assignment Model
```javascript
{
    // ... existing fields
    batch: ObjectId (ref: 'Batch') // New field for batch assignments
}
```

### Updated User Model
```javascript
{
    // ... existing fields
    programDetails: {
        // ... existing fields
        batch: String // Batch name for students
    }
}
```