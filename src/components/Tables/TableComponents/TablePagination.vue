<template>
  <el-pagination
    class="pagination"
    layout="prev, pager, next"
    :total="data.count"
    :page-size="20"
    :current-page="currentPage"
    @current-change="ChangePage"
    :default-current-page="1"
  />
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: { count: 0, rows: [] },
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

const emits = defineEmits(["change-page"]);

const ChangePage = (e) => {
  emits("change-page", e);
};
</script>
