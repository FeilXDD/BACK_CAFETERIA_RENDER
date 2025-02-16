const pedidoQueries = require('../queries/pedidos');
const carritoQueries = require('../queries/carrito');

exports.realizarPedido = async (req, res) => {
  const { clienteId } = req.body;
  try {
    // Crear pedido
    const pedidoId = await pedidoQueries.crearPedido(clienteId);

    // Obtener carrito del cliente
    const carrito = await carritoQueries.obtenerCarritoPorCliente(clienteId);

    // Agregar detalles del pedido
    const detalles = carrito.map(({ productoId, cantidad }) => ({ productoId, cantidad }));
    await pedidoQueries.agregarDetallesPedido(pedidoId, detalles);

    // Vaciar carrito
    await carritoQueries.vaciarCarrito(clienteId);

    res.status(201).json({ message: 'Pedido realizado correctamente.', pedidoId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerPedidosPendientes = async (req, res) => {
  try {
    const pedidos = await pedidoQueries.obtenerPedidosPendientes();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.marcarPedidoComoCompletado = async (req, res) => {
  const { pedidoId } = req.params;
  try {
    await pedidoQueries.marcarPedidoComoCompletado(pedidoId);
    res.json({ message: 'Pedido marcado como completado.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};