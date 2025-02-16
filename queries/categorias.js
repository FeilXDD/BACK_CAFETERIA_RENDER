const db = require('../config/database');

//obtiene todas las categoria
const getAllCategorias = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM Categorias', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//obtiene una categoria mediante el id
const getCategoriaById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Categorias WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

//Crea un producto y pide el nombre y la descripcion
const createCategoria = (nombre, descripcion) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO Categorias (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion],
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

//Actualiza el producto mediante el id de la categoria
const updateCategoria = (id, nombre, descripcion) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE Categorias SET nombre = ?, descripcion = ? WHERE id = ?',
      [nombre, descripcion, id],
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

//Elimina una categoria mediante el id
const deleteCategoria = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM Categorias WHERE id = ?', [id], (err) => {
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
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};