const { Pais, Servicio } = require("../db")

const paises = ["Argentina", "Uruguay", "Mexico"];
const servicios = ['Profe de guitarra', 'jardinero']

function paisesDb(){
     paises.forEach(pais=>{
        Pais.findOrCreate({
            where: {
                NOMBRE_PAIS: pais,
            }
        })
    })
} 

function serviciosDb(){
    servicios.forEach(servicio=>{
        Servicio.findOrCreate({
            where: {
                NOMBRE_SERVICIO: servicio,
            }
        })
    })
}

module.exports = {
    paisesDb,
    serviciosDb
}