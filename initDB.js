const db = require('./config/database');

// Crear tablas
db.query(`
  CREATE TABLE IF NOT EXISTS Categorias (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT
  )
`)
  .then(() => console.log('Tabla Categorias creada correctamente.'))
  .catch((err) => console.error('Error al crear la tabla Categorias:', err.message));

db.query(`
  CREATE TABLE IF NOT EXISTS Productos (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio NUMERIC NOT NULL CHECK (precio >= 0),
    categoriaId INTEGER REFERENCES Categorias(id) ON DELETE SET NULL
  )
`)
  .then(() => console.log('Tabla Productos creada correctamente.'))
  .catch((err) => console.error('Error al crear la tabla Productos:', err.message));

db.query(`
  CREATE TABLE IF NOT EXISTS Carritos (
    id SERIAL PRIMARY KEY,
    clienteId TEXT NOT NULL,
    productoId INTEGER REFERENCES Productos(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0)
  )
`)
  .then(() => console.log('Tabla Carritos creada correctamente.'))
  .catch((err) => console.error('Error al crear la tabla Carritos:', err.message));

db.query(`
  CREATE TABLE IF NOT EXISTS Pedidos (
    id SERIAL PRIMARY KEY,
    clienteId TEXT NOT NULL,
    estado TEXT NOT NULL DEFAULT 'pendiente',
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`)
  .then(() => console.log('Tabla Pedidos creada correctamente.'))
  .catch((err) => console.error('Error al crear la tabla Pedidos:', err.message));

db.query(`
  CREATE TABLE IF NOT EXISTS DetallesPedidos (
    id SERIAL PRIMARY KEY,
    pedidoId INTEGER REFERENCES Pedidos(id) ON DELETE CASCADE,
    productoId INTEGER REFERENCES Productos(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0)
  )
`)
  .then(() => console.log('Tabla DetallesPedidos creada correctamente.'))
  .catch((err) => console.error('Error al crear la tabla DetallesPedidos:', err.message));

// Insertar datos iniciales
const insertarDatosIniciales = async () => {
  try {
    await db.query(
      `INSERT INTO Categorias (nombre, descripcion)
       SELECT $1, $2
       WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE nombre = $1)`,
      ['Cafés', 'Variedad de cafés calientes y fríos.']
    );
    await db.query(
      `INSERT INTO Categorias (nombre, descripcion)
       SELECT $1, $2
       WHERE NOT EXISTS (SELECT 1 FROM Categorias WHERE nombre = $1)`,
      ['Tés', 'Tés calientes y fríos de diferentes sabores.']
    );

    const categoriaCafe = await db.query("SELECT id FROM Categorias WHERE nombre = $1", ['Cafés']);
    const categoriaTe = await db.query("SELECT id FROM Categorias WHERE nombre = $1", ['Tés']);

    await db.query(
      `INSERT INTO Productos (nombre, descripcion, precio, categoriaId)
       SELECT $1, $2, $3, $4
       WHERE NOT EXISTS (SELECT 1 FROM Productos WHERE nombre = $1)`,
      ['Café Americano', 'Café negro preparado con agua caliente.', 2.5, categoriaCafe.rows[0].id]
    );
    await db.query(
      `INSERT INTO Productos (nombre, descripcion, precio, categoriaId)
       SELECT $1, $2, $3, $4
       WHERE NOT EXISTS (SELECT 1 FROM Productos WHERE nombre = $1)`,
      ['Café Latte', 'Café espresso con leche vaporizada.', 3.5, categoriaCafe.rows[0].id]
    );

    console.log('Datos iniciales insertados correctamente.');
  } catch (err) {
    console.error('Error al insertar datos iniciales:', err.message);
  }
};

insertarDatosIniciales();