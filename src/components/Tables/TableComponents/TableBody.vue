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
const emits = defineEmits(["open-edit", "db-click", "clear-filter", "create"]);
</script>
