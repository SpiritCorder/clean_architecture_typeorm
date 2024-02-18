import { NextFunction, Request, Response } from "express";
import { SubError } from "../../config/SubError";


export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    const statusCode = 404;
    const message = "route not found";
    const error = new SubError(message, statusCode);
    next(error);
}

export const error = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    const message = err.message ? err.message : "Internal server error";
    res.status(statusCode).json({message});
}