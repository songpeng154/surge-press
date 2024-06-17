import {defineConfig} from 'vitepress'
import {setupContainerDemo} from "./container/demo";
import UnoCSS from 'unocss/vite'

export default defineConfig({
    lang: 'zh-CN',
    title: 'SIMPLE 文档',
    description: '开箱即用',
    cleanUrls: true,
    markdown: {
        config(md) {
            setupContainerDemo(md)
        },
        lineNumbers: true
    },
    vite: {
        server:{
            hmr: true,
        },
        plugins: [
            UnoCSS(),
        ],
    },
    themeConfig: {
        nav: [
            {text: '介绍', link: '/introduction'},
            {
                text: '前端指南',
                items: [
                    {
                        text: '使用手册',
                        link: '/frontendGuide/manual/introduction'
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
                    items: [
                        {text: '介绍', link: '/frontendGuide/manual/introduction'},
                        {text: '开始使用', link: '/frontendGuide/manual/start/startUsing'}
                    ]
                },
                {
                    text: '基础',
                    items: [
                        {text: '图标', link: '/frontendGuide/manual/basis/icon'},
                    ]
                }
            ],
            '/frontendGuide/components': [
                {
                    text: '开始',
                    items: [
                        {text: '介绍', link: '/frontendGuide/components/introduction'},
                        {text: '开始使用', link: '/frontendGuide/components/start/startUsing'}
                    ]
                },
                {
                    text: '基础',
                    items: [
                        {text: '图标', link: '/frontendGuide/components/basis/icon'},
                    ]
                }
            ]
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ]
    }
})
