import {
    crearHabitacionRepository,
    listarHabitacionesRepository,
    buscarHabitacionPorIdRepository,
    actualizarHabitacionRepository,
    eliminarHabitacionRepository
} from "../repositories/habitacion.repository.js";

const obtenerFechaActual = () => {
    const fecha = new Date().toISOString().split("T")[0];
    return fecha;
};

const validarNombre = (nombre) => {
    let esValido = true;

    if (!nombre || nombre.trim() === "") {
        esValido = false;
    }

    return esValido;
};

const validarPlazas = (plazasDisponibles) => {
    let esValido = true;

    if (!Number.isInteger(plazasDisponibles) || plazasDisponibles < 0) {
        esValido = false;
    }

    return esValido;
};

export const crearHabitacionService = async (datos) => {
    const { nombre, plazasDisponibles, fechaAlta } = datos;

    if (!validarNombre(nombre)) {
        const error = new Error("El nombre no puede estar vacío");
        error.statusCode = 400;
        throw error;
    }

    if (!validarPlazas(plazasDisponibles)) {
        const error = new Error("plazasDisponibles debe ser un entero mayor o igual a cero");
        error.statusCode = 400;
        throw error;
    }

    const habitacion = await crearHabitacionRepository({
        nombre: nombre,
        plazasDisponibles: plazasDisponibles,
        fechaAlta: fechaAlta || obtenerFechaActual()
    });

    return habitacion;
};

export const listarHabitacionesService = async (disponible) => {
    const habitaciones = await listarHabitacionesRepository(disponible);
    return habitaciones;
};

export const obtenerHabitacionService = async (id) => {
    const habitacion = await buscarHabitacionPorIdRepository(id);

    if (!habitacion) {
        const error = new Error("Habitación no encontrada");
        error.statusCode = 404;
        throw error;
    }

    return habitacion;
};

export const actualizarHabitacionService = async (id, datos) => {
    const habitacionActual = await buscarHabitacionPorIdRepository(id);

    if (!habitacionActual) {
        const error = new Error("Habitación no encontrada");
        error.statusCode = 404;
        throw error;
    }

    if (datos.nombre !== undefined && !validarNombre(datos.nombre)) {
        const error = new Error("El nombre no puede estar vacío");
        error.statusCode = 400;
        throw error;
    }

    if (datos.plazasDisponibles !== undefined) {
        if (!validarPlazas(datos.plazasDisponibles)) {
            const error = new Error("plazasDisponibles debe ser un entero mayor o igual a cero");
            error.statusCode = 400;
            throw error;
        }

        const valorActual = habitacionActual.plazasDisponibles;
        const valorNuevo = datos.plazasDisponibles;

        if (valorNuevo !== valorActual && valorNuevo !== valorActual + 1) {
            const error = new Error("plazasDisponibles solo puede permanecer igual o incrementarse en 1");
            error.statusCode = 400;
            throw error;
        }
    }

    const habitacionActualizada = await actualizarHabitacionRepository(id, datos);

    return habitacionActualizada;
};

export const eliminarHabitacionService = async (id) => {
    const habitacion = await eliminarHabitacionRepository(id);

    if (!habitacion) {
        const error = new Error("Habitación no encontrada");
        error.statusCode = 404;
        throw error;
    }

    return habitacion;
};