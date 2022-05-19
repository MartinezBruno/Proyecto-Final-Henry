function putUser({ nombre }) {
  return `
    <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Perfil</title>
      </head>
      <body>
        <h1> Informacion actualizada </h1>
        <p> Hola ${nombre}! </p>
        <p> Te enviamos este email para informarte que cierta informacion en tu perfil fue acualizada</p>
        <br/>
        <p> Cordiales saludos, <br/>
        Equipo ATTEND </p>
      </body>
      </html>

  `
}

module.exports = { putUser }
