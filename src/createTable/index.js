class CreateTable {
  constructor() {
    this.table = document.createElement("tbody");
    this.lastRow = null;
  }

  addRow() {
    const row = this.table.insertRow();
    this.lastRow = row;
  }

  addCell({ text }) {
    const cell = this.lastRow.insertCell();
    cell.innerHTML = text;
    return cell;
  }

  append() {
    document.body.appendChild(this.table);
  }
}

export default CreateTable;
