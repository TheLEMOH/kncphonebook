<template>
    <div class="page-generate-pdf">
        <el-select v-model="selectedOrg" filterable placeholder="Выберите организацию">
            <el-option v-for="org in organizations" :key="org.id" :label="org.name" :value="org.id" />
        </el-select>
        <el-button @click="Generate" :disabled="!selectedOrg">Сгенерировать PDF</el-button>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { Get } from "../scripts/fetch";
import autoTable from 'jspdf-autotable'
import normal from "../../PTSans-Regular-normal"
import bold from "../../PTSans-Bold-bold"

import { jsPDF } from "jspdf"

const doc = new jsPDF();

doc.addFileToVFS('PTSans-Regular.ttf', normal);
doc.addFileToVFS('PTSans-Bold.ttf', bold);

doc.addFont('PTSans-Regular.ttf', 'PTSans', 'normal');
doc.addFont('PTSans-Bold.ttf', 'PTSans', 'bold');

doc.setFont("PTSans");


const organizations = await Get('/organizations')
const selectedOrg = ref(null)

const GetData = async () => {
    /*    const data = await Get(`/forpdf/${selectedOrg.value}`) */
    const data = await Get('/employees')
    return data
}

const head = [
    { header: 'Ком.', dataKey: 'room' },
    { header: 'Должность', dataKey: 'position' },
    { header: 'Ф.И.О', dataKey: 'name' },
    { header: 'Тел.', dataKey: 'phone' },
];


const Generate = async () => {
    /*   const data = await GetData()
      data.forEach(organization => {
          organization.divisions.forEach((division) => {
  
              const finalY = doc.lastAutoTable.finalY || 0
              doc.setFontSize(15)
              doc.text(division.name, 10, finalY + 10)
  
              division.subdivisions.forEach((subdivision) => {
                  const users = []
                  doc.setFontSize(13)
                  doc.text(subdivision.name, 10, finalY + 20)
  
                  subdivision.users.forEach(user => {
                      users.push(user)
                  })
  
                  autoTable(doc, {
                      startY: finalY + 25,
                      columns: head,
                      body: users,
                      styles: { font: 'PTSans-Regular', textColor: [0, 0, 0], },
                      headStyles: { fillColor: [255, 255, 255] }
                  })
              })
          })
      }) */


    const data = await GetData()

    autoTable(doc, {
        columns: head,
        body: data,
        styles: { font: 'PTSans' },
        theme: 'plain',
        columnStyles: { 1: { cellWidth: 70, colSpan: 2 } },
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            lineWidth: { bottom: 0.1, top: 0.1, left: 0.1, right: 0.1 },
            cellPadding: { bottom: 5, top: 5, left: 5, right: 5 },
            lineColor: [0, 0, 0]
        }
    })
    doc.save("a4.pdf");
}

const CreateDivision = (division, index) => {
    doc.text(division.name, 10, 10);
}

const CreateSubdivision = (subdivision, index) => {
    doc.text(subdivision.name, 10, 30);
}

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



