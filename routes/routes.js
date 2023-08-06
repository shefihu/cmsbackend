const express = require('express')
const router = express.Router()
const { createContact, readContacts, readContact, deleteContact, updateContact, searchContact } = require('../controllers/controller')
const multer = require('multer')
const path = require("path")


const storage = multer.diskStorage({
  destination: (req, file, callback) =>{
    callback(null, "./static/")
  },
  filename: (req, file, callback) =>{
    callback(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits:{fileSize: 10000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb)
  }
})

const checkFileType = (file, cb) =>{

  const filetypes = /jpeg|jpg|png|pdf|svg/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if(mimetype && extname){
    return cb(null, true)
  }else{
    cb('Error: Images Only')
  }
}

router.post('/contact', upload.single('image'), createContact)
router.get("/contact", readContacts)
router.get("/contact/query", searchContact)
router.get("/contact/:id", readContact)
router.delete("/contact/:id", deleteContact)
router.patch("/contact/:id", upload.single('image'), updateContact)
router.get('/', (req,res)=>{
    res.send("Home")
})


module.exports = router