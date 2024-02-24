const express = require("express");
const app = express();
const employeesRoutes = require("../Routes/employees.routes");

require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/employees", employeesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
