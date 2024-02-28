const nodemailer = require("nodemailer");
const { differenceInYears, parseISO } = require("date-fns");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Servidor SMTP de Microsoft 365
  port: 587, // Puerto SMTP de Microsoft 365
  secure: false, // Si es true, utiliza SSL/TLS
  auth: {
    user: process.env.EMAIL_USER, // Tu dirección de correo electrónico
    pass: process.env.EMAIL_PASS, // Tu contraseña
  },
});

const enviarEmail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo:", error);
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

const mailCumple = (nombre, email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Tu dirección de correo
    to: email, // Dirección del destinatario
    subject: `¡Feliz Cumpleaños ${nombre}!`,
    text: `Estimado/a ${nombre}:

    En nombre de todo el equipo de Startek, queremos desearte un muy feliz cumpleaños.
    
    Estamos muy agradecidos por tu dedicación, profesionalismo y entusiasmo que aportas a nuestro equipo cada día. Tu positividad y energía contagiosa son una gran parte de lo que hace que nuestra empresa sea un lugar tan especial para trabajar.
    
    Te deseamos un día lleno de alegría, rodeado de tus seres queridos. ¡Esperamos que cumplas muchos más años llenos de salud y felicidad!
    
    Atentamente,
    
    Equipo Startek`,
  };

  return mailOptions;
};

const mailAniversario = (nombre, email, fec_ingreso) => {
  const fechaActual = new Date();
  const fechaIngreso = parseISO(fec_ingreso);

  const diferenciaEnAnios = differenceInYears(fechaActual, fechaIngreso);

  const mailOptions = {
    from: process.env.EMAIL_USER, // Tu dirección de correo
    to: email, // Dirección del destinatario
    subject: `¡¡Felicidades por tu aniversario en Startek!!`,
    text: `Hola ${nombre},
    
    En nombre de todo el equipo de Startek, queremos felicitarte por tu aniversario número ${diferenciaEnAnios} en nuestra empresa.

    Tu compromiso, lealtad y valiosas contribuciones a lo largo de estos años han sido fundamentales para el éxito de nuestra empresa. Estamos muy orgullosos de tenerte como miembro de nuestro equipo.
    
    Gracias por todo lo que haces. Te deseamos muchos más años de éxito y felicidad en Startek.
    
    Atentamente,
    
    Equipo Startek`,
  };

  return mailOptions;
};

const mailFeedback = (nombre, email, jefe) => {
  const fechaActual = new Date();
  const fechaIngreso = parseISO(fec_ingreso);

  const diferenciaEnAnios = differenceInYears(fechaActual, fechaIngreso);

  const mailOptions = {
    from: process.env.EMAIL_USER, // Tu dirección de correo
    to: email, // Dirección del destinatario
    subject: `Nuevo feedback cargado`,
    text: `
    Nos complace informarte que tienes un nuevo feedback disponible cargado por ${jefe}.

    Para acceder al feedback, simplemente ingresa a la Plataforma  y haz clic en "Mis devoluciones".

    Te animamos a leer el feedback con atención y a reflexionar sobre los comentarios que se han hecho. Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con tu supervisor directo.
    `,
  };

  return mailOptions;
};

module.exports = {
  transporter,
  mailCumple,
  mailAniversario,
  mailFeedback,
  enviarEmail,
};
