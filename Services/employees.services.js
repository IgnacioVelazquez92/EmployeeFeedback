//codigo contra la db:
const { pool } = require("../db/dbConnection");

const obtenerTodo = async () => {
  const resultado = pool.query("SELECT * FROM employees");
  return resultado;
};

const busquedaPorLegajo = async (legajo) => {
  const resultado = await pool.query(
    `SELECT * FROM employees WHERE legajo = ${legajo}`
  );

  return resultado;
};

const guardarNuevoEmpleados = async (empleado) => {
  const [resultado] = await pool.query("INSERT INTO employees SET ?", empleado);
  return empleado;
};

const editarEmpleado = async (data) => {
  const [resultado] = await pool.query(
    "UPDATE employees SET ? WHERE legajo = ?",
    [data, data.legajo]
  );
  return resultado[0];
};

const consultaCumple = async () => {
  const [resultado] = await pool.query(
    " SELECT apellido_nombre, mail FROM employees WHERE DAY(fec_nac) = DAY(CURDATE()) AND MONTH(fec_nac) = MONTH(CURDATE())"
  );
  console.log(resultado);
  return resultado;
};

const consultaAniversario = async () => {
  const [resultado] = await pool.query(
    " SELECT apellido_nombre, mail, fec_ingreso FROM employees WHERE DAY(fec_ingreso) = DAY(CURDATE()) AND MONTH(fec_ingreso) = MONTH(CURDATE())"
  );
  console.log(resultado);
  return resultado;
};
module.exports = {
  obtenerTodo,
  busquedaPorLegajo,
  guardarNuevoEmpleados,
  editarEmpleado,
  consultaCumple,
  consultaAniversario,
};
