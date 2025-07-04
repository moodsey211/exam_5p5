import { body } from 'express-validator';

export const createValidation = [
  body('product')
    .trim()
    .notEmpty()
    .withMessage('Product is required')
    .isString()
    .withMessage('Product must be a string'),
  body('price')
    .trim()
    .notEmpty()
    .withMessage('Price is required')
    .isFloat()
    .withMessage('Price must be a number'),
  body('qty')
    .trim()
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt()
    .withMessage('Quantity must be an integer'),
];

