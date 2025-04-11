import express from "express";
const clotheRouter = express.Router();
import { test, addNewClothe, getAllClothes, getClotheById, findClotheCategory, updateClothe, deleteClothe} from "../controller/clothesController.js";
import { addClotheValidation, testValidation } from "../utils/validation.js";
import upload from"../middleware/multer.js"
clotheRouter.post("/test", testValidation, test);
clotheRouter.post("/add", upload.single('image'), addNewClothe);
clotheRouter.get("/list", getAllClothes);
clotheRouter.get("/get/:id", getClotheById);
clotheRouter.get("/getByCategory/:category", findClotheCategory);
clotheRouter.put("/update/:id", updateClothe);
clotheRouter.delete("/delete/:id", deleteClothe);

export default clotheRouter;