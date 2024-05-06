export const config = () => {
    return {
        db: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            password: process.env.DB_PASSWORD,
            username: process.env.DB_USERNAME,
            db: process.env.DB_DATABASE            
        }
    }
}