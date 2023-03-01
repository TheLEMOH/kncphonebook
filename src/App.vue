<template><component :is="components[layout]"></component></template>

<script setup>
import { computed } from 'vue'
import Standard from './layouts/Standard.vue';
import Center from './layouts/Center.vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()

const components = {
  Standard,
  Center
}

const layout = computed(() => route.meta.layout)

store.dispatch('Refresh')
</script>

<style >
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol !important;
  /*  background: #eff3f8; */
}

p {
  margin: 0;
}

#app {
  display: flex;
  flex-basis: auto;
  justify-content: center;
}
</style>
