"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendarEventControllers_1 = require("../controllers/calendarEventControllers");
const auth_1 = require("../../shared/middlewares/auth");
const auth_2 = require("../../shared/middlewares/auth");
const eventRoutes = (0, express_1.Router)();
eventRoutes.get('/', calendarEventControllers_1.getAllEvents);
eventRoutes.get('/:event_id', calendarEventControllers_1.getEventById);
eventRoutes.post('/', auth_1.authMiddleware, (0, auth_2.authorizeRole)(['Administrador', 'Empleado']), calendarEventControllers_1.createEvent);
eventRoutes.put('/:event_id', auth_1.authMiddleware, (0, auth_2.authorizeRole)(['Administrador', 'Empleado']), calendarEventControllers_1.updateEvent);
eventRoutes.delete('/:event_id', auth_1.authMiddleware, (0, auth_2.authorizeRole)(['Administrador', 'Empleado']), calendarEventControllers_1.deleteEvent);
eventRoutes.put('/deleted/:event_id', auth_1.authMiddleware, (0, auth_2.authorizeRole)(['Administrador', 'Empleado']), calendarEventControllers_1.deleteLogicalEvent);
exports.default = eventRoutes;
