import { Router } from "express";
import { getAllEvents,getEventById,createEvent,updateEvent,deleteEvent,deleteLogicalEvent } from "../controllers/calendarEventControllers";
import { authMiddleware } from "../../shared/middlewares/auth";
import { authorizeRole } from "../../shared/middlewares/auth";
const eventRoutes: Router = Router();

eventRoutes.get('/', getAllEvents);
eventRoutes.get('/:event_id', getEventById);
eventRoutes.post('/',authMiddleware, authorizeRole(['Administrador','Empleado']),createEvent);
eventRoutes.put('/:event_id',authMiddleware, authorizeRole(['Administrador','Empleado']), updateEvent);
eventRoutes.delete('/:event_id',authMiddleware,  authorizeRole(['Administrador','Empleado']),deleteEvent);
eventRoutes.put('/deleted/:event_id',authMiddleware, authorizeRole(['Administrador','Empleado']), deleteLogicalEvent);

export default eventRoutes;
