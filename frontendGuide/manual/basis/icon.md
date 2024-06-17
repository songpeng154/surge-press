# 图标

项目中有以下多种图标使用方式。

* 本地图标目录：`/src/assets/svgs`
* iconify图标集地址：[icones](https://icones.js.org/)

## 通过 `unplugin-icons` 插件加载图标

图标无需导入可以直接使用

* iconify图标使用方式：`[前缀]-[图标集]:[图标名称]` => `i-ant-design:crown-twotone`
* 本地SVG使用方式：`[前缀]-[本地图标集Key]:[图标名称]` => `i-local:login`

前缀和本地图标集Key可以在`/build/vite/plugins/plugins/unplugin.ts`中修改。
::: tip 注意
该方式无法动态加载图标，例如：菜单图标、根据图标名称列表动态渲染图标列表。

只能使用 `<svg-icon>` 组件。
:::

### 使用方式

```vue
<template>
  <!-- 加载 iconify 图标 -->
  <i-ant-design:crown-twotone style="font-size: 2em; color: red"/>
  <!-- 加载本地SVG -->
  <i-local:login/>
</template>
```

## 通过`<svg-icon>` 组件加载图标

该组件是基于[@iconify/vue](https://iconify.design/docs/icon-components/vue/)
和[vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons)封装的可以加载`iconify`和`本地svg`中的图标。

::: tip 注意
该组件在项目中只用于菜单图标渲染和图标选择器
:::

### 组件参数

```ts
interface IconProps {
    // 图标选取地址：https://icones.js.org/collection/all
    // 图标名称 例如：图标集:图标名称 => mdi-account
    icon?: string

    // 本地图标
    localIcon?: string

    // 颜色
    color?: string

    // 大小
    size?: string | number

    // 指针
    pointer?: boolean
}
```

### 使用方式

```vue
<template>
  <!-- 加载 iconify 图标 -->
  <svg-icon icon="mdi:account" pointer size="18" color="red"></svg-icon>

  <!-- 加载本地图标（svg），不用写图标具体路径，直接写图标名称就可以渲染图标 -->
  <svg-icon localIcon="login" pointer size="18" color="red"></svg-icon>
</template>
```

### 离线使用

由于[@iconify/vue](https://iconify.design/docs/icon-components/vue/)
插件默认只能在外网环境使用，离线环境使用需要将项目中用到的图标集用`@iconify/vue`中的`addCollection`Api储存起来。

在`/src/assets/iconify/index.ts`中添加图标集，项目中中默认使用的是 `AntDesign 图标集 `

```ts
import AntDesignIconJson from '@iconify/json/json/ant-design.json'
import {addCollection} from '@iconify/vue'

// 将阿里图标集添加到组件的图标存储中（用于菜单图标渲染和图标选择器）
addCollection(AntDesignIconJson)
```

## 图标选择器

