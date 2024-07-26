"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (_req, res, _next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
};
exports.notFoundHandler = notFoundHandler;
