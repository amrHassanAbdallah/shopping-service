import {check, validationResult, ValidationError, ValidationChain, Result} from 'express-validator'
import express, {Request, Response} from 'express'

export const expressValidator = (req: Request): ValidationError[] => {
    const errors: Result<ValidationError> = validationResult(req)

    const messages: ValidationError[] = []
    if (!errors.isEmpty()) {
        for (const i of errors.array()) {
            messages.push(i)
        }
    }
    return messages
}
