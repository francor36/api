const express = require('express');
const app = express();
const db = require('./db'); // Importamos la conexión a la base de datos

// Middleware para parsear las solicitudes JSON
app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error al consultar la base de datos:', err);
      return res.status(500).send('Error al consultar la base de datos');
    }
    res.json(results);  // Devuelve los resultados en formato JSON
  });
});
app.get('/api/usuarios/:id', (req, res) => {
  const usuarioId = req.params.id;
  db.query('SELECT * FROM usuarios WHERE id = ?', [usuarioId], (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener el usuario');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Usuario no encontrado');
      return;
    }
    res.json(results[0]);
  });
});

// Ruta para agregar un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, correo } = req.body;
  db.query('INSERT INTO usuarios (nombre, correo) VALUES (?, ?)', [nombre, correo], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
      return res.status(500).send('Error al insertar el usuario');
    }
    res.status(201).send('Usuario agregado');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.put('/api/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;  // Obtiene el id de la URL
    const { nombre, correo } = req.body;  // Obtiene los nuevos datos del cuerpo de la solicitud
  
    // Realiza la consulta para actualizar el usuario en la base de datos
    db.query('UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?', [nombre, correo, usuarioId], (err, result) => {
      if (err) {
        console.error('Error al actualizar el usuario:', err);
        res.status(500).send('Hubo un error al actualizar el usuario');
      } else {
        if (result.affectedRows === 0) {
          res.status(404).send('Usuario no encontrado');
        } else {
          res.status(200).send('Usuario actualizado correctamente');
        }
      }
    });
  });
  app.delete('/api/usuarios/:id', (req, res) => {
    const usuarioId = req.params.id;
  
    db.query('DELETE FROM usuarios WHERE id = ?', [usuarioId], (err, result) => {
      if (err) {
        console.error('Error al eliminar el usuario:', err);
        return res.status(500).send('Error del servidor');
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).send('Usuario no encontrado');
      }
  
      res.send('Usuario eliminado correctamente');
    });
  });
  
  