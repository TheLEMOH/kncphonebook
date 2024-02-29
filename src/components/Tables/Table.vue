<template>
  <TableHeader :data="data" :objectsForBulkUpdate="objectsForBulkUpdate"></TableHeader>

  <div class="data-table">
    <TableTree>
      <template #search-menu-header>
        <slot name="search-menu-header"></slot>
      </template>

      <template #search-menu-body>
        <slot name="search-menu-body"></slot>
      </template>
    </TableTree>

    <el-table
      v-loading="loading"
      :class="[client ? 'tableAdmin' : '']"
      :data="props.data.rows"
      :size="size"
      stripe
      class="phonebook-table"
      @row-dblclick="Dbclick"
      @selection-change="handleSelectionChange"
      default-expand-all
    >
      <slot name="columns"></slot>
      <el-table-column align="right" v-if="client" width="96px" striped>
        <template #header>
          <el-space>
            <el-tooltip class="box-item" effect="dark" content="Очистить фильтры" placement="left" :enterable="false" :hide-after="50">
              <el-button type="primary" :size="size" @click="CrearFilter" circle>
                <el-icon>
                  <CircleCloseFilled :size="size" />
                </el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="Создать" placement="left" :enterable="false" :hide-after="0">
              <el-button type="primary" :size="size" @click="Create" circle>
                <el-icon>
                  <Plus :size="size" />
                </el-icon>
              </el-button>
            </el-tooltip>
          </el-space>
        </template>
        <template #default="scope">
          <el-tooltip class="box-item" effect="dark" content="Редактировать" placement="left" :enterable="false" :hide-after="0">
            <el-button type="primary" :size="size" @click="OpenEdit(scope.row.id)" circle>
              <el-icon :size="size">
                <Edit />
              </el-icon>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <TablePagination :currentPage="currentPage" @change-page="ChangePage"></TablePagination>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { Get } from "../../scripts/fetch";
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { ElMessage } from "element-plus";
import debounce from "../../scripts/debounce";
import { useStore } from "vuex";
import { Edit, Plus, CircleCloseFilled } from "@element-plus/icons-vue";

import TableHeader from "./TableComponents/TableHeader.vue";
import TableTree from "./TableComponents/TableTree.vue";
import TablePagination from "./TableComponents/TablePagination.vue";

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

const store = useStore();
const router = useRouter();
const route = useRoute();

const loading = ref(true);

const currentPage = ref(1);

const sortByLevel = ref(false);

const objectsForBulkUpdate = ref([]);

const client = computed(() => store.getters.client);

const Create = () => {
  router.push({ name: props.add });
};

const OpenEdit = (id) => {
  router.push({ name: props.edit, params: { id } });
};

const Dbclick = (event) => {
  if (client.value) OpenEdit(event.id);
};

const ChangePage = () => {
  SearchGet();
};

const ChangeSort = (value) => {
  emits("change-sort", value);
};

const handleSelectionChange = (objects) => {
  objectsForBulkUpdate.value = objects;
};

const AddObject = () => {
  emits("add-objects", JSON.parse(JSON.stringify(objectsForBulkUpdate.value)));
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

const GetSearchParamsFromUrl = () => {
  const params = JSON.parse(JSON.stringify(route.query));

  if (params.page) params.page = +params.page;
  else params.page = 1;

  currentPage.value = params.page;

  sortByLevel.value = Boolean(params.byLevel);

  emits("set-filter", params);
};

const CrearFilter = () => {
  emits("clear-filter");
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
  overflow-y: auto;
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

.tableAdmin .el-table__row:hover {
  cursor: pointer;
}
</style>
