# idcard-generator-UI

> 使用 nodejs 生成身份证

- 在线交互
- 本地、服务器部署
- 简化输入

> 仅做研究使用，请遵守当地法律法规，法律后果自负
> 在线抠图地址:(https://burner.bonanza.com/)



## 使用
### 直接启动（推荐node18+）
```javascript
npm install express multer sharp text-to-svg
node server.js
```
### Docker部署
```shell 
docker build -t my-nodejs-app .
docker run -d -p 3000:3000 my-nodejs-app
```

### 使用
![image](https://github.com/taofmvp/simple-IdCardGenerater/assets/155419421/916cde11-b92d-4064-bd64-7b9950fa0df9)


## 其他

参考项目：[https://github.com/Ice-Hazymoon/idcard_generator](https://github.com/Ice-Hazymoon/idcard_generator)

根据在 [https://github.com/airob0t/idcardgenerator](https://github.com/airob0t/idcardgenerator) 下载的PSD文件，以自己的身份证作为标准，做了一些大的调整，修改了一些字体和布局
