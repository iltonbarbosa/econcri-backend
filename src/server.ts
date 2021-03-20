import express from 'express';
import 'express-async-errors';
const errorHandler = require('../src/errors/handle.ts');
import cors from 'cors';

import './database';
import sessionsRoutes from '../src/sessions.routes';
import routes from './routes';

const app = express();


app.use(cors());
app.use(express.json());
app.use(sessionsRoutes);
app.use(routes);
app.use(errorHandler);



app.listen(process.env.PORT || 3000);

module.exports = app;