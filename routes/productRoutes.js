const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

// ตั้งค่า Multer สำหรับอัปโหลดรูปภาพ
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ใหม่ด้วย Timestamp
    }
});
const upload = multer({ storage: storage });

// กำหนด Routes (CRUD)
router.get('/', productController.getAllProducts);
router.get('/add', productController.getAddForm);
router.post('/add', upload.single('image'), productController.addProduct);
router.get('/edit/:id', productController.getEditForm);
router.post('/edit/:id', upload.single('image'), productController.updateProduct);
router.post('/delete/:id', productController.deleteProduct);

module.exports = router;