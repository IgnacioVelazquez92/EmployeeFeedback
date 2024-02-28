const {
  obtenerTodo,
  busquedaPorLegajo,
  guardarNuevoEmpleados,
  editarEmpleado,
  consultaCumple,
  consultaAniversario,
} = require("../Services/employees.services.js");
const {
  transporter,
  mailCumple,
  mailAniversario,
  enviarEmail,
} = require("../helpers/nodemailer");

const { parse } = require("date-fns");
const xlsx = require("xlsx");
const cron = require("node-cron");
const { verify } = require("jsonwebtoken");

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
      msg: "Archivo Excel cargado y procesado con éxito.",
      msgDev: respuesta,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error en el servidor, intente más tarde", msgDev: error });
  }
};

const updateEmployee = async (req, res) => {
  const { data } = req.body;

  try {
    const respuesta = await editarEmpleado(data);
    res.status(200).json({
      msg: "Archivo Excel cargado y procesado con éxito.",
      msgDev: respuesta,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "error en el servidor, intente más tarde", msgDev: error });
  }
};

const verficarCumple = async (req, res) => {
  try {
    const respuesta = await consultaCumple();
    console.log(respuesta);

    for (const resp of respuesta) {
      console.log(resp);
      console.log(resp.apellido_nombre);
      console.log(resp.mail);
      const mailOptions = mailCumple(resp.apellido_nombre, resp.mail);
      console.log(mailOptions);

      await enviarEmail(mailOptions);
    }

    if (res) {
      return res.status(200).json({ respuesta, msg: "hola desde cumpleaños" });
    }
  } catch (error) {
    console.log(error);

    if (res) {
      res.status(500).json({
        msg: "error en el servidor, intente más tarde",
        msgDev: error,
      });
    }
  }
};

const verficarAniv = async (req, res) => {
  try {
    const respuesta = await consultaAniversario();
    console.log(respuesta);

    for (const resp of respuesta) {
      const mailOptions = mailAniversario(
        resp.apellido_nombre,
        resp.mail,
        resp.fecha_ingreso
      );

      await enviarEmail(mailOptions);
    }

    if (res) {
      return res.status(200).json({ respuesta, msg: "hola desde aniversario" });
    }
  } catch (error) {
    console.log(error);

    if (res) {
      res.status(500).json({
        msg: "error en el servidor, intente más tarde",
        msgDev: error,
      });
    }
  }
};
//Saludos
cron.schedule("0 7 * * *", async () => {
  try {
    const cumple = await verficarCumple();
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  getAllEmployees,
  getEmployeesByLegajo,
  saveEmployees,
  updateEmployee,
  verficarCumple,
  verficarAniv,
};
