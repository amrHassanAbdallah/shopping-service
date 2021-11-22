import {check, ValidationChain} from "express-validator";

export const productCreateValidator = (): ValidationChain[] => [
    check('name').notEmpty().withMessage('name is required'),
    check('price').notEmpty().withMessage('price is required'),
    check('price').isNumeric().withMessage('price must be a number')
]
