import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const RUTA_DATABASE = path.join(process.cwd(), "database.json");

const inicializarDatabase = async () => {
    try {
        await fs.access(RUTA_DATABASE);
    } catch (error) {
        const contenidoInicial = {
            habitaciones: []
        };

        await fs.writeFile(RUTA_DATABASE, JSON.stringify(contenidoInicial, null, 2));
    }
};

const leerDatabase = async () => {
    await inicializarDatabase();

    const contenido = await fs.readFile(RUTA_DATABASE, "utf8");

    if (!contenido) {
        return {
            habitaciones: []
        };
    }

    return JSON.parse(contenido);
};

const escribirDatabase = async (database) => {
    await fs.writeFile(RUTA_DATABASE, JSON.stringify(database, null, 2));
};

export const crearHabitacionRepository = async (datos) => {
    const database = await leerDatabase();

    const habitacion = {
        id: crypto.randomUUID(),
        ...datos
    };

    database.habitaciones.push(habitacion);

    await escribirDatabase(database);

    return habitacion;
};

export const listarHabitacionesRepository = async (disponible) => {
    const database = await leerDatabase();

    let habitaciones = database.habitaciones;

    if (disponible === "true") {
        habitaciones = habitaciones.filter((habitacion) => {
            return habitacion.plazasDisponibles > 0;
        });
    }

    return habitaciones;
};

export const buscarHabitacionPorIdRepository = async (id) => {
    const database = await leerDatabase();

    const habitacion = database.habitaciones.find((habitacion) => {
        return habitacion.id === id;
    });

    return habitacion;
};

export const actualizarHabitacionRepository = async (id, datos) => {
    const database = await leerDatabase();

    const posicion = database.habitaciones.findIndex((habitacion) => {
        return habitacion.id === id;
    });

    let habitacionActualizada = null;

    if (posicion !== -1) {
        database.habitaciones[posicion] = {
            ...database.habitaciones[posicion],
            ...datos
        };

        habitacionActualizada = database.habitaciones[posicion];

        await escribirDatabase(database);
    }

    return habitacionActualizada;
};

export const eliminarHabitacionRepository = async (id) => {
    const database = await leerDatabase();

    const posicion = database.habitaciones.findIndex((habitacion) => {
        return habitacion.id === id;
    });

    let habitacionEliminada = null;

    if (posicion !== -1) {
        habitacionEliminada = database.habitaciones.splice(posicion, 1)[0];

        await escribirDatabase(database);
    }

    return habitacionEliminada;
};