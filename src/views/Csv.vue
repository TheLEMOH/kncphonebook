<template>
  <div class="page-generate-csv">
    <h2>Загрузить новые данные (Сотрудники)</h2>
    <el-select v-model="selectedOrg" filterable placeholder="Выберите организацию">
      <el-option v-for="item in organizations" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <el-alert type="info" show-icon :closable="false" style="max-width: 600px">
      <p>Обновление и создание: создает новые объекты из файла, если объект не содержит поля id. Если поля id заполнено - обновляет объект в базе данных.</p>
      <hr />
      <p>Замена: удаляет данные, замещая их новыми объектами из файла.</p>
    </el-alert>
    <el-select v-model="selectedType" filterable placeholder="Выберите тип загрузки">
      <el-option v-for="item in typesUpload" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <input type="file" @input="UpdateFile" />
    <el-button @click="Create" type="primary" :disabled="disabled">Добавить объекты</el-button>
    <hr style="width: 100%" />
    <h2>Скачать данные</h2>
    <el-select v-model="selectedOrgDownload" filterable placeholder="Выберите организацию">
      <el-option v-for="org in organizations" :key="org.id" :label="org.name" :value="org.id" />
    </el-select>
    <el-select v-model="selectedTable" filterable placeholder="Выберите данные">
      <el-option v-for="item in tables" :key="item.id" :label="item.label" :value="item.id" />
    </el-select>
    <el-button @click="DataToCSV" type="primary" :disabled="!selectedOrgDownload">Скачать объекты</el-button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Get, Post } from "../scripts/fetch";

const tables = [
  { id: "divisions", label: "Структурные подразделения" },
  { id: "subdivisions", label: "Подразделения" },
  { id: "positions", label: "Должности" },
  { id: "employees", label: "Сотрудники" },
  { id: "employments", label: "Вид занятости" },
];

const organizations = await Get(`/organizations`);
const typesUpload = ref([
  { id: "create", name: "Обновление и создание" },
  { id: "replace", name: "Замена" },
]);

const selectedType = ref(null);
const selectedTable = ref(null);
const selectedOrg = ref(null);
const selectedOrgDownload = ref(null);

const json = ref(null);

const disabled = computed(() => {
  if (!selectedOrg.value || !json.value || !selectedType.value) return true;
  else return false;
});

const UpdateFile = async (event) => {
  const reader = new FileReader();
  reader.readAsText(event.target.files[0]);
  const res = await new Promise((resolve, reject) => {
    reader.onload = () => {
      const csv = reader.result;
      const lines = csv.split("\r" + "\n").filter((item) => item != "");
      const headers = lines[0].split(";");

      const result = [];
      for (let i = 1, length = lines.length; i < length; i++) {
        const obj = {};
        const line = lines[i].split(";");

        for (let j = 0, lineL = line.length; j < lineL; j++) {
          obj[headers[j]] = line[j];
        }
        result.push(obj);
      }
      resolve(result);
    };
  });

  console.log(res);

  json.value = res;
};

const JsonToCSV = (items) => {
  const replacer = ";";
  const header = Object.keys(items[0]);
  const csv = [header.join(";"), ...items.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(";"))].join("\r\n");

  return csv;
};

const GetDate = async () => {
  const items = await Get(`/${selectedTable.value}?organizationId=${selectedOrgDownload.value}`);
  return items;
};

const DataToCSV = async () => {
  const items = await GetDate();

  if (items.length == 0) {
    alert("Пустая таблица");

    return 0;
  }

  const csv = JsonToCSV(items);

  DownloadFile(csv);
};

const DownloadFile = (data) => {
  let a = document.createElement("a");
  let file = new Blob(["\ufeff", data], { type: "application/json" });
  a.href = URL.createObjectURL(file);
  a.setAttribute("download", `${selectedTable.value}.csv`);
  a.click();
};

const Create = async () => {
  const res = await Post(`/employees/bulkcreate`, { json: json.value, organizationId: selectedOrg.value, type: selectedType.value });
};
</script>

<style>
.page-generate-csv {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
}

.page-generate-csv h2 {
  margin: 0;
}
</style>
