<template>
  <div class="standard">
    <Header></Header>
    <router-view v-slot="{ Component }">
      <Suspense>
        <template #default>
          <component :is="Component" />
        </template>
        <template #fallback>
          <p style="padding: 1rem">Загрузка данных, пожалуйста, подождите...</p>
        </template>
      </Suspense>
    </router-view>
  </div>
</template>

<script setup>
import Header from "../components/Header/Header.vue";

</script>

<style>
.standard {
  max-width: 100%;
  flex-shrink: 1;
  flex-grow: 1;
  overflow: hidden;
}
</style>
