import { SubError } from "../../config/SubError";
import { IExternalAuthService } from "../../domains/serviceInterfaces/IExternalAuthService";



export class ExternalAuthService implements IExternalAuthService {

    async signUp(email: string, password: string): Promise<any> {

        try {

            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_WEB_API_KEY}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password, returnSecureToken: true})
            });

            if(!response.ok) {
                // handle errors
                let error = await response.text();
                const {error: {code, message}}: {error: {code: number; message: string;}} = JSON.parse(error);
                
                if(message === "WEAK_PASSWORD : Password should be at least 6 characters") {
                    //return res.status(code).json({message: "Password should be at least 6 character"});
                    throw new SubError("Password should be at least 6 character", code)
                }
                if(message === "EMAIL_EXISTS") {
                    //return res.status(code).json({message: "Email is taken already"});
                    throw new SubError("Email is taken already", code);
                }
        
                throw new Error("Internal server error");
            }   
    
            const {idToken, refreshToken, localId} = await response.json();
            return {accessToken: idToken, refreshToken, userId: localId}

        } catch (err) {
            throw err;
        }
    }

    async signIn(email: string, password: string) {
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password, returnSecureToken: true})
            });

            if(!response.ok) {
                let error = await response.text();
                const {error: {code, message}}: {error: {code: number; message: string;}} = JSON.parse(error);
                
                if(message === "INVALID_LOGIN_CREDENTIALS") {
                    // return res.status(code).json({message: "Invalid login credentials"});
                    throw new SubError("Invalid login credentials", code);
                }

                throw new Error("Internal server error");
            }

            const {idToken, refreshToken, localId}: {idToken: string; refreshToken: string; localId: string;} = await response.json();
            return {accessToken: idToken, refreshToken, userId: localId}

        } catch(err) {
            throw err;
        }
    }

    async refresh(refreshToken: string) {
        try {
            const requestPayload = new URLSearchParams();
            requestPayload.set("grant_type", "refresh_token");
            requestPayload.set("refresh_token", refreshToken);

            // send refresh token to firebase to get a new access token
            const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_WEB_API_KEY}`, {
                method: "POST",
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: requestPayload
            });

            if(!response.ok) {
                // refresh token validation faield
                const error = new SubError("forbidden", 403);
                throw error;
            }

            // refresh token validation successful
            const {id_token, refresh_token, user_id} = await response.json();
            return {accessToken: id_token, refreshToken: refresh_token, userId: user_id};

        } catch (err) {
            throw err;
        }
    }

    

}