import { Router } from "express";
import {
    crearHabitacion,
    listarHabitaciones,
    obtenerHabitacion,
    actualizarHabitacion,
    eliminarHabitacion
} from "../controllers/habitacion.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", crearHabitacion);
router.get("/", listarHabitaciones);
router.get("/:id", obtenerHabitacion);
router.put("/:id", authMiddleware, actualizarHabitacion);
router.delete("/:id", authMiddleware, eliminarHabitacion);

export { router as habitacionRouter };