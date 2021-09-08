import db from "./database/db";
import app from './Server';
import logger from './shared/Logger';

// Init DB
let database = db;

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
