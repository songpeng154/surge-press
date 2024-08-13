---
outline: deep
---

# 概述

本文模块会讲述如何配置路由&菜单

> 静态路由目录：
> * `src/router/routes`
> * 无需权限，如：登录页、注册页、404页...

> 动态路由目录：
> * `src/router/modules`
> * 带有权限，根据用户角色动态渲染

## 路由组件类型

路由组件类型，会根据不同的类型，自动渲染不同的组件

* `basic`：具有公共部分的布局 (公共左侧菜单栏、公共头部、公共底部)
* `basic-view`：具有公共部分的布局的页面
* `view`：页面

```ts
type RouteComponentType = 'basic' | 'basic-view' | 'view'
```

> 文件路径：`#/route.d.ts`

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

> 文件路径：`#/route.d.ts`

## 路由定义

::: info 常规路由写法
该写法中需要导入页面组件，如果需要路由缓存，还需要设置路由`name`,并且要与页面组件的`name`对应上，操作比较繁琐。

```ts
const routes = [
    {
        path: '/system',
        name: 'System',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/system/user',
                name: 'SystemUser',
                component: () => import('@/views/system/systemUser/index.vue')
            },
            {
                path: '/system/auth',
                name: 'SystemAuth',
                component: () => import('@/views/system/systemAuth/index.vue')
            }
        ]
    },
    {
        path: '/about',
        name: 'AboutView',
        component: () => import('@/views/about/index.vue')
    }
]
```

:::
::: tip 本项目中的路由写法
定义路由时无需定义`name`与导入页面组件，项目在内部会根据路由`path`自动找对应的页面组件，并且会自动设置页面组件`name`和路由
`name`,路由需要缓存时无需手动给组件设置`name`

```ts
export const routes: AppRouteRecordRaw = [
    {
        path: '/system',
        component: 'basic',
        children: [
            {
                path: '/user',
                component: 'view',
            },
            {
                path: '/user',
                component: 'view',
            }
        ]
    },
    {
        path: '/about',
        component: 'view'
    }
]
```

:::
::: tip 对应的页面组件

```text
views                        
 ├── system                    
 │  ├── systemUser
 │  │   └── index.vue         
 │  ├── systemAuth
 │  │   └── index.vue      
 ├── about
     └── index.vue
```

访问: `/system/user` | `/system/auth` | `/about`
:::

### 定义单页面路由

不具有公共部分的布局 (公共左侧菜单栏、公共头部、公共底部)，就是一个单页面，例如：登录页、注册页、404页面...

```ts {4}
// 注册页面
export const ROUTE_REGISTER: AppRouteRecordRaw = {
    path: '/register',
    component: 'view',
    meta: { title: '注册' }
}
```

> 对应的页面组件：`@/views/register/index.vue`

### 定义一级菜单

```ts {3}
export default {
    path: '/about',
    component: 'basic-view',
    meta: { title: '关于' }
} satisfies AppRouteRecordRaw
```

> 对应的页面组件：`@/views/about/index.vue`

### 定义二级菜单

```ts {10,15}
export default {
    path: '/system',
    meta: {
        title: '系统管理',
        icon: 'ant-design:copyright-circle-filled'
    },
    children: [
        {
            path: '/user',
            component: 'view',
            meta: { title: '用户管理' }
        },
        {
            path: '/auth',
            component: 'view',
            meta: { title: '权限管理' }
        }
    ]
} satisfies AppRouteRecordRaw
```

> 对应的页面组件：
> * `@/views/system/user/index.vue`
> * `@/views/system/auth/index.vue`

### 定义多级菜单

```ts {14,23}
export default {
    path: '/menu',
    meta: {
        title: '多级菜单',
        icon: 'ant-design:copyright-circle-filled'
    },
    children: [
        {
            path: '/menu-1',
            meta: { title: '菜单-1' },
            children: [
                {
                    path: '/menu-1-1',
                    component: 'view',
                    meta: { title: '菜单-1-1' },
                },
                {
                    path: '/menu-1-2',
                    meta: { title: '菜单-1-2' },
                    children: [
                        {
                            path: '/menu-1-2-1',
                            component: 'view',
                            meta: { title: '菜单-1-2-1' }
                        }
                    ],
                }
            ]
        },
        {
            path: '/menu-2',
            meta: { title: '菜单-2' },
            children: [
                {
                    path: '/menu-2-1',
                    component: 'view',
                    meta: { title: '菜单-2-1' }
                }
            ]
        }
    ]
} satisfies AppRouteRecordRaw
```

> 对应的页面组件：
> * `@/views/menu/menu-1/menu-1-1/index.vue`
> * `@/views/menu/menu-1/menu-1-2/menu-1-2-1/index.vue`
> * `@/views/menu/menu-2/menu-2-1/index.vue`

### 定义外链

给`path`定义`url`即可，当用户点击`Vue官方`菜单的时候,会打开Vue官方网站

```ts {2}
export default {
    path: 'https://cn.vuejs.org/',
    component: 'basic-view',
    meta: { title: 'Vue官方' }
} satisfies AppRouteRecordRaw
```

### 定义内嵌`iframe`路由

::: info 使用默认`iframe`容器组件
给`iframeSrc`定义`url`即可，项目内默认使用`DefaultIframe`组件作为`iframe`容器，当用户点击`Vue官方`
菜单的时候,会内嵌打开Vue官方网站

```ts {6}
export default {
    path: '/vue',
    component: 'basic-view',
    meta: {
        title: 'Vue官方',
        iframeSrc: 'https://cn.vuejs.org/'
    }
} satisfies AppRouteRecordRaw
```

> 默认`Iframe`组件路径：`@/layouts/components/DefaultIframe.vue`
:::

::: info 自定义`iframe`容器组件
给`iframeSrc`定义`url`的同时再将`isCustomizeIframeComponent`设置为`true`即可，当用户点击`Vue官方`菜单的时候,会内嵌打开Vue官方网站

```ts {6,7}
export default {
    path: '/vue',
    component: 'basic-view',
    meta: {
        title: 'Vue官方',
        iframeSrc: 'https://cn.vuejs.org/',
        isCustomizeIframeComponent: true
    }
} satisfies AppRouteRecordRaw
```

> 自定义`Iframe`组件路径：`@/views/vue/index.vue`

```vue

<script setup lang="ts">
  const route = useRoute()
</script>

<template>
  <div>
    <h1>自定义Iframe组件</h1>
    <iframe :src="route.meta.iframeSrc" class="w-[500px] h-[500px]"/>
  </div>
</template>
```

:::

### 完整示例

::: details 第一步：定义路由

#### 首页

> 路由文件地址：`@/router/modules/home.ts`
>
> 页面组件：`@/views/home/index.vue`
>
> 浏览器访问地址：`http://localhost:8080/#/home`

```ts {3}
export default {
    path: '/home',
    component: 'basic-view',
    meta: {
        title: '首页',
        keepAlive: true
    }
} satisfies AppRouteRecordRaw
```

#### 系统管理

> 路由文件地址：`@/router/modules/system.ts`
>
> 页面组件：
> * `@/views/system/user/index.vue`
> * `@/views/system/auth/index.vue`
>
> 浏览器访问地址：
> * `http://localhost:8080/#/system/user`
> * `http://localhost:8080/#/system/auth`

```ts {3}
export default {
    path: '/system',
    component: 'basic',
    meta: { title: '关于' },
    children: [
        {
            path: '/user',
            component: 'view',
            meta: { title: '用户管理' }
        },
        {
            path: '/userDetails',
            component: 'view',
            meta: {
                title: '用户详情',
                permissions: [ 'system_user_details' ],
                // 隐藏菜单
                hideMenu: true
            }
        },
        {
            path: '/userAddOrEdit',
            component: 'view',
            meta: {
                title: '添加用户',
                // 隐藏菜单
                hideMenu: true
            }
        },
        {
            path: '/auth',
            component: 'view',
            meta: { title: '权限管理' }
        }
    ]
} satisfies AppRouteRecordRaw
```
#### 数据大屏

> 系统管理路由文件地址：`@/router/modules/system.ts`
>
> 浏览器访问地址：
> * `http://localhost:8080/#/system/user/index.vue`
> * `http://localhost:8080/#/system/auth/index.vue`

```ts
export default {
    path: '/system',
    component: 'basic',
    meta: { title: '关于' },
    children: [
        {
            path: '/user',
            component: 'view',
            meta: { title: '用户管理' }
        },
        {
            path: '/auth',
            component: 'view',
            meta: { title: '权限管理' }
        }
    ]
} satisfies AppRouteRecordRaw
```

:::

::: details 第二步：创建对应的页面组件
:::
## 路由缓存

给路由设置`keepAlive`为`true`即可，无需给路由与页面组件设置name，项目内部已自动处理

```ts {6}
export default {
    path: '/about',
    component: 'basic-view',
    meta: {
        title: '关于',
        keepAlive: true
    }
} satisfies AppRouteRecordRaw
```

## 路由元数据

```ts
interface RouteMeta {
    // 标题
    title: string

    // 细粒度权限
    permissions?: string[]

    // 角色
    roles?: RoleEnum[]

    // 忽略鉴权，用户可以直接访问
    ignoreAuth?: boolean

    // 是否缓存 (对iframeSrc无效)
    keepAlive?: boolean

    // 是否固定在tab上
    affixTab?: boolean

    // 图标
    icon?: string

    // 内部嵌套地址
    iframeSrc?: string

    // 是否自定义内嵌组件
    isCustomizeIframeComponent?: boolean

    // 菜单排序
    order?: number

    // 隐藏菜单 (可以通过路由访问)
    hideMenu?: boolean

    // 禁用菜单 (不能通过路由访问)
    disabledMenu?: boolean
}
```

> 文件路径：`#/router.d.ts`