const db = require('../config/database');

// Agregar producto al carrito
const agregarProductoAlCarrito = (clienteId, productoId, cantidad) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Carritos (clienteId, productoId, cantidad) VALUES (?, ?, ?)',
      [clienteId, productoId, cantidad],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Obtener carrito de un cliente
const obtenerCarritoPorCliente = (clienteId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT c.id, p.nombre, p.precio, c.cantidad 
       FROM Carritos c
       JOIN Productos p ON c.productoId = p.id
       WHERE c.clienteId = ?`,
      [clienteId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

// Vaciar carrito de un cliente
const vaciarCarrito = (clienteId) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Carritos WHERE clienteId = ?', [clienteId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  agregarProductoAlCarrito,
  obtenerCarritoPorCliente,
  vaciarCarrito,
};