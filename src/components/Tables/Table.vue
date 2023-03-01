<template>
  <div class="info-table">
    <div class="info-field">
      <span>Всего объектов:</span> <b>{{ props.data.count }}</b>
    </div>
    <div class="info-field">
      <span>На странице:</span> <b>{{ props.data.rows.length }}</b>
    </div>
    <div class="flex-grow"></div>
    <el-checkbox v-model="sortByLevel" label="Сортировка по уровню" @change="ChangeSort" />
  </div>

  <div class="data-table">
    <div class="search-menu" v-if="structure">
      <div class="search-menu-header">
        <slot name="search-menu-header"></slot>
      </div>

      <el-scrollbar>
        <div class="search-menu-body">
          <slot name="search-menu-body"></slot>
        </div>
      </el-scrollbar>
    </div>

    <el-table :data="props.data.rows" :size="size" stripe class="phonebook-table">
      <slot name="columns"></slot>
      <el-table-column align="right" v-if="client" width="72px" striped>
        <template #header>
          <el-button type="primary" :size="size" @click="Create" circle>
            <el-icon>
              <Plus :size="size" />
            </el-icon>
          </el-button>
        </template>
        <template #default="scope">
          <el-button type="primary" :size="size" @click="OpenEdit(scope)" circle>
            <el-icon :size="size">
              <Edit />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-pagination class="pagination" layout="prev, pager, next" :total="data.count" :page-size="20" v-model:current-page="currentPage" @current-change="ChangePage" :default-current-page="1" />
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";

import { Edit, Plus } from "@element-plus/icons-vue";

const props = defineProps({
  data: Object,
  add: String,
  edit: String,
  structure: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["change-page", "change-sort"]);

const store = useStore();
const router = useRouter();

const currentPage = ref(1);

const sortByLevel = ref(false);

const client = computed(() => store.getters.client);

const Create = () => {
  router.push({ name: props.add });
};

const OpenEdit = (scope) => {
  const id = scope.row.id;
  router.push({ name: props.edit, params: { id } });
};

const ChangePage = () => {
  if (currentPage) emits("change-page", currentPage);
};

const ChangeSort = (value) => {
  emits("change-sort", value);
};

const windowWidth = ref(window.innerWidth);

const OnWidthChange = () => (windowWidth.value = window.innerWidth);

onMounted(() => window.addEventListener("resize", OnWidthChange));
onUnmounted(() => window.removeEventListener("resize", OnWidthChange));

const size = computed(() => {
  if (windowWidth.value <= 1024) return "small";
  if (windowWidth.value > 1024) return "default";
});
</script>

<style>
.phonebook-table {
  height: calc(100vh - 150px);
  width: 100%;
}

.cell {
  word-break: normal !important;
}

.pagination {
  justify-content: center;
}

.phonebook-tools {
  background-color: #fff;
  margin-bottom: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: end;
}

.info-table {
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  padding: 0.5rem;
  font-size: var(--el-font-size-base);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.data-table {
  display: flex;
}

.search-menu {
  height: calc(100vh - 150px);
  background: var(--el-fill-color-lighter);
  border-right: 1px solid #ebeef5;
  flex-shrink: 1;
  width: 250px;
}

.el-tree {
  background-color: transparent;
}

.search-menu-body {
  display: flex;
}

.search-menu .el-scrollbar {
  padding: 0.2rem;
  height: auto;
}

.search-menu-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--el-font-size-base);
  color: var(--el-text-color-regular);
  border-bottom: 1px solid #ebeef5;
}

.phonebook-table input::placeholder {
  font-weight: bold;
  color: #909399;
}
</style>
