import { body } from 'express-validator';

export const validateEmploymentRecord = [
  body('designation').notEmpty().withMessage('Designation is required'),
  body('employer').notEmpty().withMessage('Employer is required'),
  body('startDate').isISO8601().withMessage('Start date is required'),
  body('endDate').isISO8601().withMessage('End date is required'),
];
