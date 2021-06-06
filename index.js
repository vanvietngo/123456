const express = require('express');
const bodyParser = require('body-parser');
const othenToken = require('./middlewares/othenToken')


const router = require('./routers/router')
const port = 3000
const app = express();
// // -- swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// -- middleware --
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.urlencoded({ extended: false }))



app.use(bodyParser.json())  // for parsing application/json


app.use('/', router)
app.use('/uploaded_files', express.static('uploaded_files'))
//--


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


