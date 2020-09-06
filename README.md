# moeAsk Web Short Link（awsl）
deno版short link

### [安装deno](https://deno.land/manual/getting_started/installation)

## Install and Run
#### 安装  
```
wget https://cdn.jsdelivr.net/gh/Moe-Ask/short-link-js/main.tsconfig.json

deno install -A -c main.tsconfig.json -n masl-js https://cdn.jsdelivr.net/gh/Moe-Ask/short-link-js/main.ts

masl-js
```

#### 直接运行
```
deno run -A https://cdn.jsdelivr.net/gh/Moe-Ask/short-link-js/main.bundle.js
```

#### 生成 openapi.json
`deno run -A -c main.tsconfig.json https://cdn.jsdelivr.net/gh/Moe-Ask/short-link-js/openapi.ts`

## 环境变量

| 变量 | 默认 | 描述 |
|---|---|---|
| BIND | :1551 | 监听地址 |
| TOKEN | uuid v4| 身份令牌 |
| DB_PATH | ./masl.db | sqlite数据库文件位置 |
| CUSTOM_SYMBOL | # | 自定义短链前缀 |
| URL_MAX | 250 | 长链接长度限制(n/字符 |
| REDIRECT_TO_HOME | 关 | 短链不存在时302到此地址 |
