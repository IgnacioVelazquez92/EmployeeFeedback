const { Router } = require("express");
const router = Router();
const {
  getAllEmployees,
  getEmployeesByLegajo,
  saveEmployees,
} = require("../Controllers/employees.controllers");
const multer = require("multer");
// Configura multer para manejar la carga de archivos excel
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para obtener un empleado
router.get("/getbyLegajo/:legajo", getEmployeesByLegajo);

//Rutas para obtener todos
router.get("/", getAllEmployees);

//Ruta para cargar un conjunto de empleados
router.post("/save-employees", upload.single("excelFile"), saveEmployees);

module.exports = router;
