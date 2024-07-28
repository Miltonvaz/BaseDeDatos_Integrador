"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLogicalUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getClientes = exports.getAdministradores = exports.getEmpleados = exports.getUserById = exports.getAllUsers = exports.loginUser = void 0;
const userService_1 = require("../services/userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../../shared/middlewares/auth");
const secretKey = process.env.SECRET || '';
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield userService_1.UserService.login(email, password);
        if (!token) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Decodifica el token para obtener el payload
        const payload = jsonwebtoken_1.default.verify(token, secretKey);
        return res.status(200).json({
            token,
            user_id: payload.user_id,
            role: payload.role_id_fk // Incluye el role en la respuesta
        });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginUser = loginUser;
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService_1.UserService.getAllUsers();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.user_id, 10);
    try {
        const user = yield userService_1.UserService.getUserById(userId);
        if (user) {
            return res.status(200).json(user);
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getUserById = getUserById;
const getEmpleados = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empleados = yield userService_1.UserService.getEmpleados();
        return res.status(200).json(empleados);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getEmpleados = getEmpleados;
const getAdministradores = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const administradores = yield userService_1.UserService.getAdministradores();
        return res.status(200).json(administradores);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAdministradores = getAdministradores;
const getClientes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield userService_1.UserService.getClientes();
        return res.status(200).json(clientes);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getClientes = getClientes;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, first_name, last_name, role_id_fk } = req.body;
        if (!email || !password || !first_name || !last_name || !role_id_fk) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const exists = yield userService_1.UserService.userExists(email);
        if (exists) {
            return res.status(409).json({ message: 'User already exists' });
        }
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const newUser = yield userService_1.UserService.addUser(req.body, req.file);
        console.log(newUser.url);
        return res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error en createUser:', error);
        return res.status(500).json({ message: `Error al crear usuario: ${error.message}` });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_1.authorizeRole)(['Administrador', 'Empleado'])(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = parseInt(req.params.user_id, 10);
        try {
            const updatedUser = yield userService_1.UserService.modifyUser(userId, req.body);
            if (updatedUser) {
                return res.status(200).json(updatedUser);
            }
            else {
                return res.status(404).json({ message: 'User not found or could not be updated' });
            }
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }));
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_1.authorizeRole)(['Administrador', 'Empleado'])(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = parseInt(req.params.user_id, 10);
        try {
            const deleted = yield userService_1.UserService.deleteUser(userId);
            if (deleted) {
                return res.status(200).json({ message: 'User deleted successfully' });
            }
            else {
                return res.status(404).json({ message: 'User not found or could not be deleted' });
            }
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }));
});
exports.deleteUser = deleteUser;
const deleteLogicalUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, auth_1.authorizeRole)(['Administrador', 'Empleado'])(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = parseInt(req.params.user_id, 10);
        try {
            const success = yield userService_1.UserService.deleteUserLogic(userId);
            if (success) {
                return res.status(200).json({ message: 'User logically deleted successfully' });
            }
            else {
                return res.status(404).json({ message: 'User not found or already logically deleted' });
            }
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }));
});
exports.deleteLogicalUser = deleteLogicalUser;
