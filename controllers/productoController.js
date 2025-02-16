const productoQueries = require('../queries/productos.js');

//Exporta la funcion que pide los productos de una categoria y pide como parametros el id de la 
//categoria si es correcto llama a una funcion y se le pasa el id de la categoria y envia la respues
//si falla envia un error 500
exports.getProductosByCategoria = async (req, res) => {
  const { categoriaId } = req.params;
  try {
    const productos = await productoQueries.getProductosByCategoria(categoriaId);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//exporta la funcion que me crea un producto y pide nombre, descripcion, precio y el id de la categoria
//si es correcto me crea el producto y me trae una respuesta 201 con los atributos del productos
//sino un error 500
exports.createProducto = async (req, res) => {
  const { nombre, descripcion, precio, categoriaId } = req.body;
  try {
    const id = await productoQueries.createProducto(nombre, descripcion, precio, categoriaId);
    res.status(201).json({ id, nombre, descripcion, precio, categoriaId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//exporta una funcion que lo que hace es pedir un id de un producto y los datos de dicho producto 
//llama a una funcion que me actualiza todos los datos de dicho producto mediante el id 
//si es incorrecto me arroja un error 500 
exports.updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoriaId } = req.body;
  try {
    await productoQueries.updateProducto(id, nombre, descripcion, precio, categoriaId);
    res.json({ message: 'Producto actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//exporta una funcion que pide como parametros el id del producto 
//si es correcto me sale un mensaje ('Producto eliminado correctamente.')
//y si no me devuelve un error 500
exports.deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await productoQueries.deleteProducto(id);
    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};