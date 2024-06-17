<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import {theme} from 'ant-design-vue'
import './style.css'
import {computed} from "vue";
import {useData} from "vitepress";

const {Layout} = DefaultTheme
const vitePressData = useData();

const antdTheme = computed(() => {
  return {
    algorithm: vitePressData.isDark.value ? theme.darkAlgorithm : undefined
  };
});
</script>

<template>
  <a-config-provider :theme="antdTheme">
    <Layout>

    </Layout>
  </a-config-provider>
</template>

<style scoped>

</style>