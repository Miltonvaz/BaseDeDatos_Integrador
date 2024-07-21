import { Router } from "express";
import { getAllEvents,getEventById,createEvent,updateEvent,deleteEvent,deleteLogicalEvent } from "../controllers/calendarEventControllers";
import { authMiddleware } from "../../shared/middlewares/auth";
import { authorizeRole } from "../../shared/middlewares/auth";
const eventRoutes: Router = Router();

eventRoutes.get('/', getAllEvents);
eventRoutes.get('/:event_id', getEventById);
eventRoutes.post('/',  authorizeRole(['Administrador','Empleado']),authMiddleware,createEvent);
eventRoutes.put('/:event_id', authorizeRole(['Administrador','Empleado']),authMiddleware, updateEvent);
eventRoutes.delete('/:event_id',  authorizeRole(['Administrador','Empleado']),authMiddleware,deleteEvent);
eventRoutes.put('/deleted/:event_id', authorizeRole(['Administrador','Empleado']),authMiddleware, deleteLogicalEvent);

export default eventRoutes;
