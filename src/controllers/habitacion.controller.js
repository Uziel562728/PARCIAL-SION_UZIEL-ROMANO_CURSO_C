import {
    crearHabitacionService,
    listarHabitacionesService,
    obtenerHabitacionService,
    actualizarHabitacionService,
    eliminarHabitacionService
} from "../services/habitacion.service.js";

const responderError = (res, error) => {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        statusCode: statusCode,
        error: error.message
    });
};

export const crearHabitacion = async (req, res) => {
    try {
        const habitacion = await crearHabitacionService(req.body);

        res.status(201).json(habitacion);
    } catch (error) {
        responderError(res, error);
    }
};

export const listarHabitaciones = async (req, res) => {
    try {
        const habitaciones = await listarHabitacionesService(req.query.disponible);

        res.status(200).json(habitaciones);
    } catch (error) {
        responderError(res, error);
    }
};

export const obtenerHabitacion = async (req, res) => {
    try {
        const habitacion = await obtenerHabitacionService(req.params.id);

        res.status(200).json(habitacion);
    } catch (error) {
        responderError(res, error);
    }
};

export const actualizarHabitacion = async (req, res) => {
    try {
        const habitacion = await actualizarHabitacionService(req.params.id, req.body);

        res.status(200).json(habitacion);
    } catch (error) {
        responderError(res, error);
    }
};

export const eliminarHabitacion = async (req, res) => {
    try {
        await eliminarHabitacionService(req.params.id);

        res.status(200).json({
            message: "Habitación eliminada correctamente"
        });
    } catch (error) {
        responderError(res, error);
    }
};