<template>
  <el-dialog :model-value="visible" :title="title" align-center width="auto" @close="emits('close')">
    <slot name="body"></slot>
    <template #footer>
      <el-button type="primary" @click="Update">Сохранить</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { Put } from "../../scripts/fetch";
import { ElMessage } from "element-plus";

const props = defineProps({
  title: {
    default: "Модальное окно",
    type: String,
  },

  visible: {
    default: false,
    type: Boolean,
  },

  url: {
    default: "",
    type: String,
  },

  form: {
    default: {},
    type: Object,
  },

  data: {
    default: [],
    type: Array,
  },
});

const emits = defineEmits(["close", "done"]);

const loading = ref(false);

const Update = async () => {
  loading.value = true;

  const promises = [];

  props.data.forEach((element) => {
    const newData = { ...props.form };

    newData.id = element.id;

    promises.push(Put(props.url, newData, false));
  });

  Promise.all(promises).then(() => {
    ElMessage({
      message: "Объекты сохранены!",
      type: "success",
      duration: 2000,
    });

    loading.value = false;

    emits("done");
  });
};
</script>
