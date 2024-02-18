
import { DataSource } from "typeorm"
import {singleton} from "tsyringe";
import path from "path";
import { PORT, app } from "../presentation";

@singleton()
export class DbInitializeSingleton extends DataSource {

    // orm: DataSource;
    
    constructor() {
        super({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "clean_architecture_typeorm",
            entities: [path.join(process.cwd(), "/src/domains/entity/*.ts")],
            logging: true,
            synchronize: true,
        })
        this.connectToDb();
    }

    private async connectToDb(): Promise<any> {
        try {
            await super.initialize();
            console.log('Connected to the DB');
            // app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))
        } catch (err) {
            console.log("ERROR : CONNECTION FAILED TO THE DB");
            process.exit(1);
        }
    }

}


// export class DbInitializeSingleton extends DataSource {

//     private static instance: DbInitializeSingleton;

//     private constructor() {
//         // ensure no initialization happens from outside
//         super({
//             type: "mysql",
//             host: "localhost",
//             port: 3307,
//             username: "root",
//             password: "root",
//             database: "clean_architecture_typeorm",
//             entities: ["src/domains/entity/*.ts"],
//             logging: true,
//             synchronize: true,
//         });
        
//     }

//     public static getInstance(): DbInitializeSingleton {
//         if(!DbInitializeSingleton.instance) {
//             DbInitializeSingleton.instance = new DbInitializeSingleton()
//         }
//         return DbInitializeSingleton.instance;
//     }

// }




// export const myDataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3307,
//     username: "root",
//     password: "root",
//     database: "clean_architecture_typeorm",
//     entities: ["src/domains/entity/*.ts"],
//     logging: true,
//     synchronize: true,
// })