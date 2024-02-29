<template>
  <div class="info-table" v-if="header">
    <div class="info-field">
      <span>Всего объектов:</span> <b>{{ props.data.count }}</b>
    </div>
    <div class="info-field">
      <span>На странице:</span> <b>{{ props.data.rows.length }}</b>
    </div>
    <div class="flex-grow"></div>
    <el-space v-if="namePage == 'employeeAll'">
      <el-button type="primary" :size="'small'" :disabled="disabledButtonUpdate" @click="emits('add-objects')">Добавить</el-button>
      <el-button type="primary" :size="'small'" :disabled="disabledButtonUpdate" @click="emits('open-dialog')">Множественное изменение</el-button>
    </el-space>
    <el-checkbox v-model="sortByLevel" label="Сортировка по уровню" @change="emits('open-dialog')" v-if="namePage == 'employeeAll'" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  data: {
    default: { rows: [], count: 0 },
    type: Object,
  },
  header: {
    type: Boolean,
    default: true,
  },
  objectsForBulkUpdate: {
    type: Array,
    default: [],
  },
  disabledButtonUpdate: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["open-dialog", "add-objects", "change-sort"]);

const route = useRoute();

const namePage = computed(() => route.name);
const disabledButtonUpdate = computed(() => props.objectsForBulkUpdate.length == 0);

const sortByLevel = ref(false);
</script>
