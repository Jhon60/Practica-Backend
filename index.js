const express = require("express");
const router = require("./app/routes/index");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/statics", express.static(path.join(__dirname, "app/statics")));
app.use(express.json());
app.use("/", router);
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server started on port: http://localhost:3000`);
});
