const multer = require('multer')

// SET STORAGE
let maxSize = 2 *1000 *1000
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploaded_files')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
   
  })

  let upload = multer({ storage: storage, limits: { fileSize: maxSize } })

  module.exports = {
      upload
  }