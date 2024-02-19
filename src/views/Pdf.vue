<template>
  <div class="page-generate-pdf">
    <el-select v-model="selectedOrg" filterable placeholder="Выберите организацию">
      <el-option v-for="org in organizations" :key="org.id" :label="org.name" :value="org.id" />
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
const doc = new jsPDF();

doc.addFileToVFS("PTSans-Regular.ttf", normal);
doc.addFileToVFS("PTSans-Bold.ttf", bold);

doc.addFont("PTSans-Regular.ttf", "PTSans", "normal");
doc.addFont("PTSans-Bold.ttf", "PTSans", "bold");

doc.setFont("PTSans");

const organizations = await Get("/organizations");
const selectedOrg = ref(null);

const GetData = async (sub) => {
  const data = await Get(`/empsub/${sub.id}`);

  data.unshift({ rowSpan: 2, content: sub.name });

  /*   for (let i = 0; i < 10; i++) data.push(data[0]); */

  return data;
};

const GetStructure = async () => {
  const data = await Get("/structure?level=2");
  return data;
};

const AddDivisionName = (name) => {
  doc.setFontSize(20);
  const finalY = doc.lastAutoTable.finalY || 0;
  doc.text(name, doc.internal.pageSize.getWidth() / 2, finalY + 10, { align: "center" });
};

const AddSubdivisionName = (name) => {
  doc.setFontSize(18);
  const finalY = doc.lastAutoTable.finalY || 0;
  doc.text(name, doc.internal.pageSize.getWidth() / 2, finalY + 20, { align: "center" });
};

const PrintHead = () => {
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
  const structure = await GetStructure();
  const divisions = structure[0].divisions;

  for (let i = 0; i < divisions.length; i++) {
    const subdivisions = divisions[i].subdivisions;

    /*     AddDivisionName(divisions[i].name); */

    for (let j = 0; j < subdivisions.length; j++) {
      const subdivision = subdivisions[j];

      /*  AddSubdivisionName(subdivision.name); */

      const data = await GetData(subdivision);

      const finalY = doc.lastAutoTable.finalY || 0;

      autoTable(doc, {
        startY: finalY + 5,
        columns: head,
        body: data,
        styles: { font: "PTSans" },
        theme: "plain",
        columnStyles: { room: { fontStyle: "bold", cellWidth: 20 }, position: { cellWidth: 35 } },
        bodyStyles: {
          fontSize: 14,
        },
        showHead: PrintHead(),
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
          if (data.cell.section === "body" && data.column.dataKey == "room" && !data.cell.raw) {
            console.log(data.row);

            doc.autoTableText(data.row.raw.content, doc.internal.pageSize.getWidth() / 2, data.cell.y, { halign: "center" });
          }
        },
      });
    }
  }
  doc.save("a4.pdf");
};

const CreateDivision = (division, index) => {
  doc.text(division.name, 10, 10);
};

const CreateSubdivision = (subdivision, index) => {
  doc.text(subdivision.name, 10, 30);
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
