<template>
  <div class="info-table" v-if="header">
    <div class="info-field" v-if="props.data.count">
      <span>Всего объектов:</span> <b>{{ props.data.count }}</b>
    </div>
    <div class="info-field" v-if="props.data.rows">
      <span>На странице:</span> <b>{{ props.data.rows.length }}</b>
    </div>
    <div class="flex-grow"></div>
    <el-checkbox v-model="sortByLevel" label="Сортировка по уровню" @change="ChangeSort"
      v-if="namePage == 'employeeAll'" />
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

    <el-table v-loading="loading" :class="[client ? 'tableAdmin' : '']" :data="props.data.rows" :size="size" stripe
      class="phonebook-table" @row-dblclick="Dbclick" default-expand-all>
      <slot name="columns"></slot>
      <el-table-column align="right" v-if="client" width="72px" striped>
        <template #header>
          <el-tooltip class="box-item" effect="light" content="Создать" placement="left">
            <el-button type="primary" :size="size" @click="Create" circle>
              <el-icon>
                <Plus :size="size" />
              </el-icon>
            </el-button>
          </el-tooltip>
        </template>
        <template #default="scope">
          <el-tooltip class="box-item" effect="light" content="Редактировать" placement="left">
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
  <el-pagination class="pagination" layout="prev, pager, next" :total="data.count" :page-size="20"
    v-model:current-page="currentPage" @current-change="ChangePage" :default-current-page="1" />
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { Get } from "../../scripts/fetch";
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import debounce from "../../scripts/debounce";
import { useStore } from "vuex";
import { Edit, Plus } from "@element-plus/icons-vue";

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
    default: { page: 1 }
  }
});

const emits = defineEmits(["change-page", "change-sort", "download-done", "set-filter"]);

const store = useStore();
const router = useRouter();
const route = useRoute();

const loading = ref(true)

const namePage = computed(() => route.name);

const currentPage = ref(1);

const sortByLevel = ref(false);

const client = computed(() => store.getters.client);

const Create = () => {
  router.push({ name: props.add });
};

const OpenEdit = (id) => {
  router.push({ name: props.edit, params: { id } });
};

const Dbclick = (event) => {
  if (client.value)
    OpenEdit(event.id)
}

const ChangePage = () => {
  SearchGet()
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

const SetSearchParams = (filter = {}) => {

  const urlFilter = JSON.parse(JSON.stringify(filter))

  for (let key in urlFilter) {
    if (!urlFilter[key]) {
      delete urlFilter[key]
    }
  }

  router.replace({ query: urlFilter })
}

const SearchGet = async (value) => {

  loading.value = true

  const getFilter = { ...value, page: currentPage.value }

  const searchParams = new URLSearchParams(getFilter).toString();

  Get(`${props.url}?${searchParams}`).then((res) => {
    SetSearchParams(getFilter)
    emits('download-done', res)

    loading.value = false
  });

}

const GetSearchParamsFromUrl = () => {
  const params = JSON.parse(JSON.stringify(route.query))

  if (params.page)
    params.page = +params.page
  else
    params.page = 1

  currentPage.value = params.page

  emits('set-filter', params)
}

const SearchChange = debounce((value) => SearchGet(value));

GetSearchParamsFromUrl()

watch(() => props.filter, (value) => {

  SearchChange(value)

}, { deep: true, immediate: true })

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
