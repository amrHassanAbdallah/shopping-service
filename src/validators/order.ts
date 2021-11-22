import {check, ValidationChain} from "express-validator";

export const orderCreateValidator = (): ValidationChain[] => [
    check('products').notEmpty().withMessage('products is required'),
    check('products.*.id').notEmpty().withMessage("product's id is required"),
    check('products.*.quantity').notEmpty().withMessage("product's quantity is required"),
    check('products.*.quantity').isNumeric().withMessage("product's quantity must be a number"),
    check('products.*.id').isNumeric().withMessage("product's id must be a number"),
]
