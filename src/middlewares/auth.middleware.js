import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({
            statusCode: 401,
            error: "Token requerido"
        });
        return;
    }

    if (!authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            statusCode: 401,
            error: "Formato de token inválido"
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const usuario = jwt.verify(token, config.jwtSecret);

        req.user = usuario;

        next();
    } catch (error) {
        res.status(401).json({
            statusCode: 401,
            error: "Token inválido o vencido"
        });
    }
};