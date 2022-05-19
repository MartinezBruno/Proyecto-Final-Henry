function compraSuccess({ nombre, precio, nombreServicio }) {
  let services = nombreServicio.join(', ')
  let precioTotal = precio.reduce((a, b) => a + b, 0)
  return `
    <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Compra Exitosa!</title>
      </head>
      <body>
        <h1> Compra realizada con exito </h1>
        <p> Hi ${nombre}, hemos confirmado tu compra de ${services}</p>
        <p> por el monto de $${precioTotal} </p>
      </body>
      </html>

  `
}

module.exports = { compraSuccess }
