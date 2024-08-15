import { defineConfig } from 'vitepress'
import { setupContainerDemo } from "./container/demo";
import UnoCSS from 'unocss/vite'

export default defineConfig({
    lang: 'zh-CN',
    title: 'Tudo Admin文档',
    description: '开箱即用、简单高效',
    cleanUrls: true,
    markdown: {
        config(md) {
            setupContainerDemo(md)
        },
        lineNumbers: true
    },
    vite: {
        server: {
            hmr: true,
        },
        plugins: [
            UnoCSS(),
        ],
    },
    themeConfig: {
        logo: '/assets/images/logo.png',
        darkModeSwitchLabel: '主题',
        darkModeSwitchTitle: '切换到深色模式',
        lightModeSwitchTitle: '切换到浅色模式',
        returnToTopLabel: '回到顶部',
        outline: {
            label: '页面导航',
        },
        docFooter: {
            next: '下一页',
            prev: '上一页',
        },
        nav: [
            { text: '介绍', link: '/introduction' },
            {
                text: '前端指南',
                items: [
                    {
                        text: '使用手册',
                        link: '/frontendGuide/manual/start/introduction'
                    },
                    {
                        text: '组件',
                        link: '/frontendGuide/components/introduction'
                    },
                    {
                        text: 'Api',
                        link: '/frontendGuide/api'
                    }
                ]
            },
            {
                text: '后端指南',
                items: [
                    {
                        text: '使用手册',
                        link: '/introduction'
                    },
                    {
                        text: '组件',
                        link: '/frontEndIntroduction'
                    },
                    {
                        text: 'Api',
                        link: '/frontEndIntroduction'
                    }
                ]
            }
        ],

        sidebar: {
            '/frontendGuide/manual': [
                {
                    text: '开始',
                    base: '/frontendGuide/manual/start',
                    items: [
                        { text: '介绍', link: '/introduction' },
                        { text: '快速上手', link: '/getStartedQuickly' }
                    ]
                },
                {
                    text: '基础',
                    base: '/frontendGuide/manual/basis',
                    items: [
                        { text: '服务请求', link: '/serviceRequest' },
                        { text: '路由&菜单', link: '/routeAndMenu' },
                        { text: '权限控制', link: '/auth' },
                        { text: '本地缓存', link: '/localCache' },
                    ]
                },
                {
                    text: '功能',
                    base: '/frontendGuide/manual/function',
                    items: [
                        { text: '图标', link: '/icon' },
                    ]
                }
            ],
            '/frontendGuide/components': [
                {
                    text: '开始',
                    items: [
                        { text: '介绍', link: '/frontendGuide/components/introduction' },
                        { text: '开始使用', link: '/frontendGuide/components/start/startUsing' }
                    ]
                },
                {
                    text: '基础',
                    items: [
                        { text: '图标', link: '/frontendGuide/components/basis/icon' },
                    ]
                }
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
