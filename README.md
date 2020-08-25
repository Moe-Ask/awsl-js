# short-link-js
deno版short link

### [安装deno](https://deno.land/manual/getting_started/installation)

## Install
```shell script
// 获取tsconfig
wget https://cdn.jsdelivr.net/gh/Moe-Ask/short-link-js/main.tsconfig.json

// 运行
deno install --allow-net --allow-read --allow-write --allow-env -c main.tsconfig.json -n masl-js https://cdn.jsdelivr.net/gh/Moe-Ask/short-link-js/main.ts
```
## 环境变量

| 变量 | 默认 | 描述 |
|---|---|---|
| BIND | :1551 | 监听地址 |
| TOKEN | uuid v4| 身份令牌 |
| DB_PATH | ./masl.db | sqlite数据库文件位置 |
| CUSTOM_SYMBOL | # | 自定义短链前缀 |
| URL_MAX | 250 | 长链接长度限制(n/字符 |