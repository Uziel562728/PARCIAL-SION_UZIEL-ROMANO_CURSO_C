import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const login = (req, res) => {
    const { username, password } = req.body;

    if (username !== config.authUser || password !== config.authPassword) {
        res.status(401).json({
            statusCode: 401,
            error: "Credenciales inválidas"
        });
        return;
    }

    const token = jwt.sign(
        {
            username: username
        },
        config.jwtSecret,
        {
            expiresIn: config.jwtExpiresIn
        }
    );

    res.status(200).json({
        token: token
    });
};