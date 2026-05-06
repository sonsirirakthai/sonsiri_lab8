const db = require('../models/db');
const fs = require('fs');
const path = require('path');

// [READ] แสดงสินค้าทั้งหมด
exports.getAllProducts = async (req, res) => {
    try {
        let query = "SELECT * FROM products ORDER BY id DESC";
        let queryParams = [];

        // ฟังก์ชันค้นหา (Search)
        if (req.query.search) {
            query = "SELECT * FROM products WHERE name LIKE ? ORDER BY id DESC";
            queryParams = [`%${req.query.search}%`];
        }

        const [rows] = await db.query(query, queryParams);
        res.render('index', { products: rows, successMsg: req.query.success });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};

// [CREATE] แสดงฟอร์มเพิ่มสินค้า
exports.getAddForm = (req, res) => {
    res.render('form', { product: null }); // ส่ง product เป็น null เพื่อให้ View รู้ว่าเป็นโหมด Add
};

// [CREATE] บันทึกข้อมูลสินค้าใหม่
exports.addProduct = async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;
        const image = req.file ? req.file.filename : null;

        const sql = "INSERT INTO products (name, category, price, stock, image) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [name, category, price, stock, image]);
        
        res.redirect('/?success=add');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding product");
    }
};

// [UPDATE] แสดงฟอร์มแก้ไข
exports.getEditForm = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
        if (rows.length > 0) {
            res.render('form', { product: rows[0] });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Database Error");
    }
};

// [UPDATE] บันทึกการแก้ไข
exports.updateProduct = async (req, res) => {
    try {
        const { name, category, price, stock, old_image } = req.body;
        let image = old_image;

        // Logic: หากมีการอัปโหลดรูปภาพใหม่ ต้องลบรูปเก่าออกจากเซิร์ฟเวอร์
        if (req.file) {
            image = req.file.filename;
            if (old_image) {
                const oldImagePath = path.join(__dirname, '../public/uploads/', old_image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath); // ลบไฟล์เก่าด้วย fs.unlink
                }
            }
        }

        const sql = "UPDATE products SET name=?, category=?, price=?, stock=?, image=? WHERE id=?";
        await db.query(sql, [name, category, price, stock, image, req.params.id]);
        
        res.redirect('/?success=update');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating product");
    }
};

// [DELETE] ลบสินค้า
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        
        // ดึงชื่อไฟล์รูปภาพมาเพื่อลบออก
        const [rows] = await db.query("SELECT image FROM products WHERE id = ?", [productId]);
        
        if (rows.length > 0 && rows[0].image) {
            const imagePath = path.join(__dirname, '../public/uploads/', rows[0].image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // ลบไฟล์เมื่อลบข้อมูล
            }
        }

        await db.query("DELETE FROM products WHERE id = ?", [productId]);
        res.redirect('/?success=delete');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting product");
    }
};