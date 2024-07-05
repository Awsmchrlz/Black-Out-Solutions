const mongoose = require('mongoose')
const path = require('path')
const UploadPath = 'uploads';

const uploadSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productCompanyName: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productImage: [String],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

})

uploadSchema.virtual('uploadsPath').get(function(){
    return path.join('/',UploadPath)
})

module.exports = mongoose.model('Blackout_products',uploadSchema)
module.exports.UploadPath = UploadPath