

export interface IExternalAuthService {
    signUp(email: string, password: string): Promise<any>;
    signIn(email: string, password: string): Promise<any>;
    refresh(refreshToken: string): Promise<any>;
}