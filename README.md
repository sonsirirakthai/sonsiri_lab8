"# sonsiri_lab8" 
```python?code_reference&code_event_index=3
# Define the content for the README.md file
readme_content = """# Supermarket Product Management System 


## คุณสมบัติของระบบ (Features)
- **Dashboard:** แสดงรายการสินค้าทั้งหมดในรูปแบบตาราง พร้อมรูปภาพ
- **Add Product:** เพิ่มข้อมูลสินค้าใหม่ (ชื่อ, หมวดหมู่, ราคา, สต๊อก) พร้อมอัปโหลดรูปภาพ
- **Edit Product:** แก้ไขข้อมูลสินค้าและเปลี่ยนรูปภาพ (มีระบบลบรูปภาพเก่าอัตโนมัติเมื่อมีการเปลี่ยนรูปใหม่)
- **Delete Product:** ลบข้อมูลสินค้าพร้อมยืนยันการลบ (Confirmation Modal)
- **Database:** เชื่อมต่อกับ MySQL ผ่าน XAMPP



##  วิธีการติดตั้งและใช้งาน (Installation)

1. **เตรียมฐานข้อมูล (MySQL):**
   - เปิด **XAMPP** และ Start **Apache** & **MySQL**
   - เข้าไปที่ `http://localhost/phpmyadmin`
   - สร้างฐานข้อมูลชื่อ `supermarket_db`
   - รันคำสั่ง SQL ต่อไปนี้เพื่อสร้างตาราง:
   ```sql
   CREATE TABLE products (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       category VARCHAR(100),
       price DECIMAL(10, 2),
       stock INT,
       image VARCHAR(255),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **รันโปรแกรม:**
   - เปิด Terminal ในโฟลเดอร์โปรเจกต์
   - ใช้คำสั่งเพื่อย้ายเข้าโฟลเดอร์ (ถ้าจำเป็น): `cd supermarket-app`
   - รันเซิร์ฟเวอร์: `node app.js`
   - เปิดเบราว์เซอร์ไปที่: `http://localhost:3000`

##  Dependencies
- `express`: Web framework
- `mysql2`: สำหรับเชื่อมต่อฐานข้อมูล
- `ejs`: Template engine สำหรับหน้าเว็บ
- `multer`: สำหรับจัดการการอัปโหลดไฟล์รูปภาพ
- `body-parser`: สำหรับอ่านข้อมูลจาก Form
"""




