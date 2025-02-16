const express = require('express');
const cors = require('cors');
const categoriaController = require('./controllers/categoriaController');
const productoController = require('./controllers/productoController');
const carritoController = require('./controllers/carritoController');
const pedidoController = require('./controllers/pedidoController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoints para categorías
app.get('/categorias', categoriaController.getAllCategorias);
app.post('/categorias', categoriaController.createCategoria);
app.put('/categorias/:id', categoriaController.updateCategoria);
app.delete('/categorias/:id', categoriaController.deleteCategoria);

// Endpoints para productos
app.get('/categorias/:categoriaId/productos', productoController.getProductosByCategoria);
app.post('/productos', productoController.createProducto);
app.put('/productos/:id', productoController.updateProducto);
app.delete('/productos/:id', productoController.deleteProducto);

// Endpoints para el carrito
app.post('/carrito', carritoController.agregarProductoAlCarrito);
app.get('/carrito/:clienteId', carritoController.obtenerCarritoPorCliente);
app.delete('/carrito/:clienteId', carritoController.vaciarCarrito);

// Endpoints para los pedidos
app.post('/pedidos', pedidoController.realizarPedido);
app.get('/pedidos/pendientes', pedidoController.obtenerPedidosPendientes);
app.put('/pedidos/:pedidoId/completado', pedidoController.marcarPedidoComoCompletado);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});