const mediaService = require('../services/media_services')
const multer = require("multer");
const fs = require("fs");
const { lookup,getAll,uploadCloudinary,upload} = require("../services/media_services")
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors')
const createMediaDTO = require('../validators/media_validator')
const Joi = require('joi'); 
const ImageRolesEnum = require('../config/enum/media_type_enum');


const index = async (req, res, next) => {
    try {
        const params = req.qs
        const data = await mediaService.getAll(params)

        return res.status(200).json({
            status: 200,    
            message: 'Request Success',
            data: data
        })
    } catch (error) {
        if (error.message) {
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await mediaService.lookup(req.params.id);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        if (error.message) {
            next({status: 400, message: error.message, data: {}})
        }
        next(error)
    }
};

const create = async(req,res,next)=>{
    try{
        if(!req.file) throw new BadRequestError("Image does not exist")
        const  MediaDTO=await createMediaDTO.validateAsync(req.body)
        let uploadResult = await uploadCloudinary(req.file.path);
        const payload={
            url:uploadResult.secure_url,
            publicId:uploadResult.public_id,
            parentId:req.user.id,
            role:MediaDTO.role
        }
        const result = await mediaService.uploadImage(payload);
        fs.unlink(req.file.path, (err) => {
            if (err) {
                throw new Error("file does not exist");
            }  })
        res.status(StatusCodes.OK).json(result)

    }catch(error){
        next(error);
    }


}

const updateImage = async(req,res,next)=>{
    try{
        if(!req.file) throw new BadRequestError("Image does not exist")
        const mediaId=req.params.id
        const oldData = await mediaService.lookup(mediaId);
        mediaService.rollbackUploadCloudinary(oldData.publicId)
        let uploadResult = await uploadCloudinary(req.file.path)
        console.log(uploadResult)
        const newData={
            url:uploadResult.secure_url,
            publicId:uploadResult.public_id,
            parentId:oldData.parentId,
            role:oldData.role
        }
        const result =await mediaService.update(mediaId,newData)
        fs.unlink(req.file.path, (err) => {
            if (err) {
                next(err);
            }  })
        res.status(StatusCodes.OK).json(result)
    }catch(err){
        next(err);
    }

}
const destroy = async(req, res, next) => {
    try {
        const mediaId = req.params.id
        const oldData = await mediaService.lookup(mediaId);
        if(!oldData) throw new NotFoundError("Data does not exist")
        mediaService.rollbackUploadCloudinary(oldData.publicId)
        const result = await mediaService.destroy(mediaId)
        if(!result) throw new NotFoundError("image Has Deleted")
        res.status(StatusCodes.OK).json({
            message: "Success",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    find,
    create,
    updateImage,
    destroy
}