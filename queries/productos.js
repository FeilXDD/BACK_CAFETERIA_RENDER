const db = require('../config/database');

//obtiene todos los productos de una categoria mediante el id
const getProductosByCategoria = (categoriaId) => {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM Productos WHERE categoriaId = ?',
      [categoriaId],
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

//Crea un producto y pide el nombre, la descripcion, el precio y el id a que categoria pertenece
const createProducto = (nombre, descripcion, precio, categoriaId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Productos (nombre, descripcion, precio, categoriaId) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, precio, categoriaId],
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

//Actualiza el producto mediante el id del producto y el id de la categoria
const updateProducto = (id, nombre, descripcion, precio, categoriaId) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, categoriaId = ? WHERE id = ?',
      [nombre, descripcion, precio, categoriaId, id],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

//Elimina el producto mediante el id
const deleteProducto = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Productos WHERE id = ?', [id], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

//se exporta los queries
module.exports = {
  getProductosByCategoria,
  createProducto,
  updateProducto,
  deleteProducto,
};