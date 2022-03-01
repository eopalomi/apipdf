const express = require('express')
const app = express()
const port = process.env.PORT || 3500;
const path = require('path');

// Importamos el BodyPoder para leer la data(params, body) del EndPoint
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Parse para leer lo enviado en texto o html 
app.use(bodyParser.text({ type: 'text/html' }))


var fs = require('fs');
var pdf = require('html-pdf');
const parse = require('node-html-parser').parse;

var html = fs.readFileSync('demo.html', 'utf8');

var options = { format: 'Letter' };

// Función middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.post('/pdf', (require, response) => {
  /*fs.readFile('demo.html', 'utf8', (err,html)=>{
    if(err){
       throw err;
    }
 
    const root = parse(html);
 
    const body = root.querySelector('body');
    //body.set_content('<div id = "asdf"></div>');
    body.appendChild('<div id = "asdf">ESTO ES UNA PRUEBA DE INSERCION DE HTML</div>');
 
    console.log(root.toString()); // This you can write back to file!
  });
*/
  console.log("EL BODY",require.body);
  let filename = `${require.query.pdfname}.pdf`;

  pdf.create(require.body, options).toFile(`public/${filename}`, function(err, res) {
      if (err) return console.log(err);

      console.log(res); // { filename: '/app/businesscard.pdf' }
      
      response.json({
        valid: 'ok',
        file_name: filename,
        url: res.filename
      });
  });
})

app.listen(port, () => {
  console.log(`Escuchando en el puerto http://localhost:${port}`)
})