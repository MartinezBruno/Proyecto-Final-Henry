[![GitHub Actions Demo](https://github.com/MartinezBruno/Proyecto-Final-Henry/actions/workflows/github-actions-demo.yml/badge.svg)](https://github.com/MartinezBruno/Proyecto-Final-Henry/actions/workflows/github-actions-demo.yml)

# Proyecto-Final-Henry

## BackEnd

- Crear archivo `.env` en la raiz de la carpeta `/api`
```
DB_USER="tuNombreDeUsuario"
DB_PASSWORD="tuContraseña"
DB_HOST="localhost"
DB_NAME="elNombreDeTuBaseDeDatos"
DB_PORT=3001 #Este es el puerto en donde se creara el backend
ACCESS_TOKEN=APP_USR-1386640728698717-050600-06da3239fa6e054eb0efc33b54a0ab9d-1118868399 
#Este access_token es el que se utilizará para la pasarela de pago
```

```
npm install 
npm start
```
>`npm install --force` en caso de que ocurra algun error a la hora de la instalación <br/>

###### Utiliza estas credenciales a la hora de realizar el pago por MercadoPago
```
{
  "Numero de tarjeta": 5031 7557 3453 0604,
  "Fecha de vencimiento": "11/25",
  "Codigo de seguridad": 123,
  "Email": "test_user_51106251@testuser.com"
}
```

---

### Los endpoint para nuestra API son:

- [Endpoints](https://github.com/MartinezBruno/Proyecto-Final-Henry/files/8765264/Endpoints.pdf)

- [Endpoints para administrador](https://github.com/MartinezBruno/Proyecto-Final-Henry/files/8765267/Endpoint.Admin.pdf) 
> Haga click para descargar

---

## FrontEnd

- Parado en la raiz de la carpeta `/client` ejecutar: 
```
npm install
npm start
```
