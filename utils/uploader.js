const multer = require('multer')
const path = require('path')

function checkFileType (file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toString())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('只能上传图片')
  }
}

// 上传头像+各类验证
const upload = multer({
  storage: multer.diskStorage({
    destination (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/test'))
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname +
          '-' +
          Date.now() +
          '.' +
          file.originalname.split('.')[1]
      )
    }
  }),
  fileFilter (req, file, cb) {
    checkFileType(file, cb)
  },
  limits: {
    fileSize: 512000
  }
})

module.exports = upload
