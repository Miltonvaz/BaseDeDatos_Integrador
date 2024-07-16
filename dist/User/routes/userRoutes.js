"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../../shared/middlewares/auth");
const userRoutes = (0, express_1.Router)();
userRoutes.post('/login', userController_1.loginUser);
userRoutes.get('/', auth_1.authMiddleware, userController_1.getAllUsers);
userRoutes.get('/:user_id', auth_1.authMiddleware, userController_1.getUserById);
userRoutes.put('/:user_id', auth_1.authMiddleware, userController_1.updateUser);
userRoutes.post('/', userController_1.createUser);
userRoutes.put('/deleted/:user_id', auth_1.authMiddleware, userController_1.deleteLogicalUser);
userRoutes.delete('/:user_id', auth_1.authMiddleware, userController_1.deleteUser);
exports.default = userRoutes;
