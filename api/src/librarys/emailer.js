import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID =
  '750302300783-b58fv7bkv3pu1lj90qnth50dccnr8pbv.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REFRESH_TOKEN =
  '1//04F70KpNepoiDCgYIARAAGAQSNwF-L9IrUGygK_fOflWBG8Rtfu0SZBttq3L_5e1vS4VW6VLUnM7cZhvztRM8svvl8S97QPlW46A';

export const sendMail = async (
  email,
  username,
  amount,
  paymentObjectEmail,
  defaultPassword
) => {
  let mailOptions;
  try {
    const transporter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: 'gamehubappweb@gmail.com',
        pass: 'tqslenybmuzeuted',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
      },
    });
    await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});
    const formatUsername = (username) =>
      username
        .split('')
        .map((l, index) => (index === 0 ? l.toUpperCase() : l.toLowerCase()))
        .join('');

    defaultPassword
      ? (mailOptions = {
          from: '"GameHUB!" <gaminggamehub1@gmail.com>',
          to: email,
          subject: 'Se ha reseteado tu contraseña',
          html: `<p> Hola <b>${formatUsername(
            username
          )}</b>, tu contraseña ha sido reseteada a: <b>${defaultPassword}</b>

Desde <b>GameHUB</b> te deseamos éxitos.</p>
`,
        })
      : amount
      ? (mailOptions = {
          from: '"GameHUB!" <gaminggamehub1@gmail.com>',
          to: email,
          subject: 'Detalles de tu compra en GameHUB',
          html: `<p> Hola <b>${formatUsername(
            username
          )}</b>, muchas gracias por elegirnos. El monto total de tu compra es de $${amount}, para ver los detalles, dirigete a tu perfil de usuario 
  y allí verás reflejadas todas tus compras.
  En caso de necesitar ayuda, dirigete a la sección <b>Ayuda</b> donde encontraras una guía.

  Desde <b>GameHUB</b> te deseamos éxitos.</p>
  `,
        })
      : paymentObjectEmail
      ? (mailOptions = {
          from: '"GameHUB!" <gaminggamehub1@gmail.com>',
          to: email,
          subject: 'Tu compra fue despachada desde GameHUB',
          html: `<p> Hola <b>${formatUsername(
            username
          )}</b>. Los productos que compraste fueron: <b>${paymentObjectEmail.join(
            ', '
          )}</b>. </br>
       Tu compra fue despachada.  
       </br> 
      Desde <b>GameHUB</b> te deseamos éxitos.</p>`,
        })
      : (mailOptions = {
          from: '"Bienvenido/a a GameHUB!" <gaminggamehub1@gmail.com>',
          to: email,
          subject: 'Te has registrado en GameHUB',
          html: `<p> Hola <b>${formatUsername(
            username
          )}</b> bienvenido/a a <b>GameHUB</b>. Para realizar una compra, selecciona todos aquellos productos que
    quieras añadir a tu carrito de compras. Esperamos que disfrutes de nuestros productos y servicios.
    En caso de necesitar ayuda, dirigete a la sección <b>Ayuda</b> donde encontraras una guía.

    Desde <b>GameHUB</b> te deseamos éxitos.</p>
    `,
        });

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (e) {
    console.log(e);
  }
};
