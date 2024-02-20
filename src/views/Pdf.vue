<template>
  <div class="page-generate-pdf">
    <el-select v-model="selectedOrg" filterable placeholder="Выберите организацию">
      <el-option v-for="org in organizations" :key="org.id" :label="org.shortName" :value="org.id" />
    </el-select>
    <el-button @click="Generate" :disabled="!selectedOrg">Сгенерировать PDF</el-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Get } from "../scripts/fetch";
import autoTable from "jspdf-autotable";
import normal from "../../PTSans-Regular-normal";
import bold from "../../PTSans-Bold-bold";
import { jsPDF } from "jspdf";

import CreateTable from "../createTable/index";

const createTable = new CreateTable();


const organizations = await Get("/organizations");
const selectedOrg = ref(null);

const GetData = async (sub) => {
  const data = await Get(`/empsub/${sub.id}`);

  return data;
};

const GetStructure = async () => {
  const data = await Get(`/structure?level=2&id=${selectedOrg.value}`);
  return data;
};

const PrintHead = (doc) => {
  const lastTable = doc.lastAutoTable;
  if (!lastTable) return "firstPage";
  else return "never";
};

const head = [
  { header: "Ком.", dataKey: "room" },
  { header: "Должность", dataKey: "position" },
  { header: "Ф.И.О", dataKey: "name" },
  { header: "Тел.", dataKey: "phone" },
  { header: "Адрес эл. почты", dataKey: "email" },
];

/* const Generate = async () => {};
 */
const Generate = async () => {

  const doc = new jsPDF();

  doc.addFileToVFS("PTSans-Regular.ttf", normal);
  doc.addFileToVFS("PTSans-Bold.ttf", bold);

  doc.addFont("PTSans-Regular.ttf", "PTSans", "normal");
  doc.addFont("PTSans-Bold.ttf", "PTSans", "bold");

  doc.setFont("PTSans");


  const structure = await GetStructure();
  const divisions = structure[0].divisions;


  for (let i = 0; i < divisions.length; i++) {
    const subdivisions = divisions[i].subdivisions;

    let data = [{ content: divisions[i].name, type: 'division' }]

    for (let j = 0; j < subdivisions.length; j++) {
      const subdivision = subdivisions[j];

      data.push({ content: subdivision.name, type: 'subdivision' })

      data.push(...await GetData(subdivision));
    }

    const finalY = doc.lastAutoTable.finalY || 0;

    autoTable(doc, {
      startY: finalY + 3,
      columns: head,
      body: data,
      styles: { font: "PTSans" },
      theme: "plain",
      columnStyles: { room: { fontStyle: "bold", cellWidth: 20 }, position: { cellWidth: 35 } },
      bodyStyles: {
        fontSize: 14,
      },
      showHead: PrintHead(doc),
      pageBreak: "auto",
      rowPageBreak: "avoid",
      headStyles: {
        fillColor: [255, 255, 255],
        fontSize: 14,
        textColor: [0, 0, 0],
        lineWidth: { bottom: 0.1, top: 0.1, left: 0.1, right: 0.1 },
        cellPadding: { bottom: 3, top: 3, left: 3, right: 3 },
        lineColor: [0, 0, 0],
      },
      willDrawCell: (data) => {
        if (data.column.dataKey == "position" && data.cell.section == "body") {
          data.cell.text = data.cell.raw ? data.cell.raw.name : " ";
        }
      },
      didDrawCell: function (data) {
        if (data.cell.section === "body" && data.column.dataKey == "room" && data.row.raw.type == 'subdivision' && !data.cell.raw) {
          doc.autoTableText(data.row.raw.content, doc.internal.pageSize.getWidth() / 2, data.cell.y + 1, { halign: "center" });
        }

        if (data.cell.section === "body" && data.column.dataKey == "room" && data.row.raw.type == 'division' && !data.cell.raw) {
          doc.setFontSize(18);
          doc.autoTableText(data.row.raw.content, doc.internal.pageSize.getWidth() / 2, data.cell.y + 2, { halign: "center" });
        }
      },
    });
  }
  doc.save("a4.pdf");
};

</script>

<style>
.page-generate-pdf {
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
</style>
