import app from './app/app';
import databaseConnection from './database/database.connection';

const PORT = process.env.PORT || 4000;

databaseConnection
    .then(() => app.listen(PORT))
    .catch(console.error);
