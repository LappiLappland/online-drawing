import { Request, Response, NextFunction } from 'express';

export type ValidatorFn = (body: unknown) => string[] | undefined;

export function validateBody(validator: ValidatorFn) {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = validator(req.body);
        if (errors) {
            return res.status(400).json({ errors });
        }

        next();
    };
}
