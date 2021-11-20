import dotenv from "dotenv";
import path from "path";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * Your favorite port
     */
    port: process.env.PORT || 3000,

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || "silly",
    },
    api: {
        prefix: "/api/",
    },

    uploads: "uploads",
    thumbnails: path.join("uploads", "thumb"),
    db:{
        host:process.env.DB_HOST,
        user:process.env.POSTGRES_USER,
        password:process.env.POSTGRES_PASSWORD,
        database:process.env.POSTGRES_DB
    },
    application_name:"shopping-service",
    TOKEN_SECRET:process.env.TOKEN_SECRET||"hamda"
};
