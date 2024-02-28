const { Router } = require("express");
const router = Router();
const {
  getAllEmployees,
  getEmployeesByLegajo,
  saveEmployees,
  updateEmployee,
  verficarCumple,
  verficarAniv,
} = require("../Controllers/employees.controllers");
const multer = require("multer");
// Configura multer para manejar la carga de archivos excel
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para obtener un empleado
router.get("/getbyLegajo/:legajo", getEmployeesByLegajo);

//Rutas para obtener todos
router.get("/", getAllEmployees);

//Rutas para obtener todos
router.patch("/edit-employee", updateEmployee);

//Ruta para cargar un conjunto de empleados
router.post("/save-employees", upload.single("excelFile"), saveEmployees);

router.get("/ruta-verif-concumple", verficarCumple);
router.get("/ruta-verif-aniversario", verficarAniv);

module.exports = router;
