---
outline: deep
---

# 服务请求

本模块会介绍如何使用服务调用

[//]: # (项目内二次封装了[axios]&#40;https://github.com/axios/axios&#41;,统一了接口`响应类型`)

## 多服务配置

多服务指的是项目内接入多个后台服务，每个后台服务地址不一样，响应结构也有可能不一样

### 类型定义

```ts
// 代理类型
type ProxyType = [ string, string ];

// 多服务配置
interface ServiceConfig {
    // 数据模拟
    fake: string | ProxyType

    // 主服务
    main: string | ProxyType

    // 其他服务
    other: string | ProxyType
}
```

> 代码位置：`types/service/service.d.ts`
::: warning 注意
`代理`功能仅在开发环境有效
:::

### 服务地址&代理配置
 配置多个服务,需要代理就写 `"[前缀,Url]"` 不需要就写 `"api地址"` 

```.env.development
VITE_SERVICE_CONFIG = `{
  "fake": "/fake",

  "main": ["/dev", "http://localhost:3000"],

  "other": "http://localhost:3000"
}`
```
> 代码位置：`.env.development`



