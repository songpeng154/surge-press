---
outline: deep
---

# 概述

本文模块会讲述如何配置路由&菜单

> 静态路由目录：
> * `src/router/routes` 
> *  无需权限，如：登录页、注册页、404页...

> 动态路由目录：
> * `src/router/modules`
> * 带有权限，根据用户角色动态渲染

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

## 路由类型

二次定义了路由类型，简化的路由配置

```ts

import { RouteRecordRaw } from 'vue-router'

type OmitRouteRecordRaw = Omit<RouteRecordRaw, 'component' | 'components' | 'children'>

interface AppRouteRecordRaw extends OmitRouteRecordRaw {

    // 组件类型
    component: RouteComponentType


    // 子路由
    children?: AppRouteRecordRaw[]

}

```

## 路由定义


::: info 常规路由写法
常规路由写法：该写法中需要导入页面组件，如果需要路由缓存，还需要设置路由`name`,并且要与页面组件的`name`对应上，操作比较繁琐。
```ts
const routes = [
    {
        path: '/system',
        name: 'System',
        component: () => import('Layout.vue'),
        children: [
            {
                path: '/system/user',
                name: 'SystemUser',
                component: () => import('SystemUser.vue'),
            },
            {
                path: '/system/auth',
                name: 'SystemAuth',
                component: () => import('SystemAuth.vue'),
            }
        ]
    },
    {
        path: '/about',
        name: 'AboutView',
        component: () => import('AboutView.vue')
    }
]
```
:::
::: tip 本项目中的路由写法
定义路由时无需定义`name`与导入页面组件，项目在内部会根据路由`path`自动找对应的页面组件，并且会自动设置页面组件`name`和路由`name`,路由需要缓存时无需手动给组件设置`name`
```ts
export const routes: AppRouteRecordRaw = [
    {
        path: '/system',
        component: 'basic',
        children:[
            {
                path: '/user',
                component: 'submenu',
            },
            {
                path: '/user',
                component: 'submenu',
            }
        ]
    },
    {
        path: '/about',
        component: 'single'
    }
]
```
访问: `/system/user` | `/system/auth` | `/about`
:::
### 定义单页面路由(例如：登录页、注册页...)


```ts
// 登录页
export const ROUTE_REGISTER: AppRouteRecordRaw = {
    path: '/register',
    component: 'single',
    meta: { title: '注册' }
}
```

## 静态路由（无需权限的菜单）

## 静态路由（无需权限的菜单）
