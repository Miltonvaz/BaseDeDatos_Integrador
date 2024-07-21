import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, createUser, deleteUser, loginUser, deleteLogicalUser, getEmpleados, getAdministradores, getClientes } from '../controllers/userController';
import { authMiddleware, authorizeRole } from '../../shared/middlewares/auth';
import upload from '../../shared/middlewares/uploadMiddleware';
const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

// Las rutas que requieren autenticación y autorización
userRoutes.get('/', authMiddleware, getAllUsers);
userRoutes.get('/empleados', authMiddleware, getEmpleados);
userRoutes.get('/administradores', authMiddleware, getAdministradores);
userRoutes.get('/clientes', authMiddleware,  getClientes);
userRoutes.get('/:user_id', authMiddleware, getUserById);
userRoutes.put('/:user_id', authMiddleware, authorizeRole(['Administrador', 'Empleado']), updateUser);
userRoutes.put('/deleted/:user_id', authMiddleware, authorizeRole(['Administrador', 'Empleado']), deleteLogicalUser);
userRoutes.delete('/:user_id', authMiddleware, authorizeRole(['Administrador', 'Empleado']), deleteUser);
userRoutes.post('/', upload.single('productImage'), createUser);

export default userRoutes;
