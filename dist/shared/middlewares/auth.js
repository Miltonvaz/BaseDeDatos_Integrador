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
exports.authorizeRole = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../../User/repositories/UserRepository");
const secretKey = process.env.SECRET || '';
const errorMessages = {
    noToken: 'No token provided',
    invalidToken: 'Invalid token',
    tokenExpired: 'Token expired',
    unauthorized: 'Unauthorized access'
};
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: errorMessages.noToken });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secretKey);
        console.log('Token payload:', payload);
        const user = yield UserRepository_1.UserRepository.findById(payload.user_id);
        if (!user) {
            console.log('User not found for token:', payload.user_id);
            return res.status(401).json({ message: errorMessages.invalidToken });
        }
        req.userData = payload;
        return next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.log('Token expired:', error);
            return res.status(401).json({ message: errorMessages.tokenExpired });
        }
        console.log('Token verification error:', error);
        return res.status(401).json({ message: errorMessages.unauthorized });
    }
});
exports.authMiddleware = authMiddleware;
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.userData) {
            console.log('User data not found in request');
            return res.status(401).json({ message: errorMessages.unauthorized });
        }
        try {
            const user = yield UserRepository_1.UserRepository.findById(req.userData.user_id);
            if (!user) {
                console.log('User not found for ID:', req.userData.user_id);
                return res.status(401).json({ message: errorMessages.unauthorized });
            }
            const userRoleName = getUserRoleName(user.role_id_fk);
            if (!userRoleName || !allowedRoles.includes(userRoleName)) {
                console.log('User role:', userRoleName, 'Allowed roles:', allowedRoles);
                return res.status(403).json({ message: 'Forbidden' });
            }
            return next();
        }
        catch (error) {
            console.log('Authorization error:', error);
            return res.status(401).json({ message: errorMessages.unauthorized });
        }
    });
};
exports.authorizeRole = authorizeRole;
function getUserRoleName(role_id_fk) {
    if (role_id_fk === undefined) {
        return null;
    }
    switch (role_id_fk) {
        case 1:
            return 'Administrador';
        case 2:
            return 'Empleado';
        case 3:
            return 'Usuario';
        default:
            return null;
    }
}
