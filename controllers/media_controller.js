const mediaService = require('../services/media_services')
const multer = require("multer");
const fs = require("fs");
const { lookup,getAll,uploadCloudinary,upload} = require("../services/media_services")
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors')

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
    let statusCode=200;
    message='success'
    
    try{
        let uploadResult = await uploadCloudinary(req.file.path);
        const payload={
            url:uploadResult.secure_url,
            publicId:uploadResult.public_id,
            parentId:req.body.parentId,
            type:req.body.type
        }
        const result = await mediaService.uploadImage(payload);
        res.status(statusCode).json(result)
    }catch(error){
        next(error);
    }
    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.log(err.message);
            statusCode=500;
        }  
})}

const updateImage = async(req,res,next)=>{
    try{
        const mediaId=req.params.id
        const oldData = await mediaService.lookup(mediaId);
        mediaService.rollbackUploadCloudinary(oldData.publicId)
        let uploadResult = await uploadCloudinary(req.file.path)
        const newData={
            url:uploadResult.secure_url,
            publicId:uploadResult.public_id,
            parentId:req.body.parentId,
            type:req.body.type
        }
        const result =mediaService.update(mediaId,newData)
        res.status(StatusCodes.OK).json(result)
    }catch(err){
        next(err);
        
    }
    fs.unlink(req.file.path, (err) => {
        if (err) {
            console.log(err.message);
            statusCode=500;
        }  })


}


module.exports = {
    index,
    find,
    create,
    updateImage
}