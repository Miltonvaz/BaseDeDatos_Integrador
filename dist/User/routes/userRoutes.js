"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../../shared/middlewares/auth");
const uploadMiddleware_1 = __importDefault(require("../../shared/middlewares/uploadMiddleware"));
const userRoutes = (0, express_1.Router)();
userRoutes.post('/login', userController_1.loginUser);
userRoutes.get('/', auth_1.authMiddleware, userController_1.getAllUsers);
userRoutes.get('/empleados', auth_1.authMiddleware, userController_1.getEmpleados);
userRoutes.get('/administradores', auth_1.authMiddleware, userController_1.getAdministradores);
userRoutes.get('/clientes', auth_1.authMiddleware, userController_1.getClientes);
userRoutes.get('/:u ser_id', auth_1.authMiddleware, userController_1.getUserById);
userRoutes.put('/:user_id', auth_1.authMiddleware, (0, auth_1.authorizeRole)(['Administrador', 'Empleado']), userController_1.updateUser);
userRoutes.put('/deleted/:user_id', auth_1.authMiddleware, (0, auth_1.authorizeRole)(['Administrador', 'Empleado']), userController_1.deleteLogicalUser);
userRoutes.delete('/:user_id', auth_1.authMiddleware, (0, auth_1.authorizeRole)(['Administrador', 'Empleado']), userController_1.deleteUser);
userRoutes.post('/', uploadMiddleware_1.default.single('userImage'), userController_1.createUser);
exports.default = userRoutes;
