---
outline: deep
---

# 概述

本文模块会讲述如何配置路由 & 菜单

## 路由鉴权模式

分别有两种鉴权模式

* `web`：前端配置路由表，通过用户角色来过滤路由，自动生成菜单 （适合角色固定的系统）
* `service`：后端通过用户角色返回路由表，前端通过路由表自动生成菜单

> 在`src/store/modules/auth/index.ts`文件中,修改 `routeAuthMode`属性

```ts
type RouteAuthMode = 'web' | 'service'
```

## 路由组件类型

路由组件类型，会根据不同的类型，自动渲染不同的组件

* `single`：单页面 (例如：登录页)
* `basic`：具有公共部分的布局 (公共左侧菜单栏、公共头部、公共底部)
* `directory`：目录
* `submenu`：子菜单 (父路由必须是`basic`或`directory`)
* `menu`：单菜单 (包含公共部分的布局)

```ts
type RouteComponentType = 'single' | 'basic' | 'directory' | 'submenu' | 'menu'
```

[//]: # (## 路由类型)

[//]: # ()
[//]: # (二次定义了路由类型)

[//]: # ()
[//]: # (```ts)

[//]: # (import { RouteRecordRaw } from 'vue-router')

[//]: # ()
[//]: # (type OmitRouteRecordRaw = Omit<RouteRecordRaw, 'component' | 'components' | 'children'>)

[//]: # ()
[//]: # (interface AppRouteRecordRaw extends OmitRouteRecordRaw {)

[//]: # (    // 组件类型)

[//]: # (    component: RouteComponentType)

[//]: # ()
[//]: # (    // 子路由)

[//]: # (    children?: AppRouteRecordRaw[])

[//]: # (})

[//]: # (```)

## 添加路由

## 静态路由（无需权限的菜单）

## 静态路由（无需权限的菜单）
