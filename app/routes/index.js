const express = require("express");
const _personsController = require("../controllers/persons/persons.controller");
const router = express.Router();

router
	.post("/persons", _personsController.createPerson)
	.get("/persons/report", _personsController.createReport);
module.exports = router;
