const pedidoQueries = require('../queries/pedidos');
const carritoQueries = require('../queries/carrito');

// Realizar un pedido
exports.realizarPedido = async (req, res) => {
  const { clienteId } = req.body;

  try {
    // Validar clienteId
    if (!clienteId) {
      return res.status(400).json({ error: 'El clienteId es obligatorio.' });
    }

    // Crear pedido
    const pedidoId = await pedidoQueries.crearPedido(clienteId);

    // Obtener carrito del cliente
    const carrito = await carritoQueries.obtenerCarritoPorCliente(clienteId);

    // Validar que el carrito no esté vacío
    if (carrito.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío. Agrega productos antes de hacer un pedido.' });
    }

    // Agregar detalles del pedido
    const detalles = carrito.map(({ productoId, cantidad }) => ({ productoId, cantidad }));
    await pedidoQueries.agregarDetallesPedido(pedidoId, detalles);

    // Vaciar carrito
    await carritoQueries.vaciarCarrito(clienteId);

    res.status(201).json({ message: 'Pedido realizado correctamente.', pedidoId });
  } catch (error) {
    console.error('Error al realizar el pedido:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Obtener pedidos pendientes
exports.obtenerPedidosPendientes = async (req, res) => {
  try {
    const pedidos = await pedidoQueries.obtenerPedidosPendientes();
    res.json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos pendientes:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Marcar pedido como completado
exports.marcarPedidoComoCompletado = async (req, res) => {
  const { pedidoId } = req.params;

  try {
    await pedidoQueries.marcarPedidoComoCompletado(pedidoId);
    res.json({ message: 'Pedido marcado como completado.' });
  } catch (error) {
    console.error('Error al marcar pedido como completado:', error.message);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};