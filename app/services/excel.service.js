const ExcelJS = require("exceljs");

class ExcelServices {
	constructor() {
		this.workbook = new ExcelJS.Workbook();
	}
	async createReportPersons(persons) {
		const sheet = this.workbook.addWorksheet("Personas");
		sheet.columns = [
			{header: "Id", key: "id", width: 10},
			{header: "Name", key: "name", width: 40},
			{header: "Email", key: "email", width: 40},
		];
		persons.forEach((person) => {
			sheet.addRow(person);
		});
		await this.workbook.xlsx.writeFile("app/statics/universidad.xlsx");
	}
}
module.exports = ExcelServices;
