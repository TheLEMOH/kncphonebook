<template>
  <div class="form">
    <el-form ref="formRef" label-width="220px" :label-position="typeForm" :rules="rules" :model="form">
      <slot name="fields"></slot>
    </el-form>
    <div>
      <slot name="content"></slot>
    </div>
    <el-form-item>
      <div class="form-buttons">
        <slot name="buttons">
          <template v-if="type == 'create'">
            <el-button type="primary" @click="Create(formRef)" :disabled="loading">Создать</el-button>
          </template>

          <template v-if="type == 'edit'">
            <el-popconfirm confirm-button-text="Да" cancel-button-text="Нет" title="Удалить данный объект?"
              @confirm="Remove">
              <template #reference>
                <el-button type="danger" :disabled="loading">Удалить</el-button>
              </template>
            </el-popconfirm>
            <el-button type="primary" :disabled="loading" @click="Update(formRef)">Сохранить</el-button>
          </template>
        </slot>
      </div>
    </el-form-item>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Post, Put, Delete } from "../../scripts/fetch.js";
import { useRoute, useRouter } from "vue-router";

const formRef = ref();
const route = useRoute();
const router = useRouter();

const props = defineProps({
  form: Object,
  url: String,
  rules: Object,
  redirect: String,
});

let loading = ref(false);

const Create = async (formEl) => {
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      const post = await Post(props.url, props.form);
      if (post) {
        router.push({ name: props.redirect });
      }
      loading.value = false;
    }
  });
};

const Update = async (formEl) => {
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      const put = await Put(props.url, props.form);
      if (put) {
        router.push({ name: props.redirect });
      }
      loading.value = false;
    }
  });
};

const Remove = async () => {
  loading.value = true;
  const del = await Delete(props.url, props.form);
  if (del) {
    router.push({ name: props.redirect });
  }
  loading.value = false;
};

const type = computed(() => route.meta.typePage);

const windowWidth = ref(window.innerWidth);

const OnWidthChange = () => (windowWidth.value = window.innerWidth);

onMounted(() => window.addEventListener("resize", OnWidthChange));
onUnmounted(() => window.removeEventListener("resize", OnWidthChange));

const typeForm = computed(() => {
  if (windowWidth.value <= 425) return "top";
  if (windowWidth.value > 425) return "left";
});
</script>

<style>
.form {
  background-color: #fff;
  padding: 1rem;
}

.form-buttons {
  width: 100%;
  display: flex;
  justify-content: end;
}
</style>
