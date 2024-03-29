const cloudinaryModule = require("cloudinary");
require('dotenv').config();

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

module.exports = cloudinary