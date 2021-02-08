# Challenge para MercadoLibre
### Operación Fuego de Quasar
API REST de detección de objetos mediante triangulación y reconstrucción de mensajes.

### Stack
**Back-end**

- [NodeJS](https://nodejs.org/)
- [Express](http://expressjs.com/pt-br/)

### Instalación
**Desde la terminal:**
1. Descargar el proyecto:
`$ git clone https://github.com/aamaya85/challenge-meli.git`
2. Instalar las dependencias:
`$ npm install`
3. Levantar el servidor:
`$ npm start`

### Instalación
**Desde la terminal:**
1. Descargar el proyecto:
`$ git clone https://github.com/aamaya85/challenge-meli.git`
2. Instalar las dependencias:
`$ npm install`
3. Levantar el servidor:
`$ npm start`

El servidor está escuchando por default en el puerto 8080. Se puede cambiar esta configuración desde el archivo config.js:
```javascript
module.exports = {
  port: 8080
}
```

### Uso
Para probar los requests a los distintos end-points se recomienda el uso alguno de estas aplicaciones:
* Insomnia: https://insomnia.rest/
* Postman: https://www.postman.com/


**Endpoints:**
* POST -> /api/topsecret/
  * Recibe la información de los satélites y devuelve la posición y el contenido del mensaje original
  * Un ejemplo del payload sería el siguiente:
```javascript
{
    "satellites": [
    {
        "name": "kenobi",
        "distance": 100,
        "message": ["", "", "la", "", "", "puse", ""]
    },
    {
        "name": "skywalker",
        "distance": 115.5,
        "message": ["", "a", "", "", "le", "", "cuca"]
    },
    {
        "name": "sato",
        "distance": 142.7,
        "message": ["", "", "grande", "", "", ""]
    }]
}
```
  * La respuesta:
```javascript
  {
  "position": {
    "x": 2.33,
    "y": -2802.18
  },
  "message": "a la grande le puse cuca"
}
