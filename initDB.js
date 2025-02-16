const db = require('./config/database');

// Crear tabla Categorias
db.query(`
  CREATE TABLE IF NOT EXISTS Categorias (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT
  )
`)
  .then(() => console.log('Tabla Categorias creada correctamente.'))
  .catch((err) => console.error('Error al crear la tabla Categorias:', err.message))

  // Crear tabla Productos
  .then(() =>
    db.query(`
      CREATE TABLE IF NOT EXISTS Productos (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        precio NUMERIC NOT NULL CHECK (precio >= 0),
        categoriaId INTEGER REFERENCES Categorias(id) ON DELETE SET NULL
      )
    `)
  )
  .then(() => console.log('Tabla Productos creada correctamente.'))
  .catch((err) => console.error('Error al crear la tabla Productos:', err.message))

  // Crear tabla Pedidos
  .then(() =>
    db.query(`
      CREATE TABLE IF NOT EXISTS Pedidos (
        id SERIAL PRIMARY KEY,
        clienteId TEXT NOT NULL,
        estado TEXT NOT NULL DEFAULT 'pendiente',
        fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
  )
  .then(() => console.log('Tabla Pedidos creada correctamente.'))
  .catch((err) => console.error('Error al crear la tabla Pedidos:', err.message))

  // Crear tabla DetallesPedidos
  .then(() =>
    db.query(`
      CREATE TABLE IF NOT EXISTS DetallesPedidos (
        id SERIAL PRIMARY KEY,
        pedidoId INTEGER REFERENCES Pedidos(id) ON DELETE CASCADE,
        productoId INTEGER REFERENCES Productos(id) ON DELETE CASCADE,
        cantidad INTEGER NOT NULL CHECK (cantidad > 0)
      )
    `)
  )
  .then(() => console.log('Tabla DetallesPedidos creada correctamente.'))
  .catch((err) => console.error('Error al crear la tabla DetallesPedidos:', err.message))

  // Crear tabla Carritos
  .then(() =>
    db.query(`
      CREATE TABLE IF NOT EXISTS Carritos (
        id SERIAL PRIMARY KEY,
        clienteId TEXT NOT NULL,
        productoId INTEGER REFERENCES Productos(id) ON DELETE CASCADE,
        cantidad INTEGER NOT NULL CHECK (cantidad > 0)
      )
    `)
  )
  .then(() => console.log('Tabla Carritos creada correctamente.'))
  .catch((err) => console.error('Error al crear la tabla Carritos:', err.message))

  // Insertar datos iniciales
  .then(() =>
    db.query(`
      INSERT INTO Categorias (nombre, descripcion)
      VALUES ('Cafés', 'Variedad de cafés calientes y fríos.')
      ON CONFLICT (id) DO NOTHING;
    `)
  )
  .then(() => console.log('Datos iniciales insertados correctamente.'))
  .catch((err) => console.error('Error al insertar datos iniciales:', err.message));