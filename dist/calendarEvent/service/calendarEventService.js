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
exports.EventService = void 0;
const CalendarEventRepository_1 = require("../repository/CalendarEventRepository");
const DateUtils_1 = require("../../shared/utils/DateUtils");
class EventService {
    static getAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CalendarEventRepository_1.EventRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener eventos: ${error.message}`);
            }
        });
    }
    static getEventById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CalendarEventRepository_1.EventRepository.findById(eventId);
            }
            catch (error) {
                throw new Error(`Error al encontrar el evento: ${error.message}`);
            }
        });
    }
    static addEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currentDate = new Date();
                event.created_at = DateUtils_1.DateUtils.formatDate(currentDate);
                event.updated_at = DateUtils_1.DateUtils.formatDate(currentDate);
                return yield CalendarEventRepository_1.EventRepository.createEvent(event);
            }
            catch (error) {
                throw new Error(`Error al crear evento: ${error.message}`);
            }
        });
    }
    static modifyEvent(eventId, eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventFound = yield CalendarEventRepository_1.EventRepository.findById(eventId);
                if (eventFound) {
                    if (eventData.title) {
                        eventFound.title = eventData.title;
                    }
                    if (eventData.start) {
                        eventFound.start = eventData.start;
                    }
                    if (eventData.end) {
                        eventFound.end = eventData.end;
                    }
                    if (eventData.updated_at) {
                        eventFound.updated_at = eventData.updated_at;
                    }
                    if (eventData.updated_by) {
                        eventFound.updated_by = eventData.updated_by;
                    }
                    if (eventData.deleted !== undefined) {
                        eventFound.deleted = eventData.deleted;
                    }
                    eventFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                    return yield CalendarEventRepository_1.EventRepository.updateEvent(eventId, eventFound);
                }
                return null;
            }
            catch (error) {
                throw new Error(`Error al actualizar evento: ${error.message}`);
            }
        });
    }
    static deleteEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CalendarEventRepository_1.EventRepository.deleteEvent(eventId);
            }
            catch (error) {
                throw new Error(`Error al eliminar evento: ${error.message}`);
            }
        });
    }
    static deleteEventLogic(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CalendarEventRepository_1.EventRepository.deleteEventLogic(eventId);
            }
            catch (error) {
                throw new Error(`Error al eliminar lógicamente evento: ${error.message}`);
            }
        });
    }
}
exports.EventService = EventService;
