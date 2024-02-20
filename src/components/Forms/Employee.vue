<template>
  <Form :form="form" :url="url" :rules="rules" :redirect="'employeeAll'">
    <template #fields>
      <el-form-item label="Физическое лицо" prop="individual">
        <el-select v-model="form.individualId" filterable placeholder="Выберите физическое лицо"
          @change="SelectIndividual">
          <el-option v-for="individual in individuals" :key="individual.id" :label="individual.name"
            :value="individual.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="ФИО" prop="name">
        <el-input v-model="form.name" maxlength="100" show-word-limit/>
      </el-form-item>
      <el-form-item label="Организация" prop="organizationId">
        <el-select v-model="form.organizationId" filterable placeholder="Выберите организацию" @change="SelectOrg">
          <el-option v-for="org in organizations" :key="org.id" :label="org.shortName" :value="org.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Подразделение" prop="subdivisionId">
        <el-select v-model="form.subdivisionId" filterable placeholder="Выберите подразделение"
          @change="SelectSubdivision">
          <el-option-group v-for="group in divisions" :key="group.id" :label="group.name">
            <el-option v-for="item in group.subdivisions" :key="item.id" :label="item.name" :value="item.id" />
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="Должность" prop="position">
        <el-select v-model="form.positionId" filterable placeholder="Выберите должность" @change="SelectPosition">
          <el-option v-for="item in positions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Ученая степень">
        <el-select v-model="form.degreeId" filterable placeholder="Выберите степень">
          <el-option v-for="degree in degrees" :key="degree.id" :label="degree.name" :value="degree.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="Рабочий телефон">
        <el-input v-model="form.phone" maxlength="100" show-word-limit/>
      </el-form-item>
      <el-form-item label="Почта" prop="email">
        <el-input v-model="form.email" maxlength="100" show-word-limit/>
      </el-form-item>
      <el-form-item label="Адрес" prop="address">
        <el-input v-model="form.address" maxlength="100" show-word-limit/>
      </el-form-item>
      <el-form-item label="Этаж" prop="floor">
        <el-input v-model="form.floor" maxlength="100" show-word-limit/>
      </el-form-item>
      <el-form-item label="Кабинет" prop="room">
        <el-input v-model="form.room" maxlength="100" show-word-limit/>
      </el-form-item>
      <el-space fill>
        <el-alert type="info" show-icon :closable="false">
          <p>Уровень сортировки заполняется автоматические и зависит от выбранной должности. Значение по-умолчанию: 0</p>
        </el-alert>
        <el-form-item label="Уровень сортировки" prop="levelSort">
          <el-input-number v-model="form.levelSort" />
        </el-form-item>
      </el-space>
    </template>
  </Form>
</template>

<script setup>
import Form from "./Form.vue";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Get } from "../../scripts/fetch";

const rules = reactive({
  name: [{ required: true, message: "Введите ФИО", trigger: "blur" }],
  organizationId: [{ required: true, message: "Выберите организацию", trigger: "change" }],
  levelSort: [{ type: 'number', message: "Уровень сортировки должнен быть числом" }, { required: true, message: 'Введите уровень сортировки' },]
});

const url = "/employees";

const route = useRoute();
const router = useRouter()

const organizations = await Get(`/organizations`);
const degrees = await Get(`/degrees`);
const positions = await Get(`/positions`);
const individuals = await Get(`/individuals`);
const divisions = ref([]);
const structure = ref([]);
const id = route.params.id;

let form = reactive({ levelSort: 0 });

if (id) {

  const object = await Get(`/${url}/${id}`).catch(() => { router.back() })

  form = reactive(object);

  const orgId = form.organizationId;
  structure.value = await Get(`/structure?level=2&id=${orgId}`);
  divisions.value = structure.value[0].divisions;
}

const SelectSubdivision = (id) => {
  let division = null;
  structure.value[0].divisions.forEach((d) => {
    const subIndex = d.subdivisions.findIndex((s) => s.id == id);
    if (subIndex != -1) division = d;
  });

  form.divisionId = division.id;
};

const SelectOrg = async (id) => {
  const org = organizations.find((d) => d.id == id);
  structure.value = await Get(`/structure?level=2&id=${id}`);
  divisions.value = structure.value[0].divisions;

  form.subdivisionId = null;
  form.address = org.address;
};

const SelectIndividual = async (id) => {
  const individual = individuals.find((d) => d.id == id);
  form.name = individual.name;
};

const SelectPosition = async (id) => {
  const position = positions.find((d) => d.id == id);
  form.levelSort = position.levelSort;
};
</script>
