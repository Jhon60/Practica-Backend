const postgresService = require("../../services/postgres.service");
const mailerServices = require("../../services/mailer.service");
const ExcelServices = require("../../services/excel.service");
const _pg = new postgresService();
const mailer = new mailerServices();

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createPerson = async (req, res) => {
	try {
		let persona = req.body;
		let sql = `INSERT INTO public.personas (name, email)
        VALUES($1, $2)`;
		let data = [persona.name, persona.email];
		let result = await _pg.executeSQL2(sql, data);
		if (result.rowCount == 1) {
			let body = "<h1>Hi Welcome to the university</h1>";
			await mailer.send(persona.email, "Welcome", body);
		}
		return res.send({
			ok: result.rowCount == 1,
			message: result.rowCount == 1 ? "Register" : "Error",
			content: persona,
		});
	} catch (error) {
		return res.send({
			ok: false,
			message: "Error",
			content: error,
		});
	}
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createReport = async (req, res) => {
	try {
		let sql = `SELECT * FROM public.personas`;
		let result = await _pg.executeSQL(sql);
		const _excel = new ExcelServices();
		await _excel.createReportPersons( result.rows);
		return res.send({
			ok: true,
			message: "Report created",
			url: "http://localhost:3000/statics/universidad.xlsx",
		});
	} catch (error) {
		return res.send({
			ok: false,
			message: "Error",
			url: error,
		});
	}
};

module.exports = {createReport, createPerson};
