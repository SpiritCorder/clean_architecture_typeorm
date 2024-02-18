import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column("text")
    description: string;
    @Column("text")
    image: string;
    @Column("decimal", {precision: 10, scale: 2})
    price: number;
    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    createdAt: Date;
    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    updatedAt: Date;

    @ManyToOne(() => Category, category => category.products)
    category: Category;
}

/*
model Category {
  id Int @id @default(autoincrement())
  name String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  products Product[]
}

model Product {
  id Int @id @default(autoincrement())
  name String
  description String @db.Text
  price Decimal @db.Decimal(10,2)
  image String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  categoryId Int
  category Category @relation(fields: [categoryId], references: [id])
  orders OrderItem[]
}


*/