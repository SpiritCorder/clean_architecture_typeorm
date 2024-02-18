import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "reflect-metadata";

import "./containerInitializer";


import authRouter from "./routes/authRoutes";
import categoryRouter from "./routes/categoryRoutes";
import productRouter from "./routes/productRoutes";
import { error, routeNotFound } from "./middlewares/errorMiddlewares";

dotenv.config();

export const app: Express = express();


// cookie-parser miidleware
app.use(cookieParser());

// JSON body-parser middleware
app.use(express.json());


app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

// route not found middleware
app.use(routeNotFound);

// error handler
app.use(error);

export const PORT = process.env.PORT || 5000;


// myDataSource.initialize()
//     .then(() => {
//         console.log("Data source has been initialized!")
//         // insertProducts(myDataSource);
//     })
//     .catch(err => {
//         console.log(err)
//         console.log("Error during data source initialization")
//     })
    
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))


