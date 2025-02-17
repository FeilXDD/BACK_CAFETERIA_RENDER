const db = require('../config/database');

// Crear un nuevo pedido
const crearPedido = async (clienteId) => {
  try {
    const { rows } = await db.query(
      'INSERT INTO Pedidos (clienteId) VALUES ($1) RETURNING id',
      [clienteId]
    );
    return rows[0].id;
  } catch (error) {
    console.error('Error al crear pedido:', error.message);
    throw error;
  }
};

// Agregar detalles del pedido
const agregarDetallesPedido = async (pedidoId, detalles) => {
  try {
    // Construir la consulta dinámica para múltiples inserciones
    const values = detalles.map(({ productoId, cantidad }, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(', ');
    const params = detalles.flatMap(({ productoId, cantidad }) => [pedidoId, productoId, cantidad]);

    await db.query(
      `INSERT INTO DetallesPedidos (pedidoId, productoId, cantidad) VALUES ${values}`,
      params
    );
  } catch (error) {
    console.error('Error al agregar detalles del pedido:', error.message);
    throw error;
  }
};

// Obtener pedidos pendientes
const obtenerPedidosPendientes = async () => {
  try {
    const { rows } = await db.query('SELECT * FROM Pedidos WHERE estado = $1', ['pendiente']);
    return rows;
  } catch (error) {
    console.error('Error al obtener pedidos pendientes:', error.message);
    throw error;
  }
};

// Marcar pedido como completado
const marcarPedidoComoCompletado = async (pedidoId) => {
  try {
    await db.query('UPDATE Pedidos SET estado = $1 WHERE id = $2', ['completado', pedidoId]);
  } catch (error) {
    console.error('Error al marcar pedido como completado:', error.message);
    throw error;
  }
};

module.exports = {
  crearPedido,
  agregarDetallesPedido,
  obtenerPedidosPendientes,
  marcarPedidoComoCompletado,
};