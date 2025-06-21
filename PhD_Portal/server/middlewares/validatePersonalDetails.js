import { body } from 'express-validator';

export const validatePersonalDetails = [
  body('title').notEmpty().withMessage('Title is required'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('mobile').isMobilePhone().withMessage('Valid mobile number is required'),
];
