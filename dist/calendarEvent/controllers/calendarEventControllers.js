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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLogicalEvent = exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEventById = exports.getAllEvents = void 0;
const calendarEventService_1 = require("../service/calendarEventService");
const auth_1 = require("../../shared/middlewares/auth");
const getAllEvents = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield calendarEventService_1.EventService.getAllEvents();
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllEvents = getAllEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = parseInt(req.params.event_id, 10);
        const event = yield calendarEventService_1.EventService.getEventById(eventId);
        if (event) {
            res.status(200).json(event);
        }
        else {
            res.status(404).json({ message: 'Evento no encontrado.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getEventById = getEventById;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_1.authorizeRole)(['Administrador'])(req, res, () => { });
        const newEvent = yield calendarEventService_1.EventService.addEvent(req.body);
        res.status(201).json(newEvent);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_1.authorizeRole)(['Administrador', 'Empleado'])(req, res, () => { });
        const eventId = parseInt(req.params.event_id, 10);
        const updatedEvent = yield calendarEventService_1.EventService.modifyEvent(eventId, req.body);
        if (updatedEvent) {
            res.status(200).json(updatedEvent);
        }
        else {
            res.status(404).json({ message: 'Evento no encontrado o no se pudo actualizar.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_1.authorizeRole)(['Administrador', 'Empleado'])(req, res, () => { });
        const eventId = parseInt(req.params.event_id, 10);
        const deleted = yield calendarEventService_1.EventService.deleteEvent(eventId);
        if (deleted) {
            res.status(200).json({ message: 'Evento eliminado correctamente.' });
        }
        else {
            res.status(404).json({ message: 'Evento no encontrado o no se pudo eliminar.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteEvent = deleteEvent;
const deleteLogicalEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, auth_1.authorizeRole)(['Administrador', 'Empleado'])(req, res, () => { });
        const eventId = parseInt(req.params.event_id, 10);
        const success = yield calendarEventService_1.EventService.deleteEventLogic(eventId);
        if (success) {
            res.status(200).json({ message: 'Evento eliminado lógicamente correctamente.' });
        }
        else {
            res.status(404).json({ message: 'Evento no encontrado o ya eliminado lógicamente.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteLogicalEvent = deleteLogicalEvent;
