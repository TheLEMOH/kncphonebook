<template>
  <div class="search-menu" v-if="structure">
    <div class="search-menu-header">
      <slot name="search-menu-header"></slot>
    </div>

    <div class="search-menu-body">
      <slot name="search-menu-body"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  structure: {
    type: Boolean,
    default: true,
  },
});
</script>
