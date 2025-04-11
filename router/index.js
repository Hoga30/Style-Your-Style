
import userRoute from "./userRoute.js";
import clotheRouter from "./clothesRouter.js";
import contactRouter from"./contactRoute.js"

import express from "express";

const route = express.Router();

route.use("/user", userRoute);
route.use('/clothe', clotheRouter);
route.use("/contact",contactRouter);
export default route;