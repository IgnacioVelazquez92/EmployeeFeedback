//codigo contra la db:
const { pool } = require("../db/dbConnection");

const obtenerTodo = async () => {
  const resp = pool.query("SELECT * FROM employees");
  return resp;
};

const busquedaPorLegajo = async (legajo) => {
  const resp = await pool.query(
    `SELECT * FROM employees WHERE legajo = ${legajo}`
  );

  return resp;
};

const guardarNuevoEmpleados = async (empleado) => {
  const [resultado] = await pool.query("INSERT INTO employees SET ?", empleado);
  return empleado;
};

module.exports = { obtenerTodo, busquedaPorLegajo, guardarNuevoEmpleados };
