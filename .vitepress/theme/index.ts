import type {Theme} from 'vitepress'
import Antd from 'ant-design-vue';
import Demo from "../components/Demo.vue";
import Layout from "./Layout.vue";
import DefaultTheme from 'vitepress/theme'
import 'virtual:uno.css'

export default {
    extends: DefaultTheme,
    Layout: Layout,
    enhanceApp({app, router, siteData}) {
        app.use(Antd)
        app.component('Demo', Demo)
    },
} satisfies Theme
