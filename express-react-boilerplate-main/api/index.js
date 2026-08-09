import path from 'path';
import app from '../server/config/express';
import routes from '../server/routes/index.route';
import swagger from '../server/config/swagger';
import * as errorHandler from '../server/middlewares/errorHandler';
import joiErrorHandler from '../server/middlewares/joiErrorHandler';
import requestLogger from '../server/middlewares/requestLogger';

// Swagger API documentation
app.get('/swagger.json', (req, res) => {
    res.json(swagger);
});

// Request logger
app.use(requestLogger);

// Router
app.use('/api', routes);

// Landing page (client-side routes fall back to index.html)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Joi Error Handler Middleware
app.use(joiErrorHandler);

// Error Handler Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);
app.use(errorHandler.methodNotAllowed);

export default app;
