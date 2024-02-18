import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Address } from "./Address";

@Entity()
export class User {

    @PrimaryColumn({type: "varchar", nullable: false})
    private readonly id: string

    @Column({nullable: false, unique: true})
    private readonly email: string

    @Column({nullable: false})
    private readonly firstName: string

    @Column({nullable: false})
    private readonly lastName: string

    @Column({nullable: true})
    private readonly phone?: string

    @CreateDateColumn({type: "datetime", default: () => "CURRENT_TIMESTAMP(6)"})
    private readonly createdAt: Date

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    private readonly updatedAt: Date

    @OneToMany(() => Address, address => address.user, {cascade: true})
    addresses: Address[]

    constructor(id: string, email: string, firstName: string, lastName: string, phone?: string, address?: Address) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone ? phone : undefined;
        if(address) {
            this.addresses = [address]
        }
    }

    public getId() {
        return this.id;
    }
    public geEmail() {
        return this.email;
    }
    public getFirstName() {
        return this.firstName;
    }
    public getLastName() {
        return this.lastName;
    }
    public getPhone() {
        return this.phone ? this.phone : null;
    }
}

