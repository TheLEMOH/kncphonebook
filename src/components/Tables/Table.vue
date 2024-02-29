<template>
  <TableHeader
    :data="data"
    :objectsForBulkUpdate="objectsForBulkUpdate"
    :sortByLevel="sortByLevel"
    @add-objects="AddObject"
    @open-dialog="emits('open-dialog', $event)"
    @change-sort="emits('change-sort', $event), (sortByLevel = $event)"
  ></TableHeader>

  <div class="data-table">
    <TableTree>
      <template #search-menu-header>
        <slot name="search-menu-header"></slot>
      </template>

      <template #search-menu-body>
        <slot name="search-menu-body"></slot>
      </template>
    </TableTree>

    <TableBody :data="data" :size="size" :add="add" :edit="edit" :loading="loading" @clear-filter="emits('clear-filter')" @select="Select">
      <template #columns>
        <slot name="columns"></slot>
      </template>
    </TableBody>
  </div>

  <TablePagination :data="data" :currentPage="currentPage" @change-page="ChangePage"></TablePagination>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { Get } from "../../scripts/fetch";
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import debounce from "../../scripts/debounce";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

import TableHeader from "./TableComponents/TableHeader.vue";
import TableTree from "./TableComponents/TableTree.vue";
import TablePagination from "./TableComponents/TablePagination.vue";
import TableBody from "./TableComponents/TableBody.vue";

const props = defineProps({
  data: Object,
  add: String,
  edit: String,
  url: String,
  header: {
    type: Boolean,
    default: true,
  },
  structure: {
    type: Boolean,
    default: true,
  },
  filter: {
    type: Object,
    default: { page: 1 },
  },
});

const emits = defineEmits(["change-page", "change-sort", "download-done", "set-filter", "clear-filter", "open-dialog", "add-objects"]);

const router = useRouter();
const route = useRoute();

const loading = ref(true);

const currentPage = ref(1);

const sortByLevel = ref(false);

const objectsForBulkUpdate = ref([]);

const ChangePage = (e) => {
  currentPage.value = e;

  SearchGet();
};

const AddObject = () => {
  ElMessage({
    message: "Добавлено!",
    type: "success",
    duration: 1000,
  });

  emits("add-objects", JSON.parse(JSON.stringify(objectsForBulkUpdate.value)));
};

const Select = (objects) => {
  objectsForBulkUpdate.value = objects;
};

const windowWidth = ref(window.innerWidth);

const OnWidthChange = () => (windowWidth.value = window.innerWidth);

const size = computed(() => {
  if (windowWidth.value <= 1024) return "small";
  if (windowWidth.value > 1024) return "default";
});

const SetSearchParams = (filter = {}) => {
  const urlFilter = JSON.parse(JSON.stringify(filter));

  for (let key in urlFilter) {
    if (!urlFilter[key]) {
      delete urlFilter[key];
    }
  }

  router.replace({ query: urlFilter });
};

const GetSearchParamsFromUrl = () => {
  const params = JSON.parse(JSON.stringify(route.query));

  if (params.page) params.page = +params.page;
  else params.page = 1;

  currentPage.value = params.page;

  sortByLevel.value = Boolean(params.byLevel);

  emits("set-filter", params);
};

const SearchGet = async (value) => {
  loading.value = true;

  const getFilter = { ...value, page: currentPage.value };

  const searchParams = new URLSearchParams(getFilter).toString();

  Get(`${props.url}?${searchParams}`).then((res) => {
    SetSearchParams(getFilter);
    emits("download-done", res);

    loading.value = false;
  });
};

const SearchChange = debounce((value) => SearchGet(value));

GetSearchParamsFromUrl();

onMounted(() => window.addEventListener("resize", OnWidthChange));
onUnmounted(() => window.removeEventListener("resize", OnWidthChange));

watch(
  () => props.filter,
  (value) => {
    SearchChange(value);
  },
  { deep: true, immediate: true }
);
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

.el-table .cell {
  text-overflow: clip;
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
  min-height: 40px;
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

  max-width: 220px;
  min-width: 200px;
}

.search-menu span {
  word-wrap: break-word !important;
  white-space: normal;
}

.el-tree-node__content {
  height: auto;
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

.tableAdmin .el-table__row:hover {
  cursor: pointer;
}
</style>
