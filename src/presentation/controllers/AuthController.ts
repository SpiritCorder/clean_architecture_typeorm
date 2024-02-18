import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../application/AuthService";
import { inject, injectable } from "tsyringe";


@injectable()
export class AuthController {

    constructor(
        @inject("AuthService") private readonly authService: AuthService
    ) {}

    async onSignUp(req: Request, res: Response, next: NextFunction) {
        const {email, password, firstName, lastName, phone, streetNo, street1, street2, zip} = req.body;

        // validations
        // check for all requried fields
        if(!email || !password || !firstName || !lastName) {
            return res.status(400).json({message: "All fields are required"});
        }

        // check for email format
        if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        // address validation
        if((streetNo || street1 || street2 || zip) && !(streetNo && street1 && zip)) {
            return res.status(400).json({message: "Address must have street no, street 1, zip"});
        }

        try {
            const {accessToken, refreshToken, user} = await this.authService.signUp(req.body);

            res.cookie('jwt_refresh_token', refreshToken, {httpOnly: true, secure: false, sameSite: false, maxAge: 24 * 60 * 60 * 1000})

            res.status(201).json({message: "sigunup success", data: {accessToken, user}});
            
        } catch (err) {
            next(err);
        }
    }

    async onSignIn(req: Request, res: Response, next: NextFunction) {
        const {email, password} = req.body;

        if(!email.trim() || !password.trim()) {
            return res.status(400).json({message: "Both email password are required"});
        }

        if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        try {
            const {accessToken, refreshToken, user} = await this.authService.signIn(email, password);

            res.cookie('jwt_refresh_token', refreshToken, {httpOnly: true, secure: false, sameSite: false, maxAge: 24 * 60 * 60 * 1000})

            res.status(200).json({message: "signin success", data: {accessToken, user}});

        } catch (err) {
            next(err);
        }
    }

    async onRefresh(req: Request, res: Response, next: NextFunction) {
        const cookies = req.cookies;

        if(!cookies?.jwt_refresh_token) {
            return res.status(401).json({message: "unauthorized"});
        }

        const token = req.cookies.jwt_refresh_token;

        // validate the cookie with firebase auth
        try {
            const {accessToken, refreshToken, user} = await this.authService.refresh(token);
            res.cookie('jwt_refresh_token', refreshToken, {httpOnly: true, secure: false, sameSite: false, maxAge: 24 * 60 * 60 * 1000});
            res.status(200).json({message: "access token renewed successfully", data: {accessToken, user}});
        } catch (err) {
            next(err);
        }
        
    }

    async onSignOut(req: Request, res: Response, next: NextFunction) {
        // remove the jwt cookie from the request headers
        const cookies = req.cookies;

        if(!cookies?.jwt_refresh_token) {
            return res.status(200).json({message: "signout successful"});
        }

        res.clearCookie('jwt_refresh_token', {
            httpOnly: true,
            secure: false,
            sameSite: false,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({message: "signout successful"});
    }
}