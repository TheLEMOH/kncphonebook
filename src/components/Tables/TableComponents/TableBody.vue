<template>
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
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { Edit, Plus, CircleCloseFilled } from "@element-plus/icons-vue";

const props = defineProps({
  data: {
    type: Object,
    default: { rows: [], count: 0 },
  },
  size: {
    type: String,
    default: "small",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  add: String,
  edit: String,
});

const emits = defineEmits(["open-edit", "db-click", "clear-filter", "create", "select"]);

const store = useStore();
const router = useRouter();

const client = computed(() => store.getters.client);

const objectsForBulkUpdate = ref([]);

const Create = () => {
  router.push({ name: props.add });
};

const OpenEdit = (id) => {
  router.push({ name: props.edit, params: { id } });
};

const Dbclick = (event) => {
  if (client.value) OpenEdit(event.id);
};

const CrearFilter = () => {
  emits("clear-filter");
};

const handleSelectionChange = (objects) => {
  emits("select", objects);
};
</script>
