console.log("1234")

process.on('uncaughtException', (err) => {
    console.error('有一个未捕获的错误', err);
    process.exit(1); // 强制退出程序
});

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const composite = require('./composite'); // 引入上面的composite函数

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); // 用于托管静态文件，如HTML页面
 



app.post('/generate', upload.single('avatar'), async (req, res) => {
    try {
        const config = {
            name: req.body.name,
            sex: req.body.sex,
            nation: req.body.nation,
            year: req.body.year,
            mon: req.body.mon,
            day: req.body.day,
            org: req.body.org,
            validTerm: req.body.validTerm,
            addr: req.body.addr,
            idn: req.body.idn,
            avatar: req.file.path // 使用上传的文件路径
        };

        const imageBuffer = await composite(config);
        fs.writeFileSync(path.resolve(__dirname, 'output.png'), imageBuffer);

        // 删除上传的临时文件
        fs.unlinkSync(req.file.path);

        // 返回生成的图片文件
        res.sendFile(path.resolve(__dirname, 'output.png'));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
