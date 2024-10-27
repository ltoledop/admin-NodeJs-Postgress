// src/index.js
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import clientesRoutes from './router/clientesRoutes.js'; // Router de usuarios
import productosRoutes  from './router/productosRoutes.js'; // Router de usuarios
import usuariosRoutes  from './router/usuariosRoutes.js'; // Router de usuarios
import categoriasRoutes  from './router/categoriaRoutes.js'; // Router de usuarios
import proveedoresRoutes  from './router/proveedoresRoutes.js'; // Router de usuarios
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(join(__dirname, 'public')));

app.use('/clientes', clientesRoutes);
app.use('/productos', productosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/proveedores', proveedoresRoutes);
app.use('/uploads', express.static('src/uploads'));

// Ruta para mostrar el login
app.get('/login', (req, res) => {
  res.render('login');
});


app.get('/logout', (req, res) => {
  // Aquí deberías eliminar el token o la sesión del usuario
  res.redirect('/login');
});

app.listen(process.env.PORT || 3000, () => {
  console.log("El servidor está siendo escuchado en el puerto: ", process.env.PORT || 3000);
});
