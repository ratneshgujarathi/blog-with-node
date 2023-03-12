import express from "express";
import cors from "cors";
import conf from "./src/config/config.js?";
import { userRouter } from "./src/applications/auth/routes/userRouter.js";
import { blogRouter } from "./src/applications/blog/routes/blogRouter.js";
import {errorHandler} from './src/middlewares/errorHandler.js';

const app = express();

// app.use(cors);
app.use(express.json());

// error handler
app.use(errorHandler);

app.use("/api/auth", userRouter);
app.use("/api/blogs", blogRouter);

// db inititialize

app.listen(conf.SERVER_PORT, ()=>{
    console.log(`server is running on ${conf.SERVER_PORT} port`);
});

