const transporter = require("../helpers/nodemailer.helpers");

const registroExitoso = async (userEmail, nameUser) => {
  // Recibimos el correo y el nombre del usuario.
  const info = await transporter.sendMail({
    from: `"HDS-Pagina" <${process.env.GMAIL_USER}>`, // Datos de la empresa.
    to: `${userEmail}`, // Correo del usuario.
    subject: `Bienvenido ${nameUser}`,
    text: "Gracias por el registro!", // plain‑text body, no se verá en el correo.
    html: "<b>Hola desde el Cuerpo HMTL</b>", // HTML body es lo que se verá en el correo. para aplicar estilos usamos el "style".
  });

  return {
    info: info.response.includes("OK"),
    rejected: info.rejected,
  };
};

/* const recuperarContrasenia = async () => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
}; */

module.exports = {
  registroExitoso,
  /* recuperarContrasenia, */
};
