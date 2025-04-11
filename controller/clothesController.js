import clothesModel from "../model/clothesModel.js";
import { NotFoundError, BadRequestError } from "../error/index.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";
import cloudinary from "../utils/cloudinary.js";

export const test = (req, res, next) => {
    res.send('Hello stylist!');
}

export const addNewClothe = asyncWrapper(async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        // Check if Cloudinary upload was successful
        if (!result || !result.url) {
            throw new Error('Failed to upload image to Cloudinary');
        }

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        }

        // Create new service
        const newClothe = await clothesModel.create({
            ClothesName: req.body.serviceName,
            category: req.body.category,
            description: req.body.description,
            image: {
                url: result.url
            },
           });
           res.status(201).json(newService);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

    export const getAllClothes =  async (req, res, next) => {
        try{
            const getClothes = await clothesModel.find();
            if(getClothes){
                return res.status(200).json({
                    size: getClothes.length,
                    getClothes
                })
            }
            
        }catch (error){
            next(error);  
        }
    }

    export const getClotheById = async (req, res, next) => {
        try{
            const foundedClothe = await clothesModel.findById(req.params.id)
            if (!foundedClothe) {
                return next(new NotFoundError(`Clothe not found`))
            }
            
              return  res.status(200).json(foundedClothe)
            }
        catch (error) {
            next(error);
            
          }
    }

    export const findClotheCategory = async (req, res, next) => {
        const clotheCategory = req.params.category;
        
        try {
            const foundedClothe = await clothesModel.find({category: clotheCategory});
            return res.status(200).json({
                size: foundedClothe.length,
                foundedClothe
            });
        } catch (error) {
            next(error);
        }
    }
      export const updateClothe = async(req, res, next) => {
        try {
            const updatedClothe = await clothesModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
               if(!updatedClothe) {
                return next(new NotFoundError(`Clothe not found`));
               }
               return  res.status(200).json(updatedClothe)
            }
        catch (error) {
            next(error);
        }
    }
  
    export const deleteClothe = async(req, res, next) => {
        const id =req.params.id;
           
        try {
            const deletedClothe = await clothesModel.findByIdAndDelete(id);
              return  res.status(200).json({ message : 'Clothe is deleted'})
            }
            
         catch (error) {
            next(error)
        }
    }
