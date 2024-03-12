const multer = require("multer")
const {Media} = require("../models")
const fs = require("fs");
const cloudinary = require("cloudinary").v2;          
cloudinary.config({ 
  cloud_name: 'dwpcqzzsx', 
  api_key: '752986723761533', 
  api_secret: '3ssnvJ5uGTVKPQBLS_oAL35-ww8' 
});


const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"./")
    },
    filename: function (req,file,cb){
        cb(null,file.originalname)
    }
})


const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.match(/^image/)) {
            return cb(null, true);
        } else {
            return cb(new Error("Only .png format allowed!"), false);
        }
    },
});


const uploadCloudinary = async(filepath)=>{
    try{
        let result = await cloudinary.uploader.upload(filepath,{
            use_filename:true,
        });
        return result;
    }catch(error){
        throw error;
    }
}


const lookup = async (payload) => {
    const id = payload
    const media = await Media.findOne({ where: { id: id } })
    return media 
}


const getAll = async (qParams) => {
    const media = await Media.findAndCountAll()
    return media
}

const uploadImage = async(payload)=>{
    const {...media} = payload
    const newImage = await Media.create({
        ...media
    })
    return newImage
}

const rollbackUploadCloudinary = async(arrOfPublicId)=>{
    try {
        await cloudinary.api.delete_resources(arrOfPublicId);
    } catch (error) {
        throw(error);
}
}
const update = async (MediaId, payload) => {
    const result = await Media.update(payload, {
        where: {
            id: MediaId,
        },
        individualHooks: true
    })
    return result
};

const destroy = async (mediaId) => {
    const result = await Media.destroy({
        where: {
            id: mediaId,
        },
        individualHooks: true
    })
    return result
};
module.exports = {
    lookup,
    getAll,
    uploadCloudinary,
    uploadImage,
    rollbackUploadCloudinary,
    upload,
    update,
    destroy
}