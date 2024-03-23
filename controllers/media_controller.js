const mediaService = require('../services/media_services')
const fs = require("fs");
const {uploadCloudinary,upload} = require("../services/media_services")
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors')
const productService = require('../services/productServices')


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

const createUser = async(req,res,next)=>{
    try{
        if(!req.file) throw new BadRequestError("Image does not exist")
        let uploadResult = await uploadCloudinary(req.file.path);
        const payload={
            url:uploadResult.secure_url,
            publicId:uploadResult.public_id,
            parentId:req.user.id,
            role:"profile"
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

const createProduct = async(req,res,next)=>{
    try{
        const prod=await productService.findById(req.params.id)
        if(!prod)throw new NotFoundError("product not found")
        if(!req.file) throw new BadRequestError("Image does not exist")
        let uploadResult = await uploadCloudinary(req.file.path);
        const payload={
            url:uploadResult.secure_url,
            publicId:uploadResult.public_id,
            parentId:req.params.id,
            role:"product"
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
    createUser,
    createProduct,
    updateImage,
    destroy
}