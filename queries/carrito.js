const db = require('../config/database');

// Agregar producto al carrito
const agregarProductoAlCarrito = async (clienteId, productoId, cantidad) => {
  try {
    await db.query(
      'INSERT INTO Carritos (clienteId, productoId, cantidad) VALUES ($1, $2, $3)',
      [clienteId, productoId, cantidad]
    );
  } catch (error) {
    throw error;
  }
};

const obtenerCarritoPorCliente = async (clienteId) => {
  try {
    console.log(`Buscando carrito para clienteId: ${clienteId}`);
    const { rows } = await db.query(
      `SELECT c.id, p.nombre, p.precio, c.cantidad 
       FROM Carritos c
       JOIN Productos p ON c.productoId = p.id
       WHERE c.clienteId = $1`,
      [clienteId]
    );

    console.log(`Resultados del carrito:`, rows);

    if (!rows || rows.length === 0) {
      throw new Error('El carrito está vacío.');
    }

    return rows;
  } catch (error) {
    console.error('Error al obtener el carrito:', error.message);
    throw error;
  }
};

// Vaciar carrito de un cliente
const vaciarCarrito = async (clienteId) => {
  try {
    await db.query('DELETE FROM Carritos WHERE clienteId = $1', [clienteId]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  agregarProductoAlCarrito,
  obtenerCarritoPorCliente,
  vaciarCarrito,
};