import { body } from 'express-validator';

export const validateAcademicQualification = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('type').isIn(['UG', 'PG']).withMessage('Type must be UG or PG'),
  body('degreeName').notEmpty().withMessage('Degree name is required'),
  body('university').notEmpty().withMessage('University is required'),
  body('yearOfPassing').isInt({ min: 1960 }).withMessage('Valid year is required'),
];
