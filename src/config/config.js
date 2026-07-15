export const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
    authUser: process.env.AUTH_USER,
    authPassword: process.env.AUTH_PASSWORD,
    dbProvider: process.env.DB_PROVIDER || "json"
};