import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../domains/IUserRepository";
import { Address } from "../domains/entity/Address";
import { User } from "../domains/entity/User";
import { IExternalAuthService } from "../domains/serviceInterfaces/IExternalAuthService";

@injectable()
export class AuthService {
    constructor(
        @inject("IUserRepository") private readonly userRepository: IUserRepository,
        @inject("IExternalAuthService") private readonly externalAuthService: IExternalAuthService
    ) {}

    async signUp(data: any) {
        try {
            const {email, password, firstName, lastName, phone, streetNo, street1, street2, zip} = data;

            // use firebase auth service
            const {accessToken, refreshToken, userId} = await this.externalAuthService.signUp(email, password);

            // create a new user, if there is an address then create the new address as well
            let address: Address | undefined = undefined;

            if((streetNo && street1 && zip)) {
                address = new Address(streetNo, street1, zip, street2);
            }

            const user = new User(userId, email, firstName, lastName, phone, address);
            
            const newUser = await this.userRepository.create(user);
            return {accessToken, refreshToken, user: newUser};
        
        } catch(err) {
            throw err;
        }
    }

    async signIn(email: string, password: string) {
        try {
            const {accessToken, refreshToken, userId} = await this.externalAuthService.signIn(email, password);

            const user = await this.userRepository.findUnique(userId);

            return {accessToken, refreshToken, user};

        } catch (err) {
            throw err;
        }
    }

    async refresh(token: string) {
        try {
            const {accessToken, refreshToken, userId} = await this.externalAuthService.refresh(token);
            // get the user data by the id
            const user = await this.userRepository.findUnique(userId);
            return {accessToken, refreshToken, user};
        } catch (err) {
            throw err;
        }
    }
}