const carritoQueries = require('../queries/carrito');

exports.agregarProductoAlCarrito = async (req, res) => {
  const { clienteId, productoId, cantidad } = req.body;
  try {
    await carritoQueries.agregarProductoAlCarrito(clienteId, productoId, cantidad);
    res.status(201).json({ message: 'Producto agregado al carrito.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerCarritoPorCliente = async (req, res) => {
  const { clienteId } = req.params;
  try {
    const carrito = await carritoQueries.obtenerCarritoPorCliente(clienteId);
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.vaciarCarrito = async (req, res) => {
  const { clienteId } = req.params;
  try {
    await carritoQueries.vaciarCarrito(clienteId);
    res.json({ message: 'Carrito vaciado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};