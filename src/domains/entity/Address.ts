import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    private readonly id: number

    @Column({nullable: false})
    private readonly streetNo: string

    @Column({nullable: false})
    private readonly street1: string

    @Column({nullable: true})
    private readonly street2?: string

    @Column({nullable: false})
    private readonly zip: string

    @ManyToOne(() => User, user => user.addresses)
    user: User

    constructor(streetNo: string, street1: string, zip: string, street2?: string, userId?: string) {
        this.streetNo = streetNo;
        this.street1 = street1;
        this.zip = zip;
        this.street2 = street2;
    }
}