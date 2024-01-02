console.log("1234")

process.on('uncaughtException', (err) => {
    console.error('有一个未捕获的错误', err);
    process.exit(1); // 强制退出程序
});

console.log("1")
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const composite = require('./composite'); // 引入上面的composite函数
console.log("2")
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); // 用于托管静态文件，如HTML页面
 

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});



app.post('/generate', upload.single('avatar'), async (req, res) => {
    try {
        console.log("1111");
        const config = {
            name: req.body.name,
            sex: '',
            nation: '汉',
            year: '',
            mon: '',
            day: '',
            org: req.body.org,
            validTerm: req.body.validTerm,
            addr: '四川省成都市武侯区益州大道中段722号复城国际',
            idn: req.body.idn,
            avatar: '' // 使用上传的文件路径
        };
        if(req.file != null && req.file.path != ''){
            console.log("777");
            config.avatar = req.file.path;
        }
        console.log("222333");
        const idNumber = config.idn;
        console.log(idNumber);
        const sexCode = idNumber.substr(16, 1); // 从身份证号码提取性别代码
        console.log(sexCode);
        config.year = idNumber.substr(6, 4); // 提取出生年份
        config.mon = idNumber.substr(10, 2); // 提取出生月份
        config.day = idNumber.substr(12, 2); // 提取出生日期
        config.sex = parseInt(sexCode, 10) % 2 === 0 ? '女' : '男';

        console.log(config.sex);
        if(config.name==null || config.name == ''){
            config.name = config.sex == '男' ? '胡歌' : '赵丽颖';
        }
        console.log(config.name);


        console.log(req.body.avatar);
        

        if(config.avatar==null ||config.avatar ==''){
            config.avatar = config.sex == '男' ? './images/huge.jpeg' : './images/zhao.jpg';
        }
        // config.avatar = './images/avatar.png';

        console.log(config.avatar);
        const imageBuffer = await composite(config);
        fs.writeFileSync(path.resolve(__dirname, 'output.png'), imageBuffer);

        // 删除上传的临时文件
        console.log("删除上传的临时文件")
        // fs.unlinkSync(req.file.path);

        // 返回生成的图片文件
        console.log("返回生成的图片文件")
        res.sendFile(path.resolve(__dirname, 'output.png'));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
