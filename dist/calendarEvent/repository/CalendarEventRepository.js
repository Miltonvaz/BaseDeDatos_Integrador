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
exports.EventRepository = void 0;
const database_1 = __importDefault(require("../../shared/config/database"));
class EventRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM event WHERE deleted = 0';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const events = results;
                        resolve(events);
                    }
                });
            });
        });
    }
    static findById(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM event WHERE calendarEvent_id = ? AND deleted = 0';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [event_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const events = results;
                        if (events.length > 0) {
                            resolve(events[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const { start, end, title, purchaseOrder_id_fk, created_at, created_by, updated_at, updated_by, deleted } = event;
            const query = `INSERT INTO event (start, end, title, purchaseOrder_id_fk, created_at, created_by, updated_at, updated_by, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [start, end, title, purchaseOrder_id_fk, created_at, created_by, updated_at, updated_by, deleted ? 1 : 0];
            return new Promise((resolve, reject) => {
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createEventId = result.insertId;
                        const createdEvent = Object.assign(Object.assign({}, event), { calendarEvent_id: createEventId });
                        resolve(createdEvent);
                    }
                });
            });
        });
    }
    static updateEvent(eventId, eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { start, end, title, updated_at, updated_by, deleted } = eventData;
            const query = `UPDATE event SET start = ?, end = ?, title = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE calendarEvent_id = ?`;
            const values = [start, end, title, updated_at, updated_by, deleted ? 1 : 0, eventId];
            return new Promise((resolve, reject) => {
                database_1.default.query(query, values, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(Object.assign(Object.assign({}, eventData), { calendarEvent_id: eventId }));
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deleteEvent(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM event WHERE calendarEvent_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [event_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
    static deleteEventLogic(event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE event SET deleted = 1 WHERE calendarEvent_id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.query(query, [event_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
}
exports.EventRepository = EventRepository;
