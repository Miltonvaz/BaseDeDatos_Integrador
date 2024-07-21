import { Request, Response } from 'express';
import { EventService } from '../service/calendarEventService';
import { authorizeRole } from '../../shared/middlewares/auth'; 

export const getAllEvents = async (_req: Request, res: Response) => {
    try {
        const events = await EventService.getAllEvents();
        res.status(200).json(events);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.event_id, 10);
        const event = await EventService.getEventById(eventId);
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: 'Evento no encontrado.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        await authorizeRole(['Administrador'])(req, res, () => {});

        const newEvent = await EventService.addEvent(req.body);
        res.status(201).json(newEvent);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        await authorizeRole(['Administrador','Empleado'])(req, res, () => {});

        const eventId = parseInt(req.params.event_id, 10);
        const updatedEvent = await EventService.modifyEvent(eventId, req.body);
        if (updatedEvent) {
            res.status(200).json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Evento no encontrado o no se pudo actualizar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        await authorizeRole(['Administrador','Empleado'])(req, res, () => {});

        const eventId = parseInt(req.params.event_id, 10);
        const deleted = await EventService.deleteEvent(eventId);
        if (deleted) {
            res.status(200).json({ message: 'Evento eliminado correctamente.' });
        } else {
            res.status(404).json({ message: 'Evento no encontrado o no se pudo eliminar.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteLogicalEvent = async (req: Request, res: Response) => {
    try {
        await authorizeRole(['Administrador','Empleado'])(req, res, () => {});

        const eventId = parseInt(req.params.event_id, 10);
        const success = await EventService.deleteEventLogic(eventId);
        if (success) {
            res.status(200).json({ message: 'Evento eliminado lógicamente correctamente.' });
        } else {
            res.status(404).json({ message: 'Evento no encontrado o ya eliminado lógicamente.' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
