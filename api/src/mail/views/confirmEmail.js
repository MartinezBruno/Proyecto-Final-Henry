function confirmEmail(nombre, token) {
  return `
    <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>confirmEmail</title>
      </head>
      <body>
        <div id="email___content">
            <img src="" alt="">
            <h2>Hola ${nombre}</h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
                href="http://localhost:${process.env.DB_PORT}/api/auth/usuario/confirm/${token}"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
      </body>
      </html>

  `
}

module.exports = { confirmEmail }
