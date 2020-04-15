const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./server/connection");
const api = require("./server/routes/api");
const app = express();
const port = 3500;

connectDB();

app.use(express.static(path.join(__dirname, "dist/employee-registration")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/employee-registration/index.html"));
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
