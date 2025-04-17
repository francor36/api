const mysql = require('mysql2');

// Crea una conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Nombre de usuario por defecto en XAMPP
  password: '',           // Contraseña vacía por defecto en XAMPP
  database: 'chat_db',  // Reemplaza con el nombre de tu base de datos
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos con ID: ' + connection.threadId);
});

module.exports = connection;
