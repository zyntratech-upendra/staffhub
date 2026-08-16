const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'employees',
    allowedFormats: ['jpg', 'png', 'jpeg', 'pdf'],
    resource_type: 'auto',
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
