<template>
  <el-menu :default-active="activeIndex" :ellipsis="true" mode="horizontal" @select="Select">
    <template v-if="client">
      <el-menu-item index="organizationAll">Организации</el-menu-item>
      <el-menu-item index="divisionAll">Структурные подразделения</el-menu-item>
      <el-menu-item index="subdivisionAll">Подразделения</el-menu-item>
      <el-menu-item index="positionAll">Должности</el-menu-item>
    </template>
    <el-menu-item index="individualAll">Физические лица</el-menu-item>
    <el-menu-item index="employeeAll">Сотрудники</el-menu-item>
    <template v-if="client">
      <el-menu-item index="userAll">Пользователи</el-menu-item>
  <!--     <el-menu-item index="PDF">PDF</el-menu-item>
      <el-menu-item index="CSV">CSV</el-menu-item> -->
    </template>
    <div class="flex-grow" />
    <template v-if="!client">
      <el-menu-item index="login">Войти</el-menu-item>
    </template>
    <template v-else>
      <el-menu-item index="exit" @click="Exit">({{ client.name }}) Выйти</el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const route = useRoute();
const store = useStore();

const client = computed(() => store.getters.client);

const activeIndex = computed(() => route.name);

const Select = (event) => {
  if (event != "exit") router.push({ name: event });
};

const Exit = () => {
  store.dispatch("Exit");
};
</script>

<style>
.el-menu--horizontal {
  flex-shrink: 1 !important;
}

.flex-grow {
  flex-grow: 1;
}
</style>
