const {
  obtenerTodo,
  busquedaPorLegajo,
  guardarNuevoEmpleados,
} = require("../Services/employees.services.js");

const { parse } = require("date-fns");

const xlsx = require("xlsx");

//logica de negocio

const getAllEmployees = async (req, res) => {
  try {
    const [resultado] = await obtenerTodo();
    console.log(resultado);
    res.json(resultado);
    return;
  } catch (error) {
    console.error("Error al obtener los documentos:", error);
    res.status(500).json({ msg: "fallo el servidor intente más tarde" });
  }
};

const getEmployeesByLegajo = async (req, res) => {
  try {
    const { legajo } = req.params;
    console.log(legajo);
    const [response] = await busquedaPorLegajo(legajo);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error en el servidor, intente más tarde", msgDev: error });
  }
};

const saveEmployees = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;

    // Analiza el archivo Excel
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const excelSerialNumberToDate = (serialNumber) => {
      const msPerDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
      const epoch = Date.parse("1900-01-01"); // Excel's epoch
      const offset = (serialNumber - 1) * msPerDay; // Offset in milliseconds
      return new Date(epoch + offset);
    };

    for (const item of data) {
      if (item.fec_nac) {
        // Convierte el número de Excel en una fecha válida
        item.fec_nac = excelSerialNumberToDate(item.fec_nac);
      }
      if (item.fec_ingreso) {
        // Convierte el número de Excel en una fecha válida
        item.fec_ingreso = excelSerialNumberToDate(item.fec_ingreso);
      }

      // Utiliza el servicio para guardar la encuesta
      const respuesta = await guardarNuevoEmpleados(item);
      console.table(respuesta);
    }

    res.status(200).json({
      message: "Archivo Excel cargado y procesado con éxito.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error en el servidor, intente más tarde", msgDev: error });
  }
};
module.exports = { getAllEmployees, getEmployeesByLegajo, saveEmployees };
