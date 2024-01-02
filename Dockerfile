# 使用官方Node.js运行时作为父镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 暴露3000端口
EXPOSE 3000

# 运行应用
CMD ["node", "server.js"]
