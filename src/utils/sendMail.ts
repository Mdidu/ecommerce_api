import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER,
    pass: process.env.API_PASSWORD,
  }
});

/**
 * @param { String } email
 * @param { String } firstName
 * @param { String } lastName
 */
export const sendMail = (email: string, firstName = '', lastName = '') => {
  const to = email;
  const subject = `Bienvenue ${firstName} ${lastName} ! Valider votre compte !`;
  const html = `Veuillez cliquer sur ce lien pour valider votre compte : <a href="${process.env.BASE_URL}/auth/validate/${email}">Valider votre compte !</a>`;

  transporter.sendMail({
    from: process.env.SENDER,
    to,
    subject,
    html,
  });
};
