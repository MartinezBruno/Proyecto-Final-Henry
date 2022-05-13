const nodemailer = require('nodemailer')

//Este objeto hay que crear para pasarle a la funcion sendMail como parametro para que pueda funcionar correctamente.

/*const options = {
  user: 'correo@weattend.online',
  mailOptions: {
    from: "'Attend' <correo@weattend.online>",
    to: 'aquí va el correo del usuario',
    subject: 'Asunto del correo',
    text: {contentHTML}
  }
}*/

function sendMail(options) {
  //Creamos el objeto de transporte
  const transporter = nodemailer.createTransport({
    host: 'mail.weattend.online',
    port: '587',
    secure: false,
    auth: {
      user: options.user,
      pass: 'Lomocompleto1',
    },
  })

  transporter.sendMail(options.mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email enviado: ' + info.response)
    }
  })
}

module.exports = { sendMail }
