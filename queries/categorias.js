const db = require('../config/database');

// Obtener todas las categorías
const getAllCategorias = async () => {
  try {
    const { rows } = await db.query('SELECT * FROM Categorias');
    return rows;
  } catch (error) {
    throw error;
  }
};

// Obtener categoría por ID
const getCategoriaById = async (id) => {
  try {
    const { rows } = await db.query('SELECT * FROM Categorias WHERE id = $1', [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Crear una nueva categoría
const createCategoria = async (nombre, descripcion) => {
  try {
    const { rows } = await db.query(
      'INSERT INTO Categorias (nombre, descripcion) VALUES ($1, $2) RETURNING id',
      [nombre, descripcion]
    );
    return rows[0].id;
  } catch (error) {
    throw error;
  }
};

// Actualizar una categoría
const updateCategoria = async (id, nombre, descripcion) => {
  try {
    await db.query(
      'UPDATE Categorias SET nombre = $1, descripcion = $2 WHERE id = $3',
      [nombre, descripcion, id]
    );
  } catch (error) {
    throw error;
  }
};

// Eliminar una categoría
const deleteCategoria = async (id) => {
  try {
    await db.query('DELETE FROM Categorias WHERE id = $1', [id]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};