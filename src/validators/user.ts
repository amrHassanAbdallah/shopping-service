import {check, ValidationChain} from "express-validator";

export const userCreateValidator = (): ValidationChain[] => [
    check('first_name').notEmpty().withMessage('first_name is required'),
    check('last_name').notEmpty().withMessage('last_name is required'),
    check('password').notEmpty().withMessage('password is required'),
    check('username').notEmpty().withMessage('username is required'),
]
