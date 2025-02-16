const db = require('../config/database');

// Obtener productos por categoría
const getProductosByCategoria = async (categoriaId) => {
  try {
    const { rows } = await db.query('SELECT * FROM Productos WHERE categoriaId = $1', [categoriaId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo producto
const createProducto = async (nombre, descripcion, precio, categoriaId) => {
  try {
    const { rows } = await db.query(
      'INSERT INTO Productos (nombre, descripcion, precio, categoriaId) VALUES ($1, $2, $3, $4) RETURNING id',
      [nombre, descripcion, precio, categoriaId]
    );
    return rows[0].id;
  } catch (error) {
    throw error;
  }
};

// Actualizar un producto
const updateProducto = async (id, nombre, descripcion, precio, categoriaId) => {
  try {
    await db.query(
      'UPDATE Productos SET nombre = $1, descripcion = $2, precio = $3, categoriaId = $4 WHERE id = $5',
      [nombre, descripcion, precio, categoriaId, id]
    );
  } catch (error) {
    throw error;
  }
};

// Eliminar un producto
const deleteProducto = async (id) => {
  try {
    await db.query('DELETE FROM Productos WHERE id = $1', [id]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProductosByCategoria,
  createProducto,
  updateProducto,
  deleteProducto,
};