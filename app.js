import express from 'express';
import pecaRoutes from './routes/pecaRoutes.js';
import loginRouter from './routes/loginRoutes.js';

const app = express();
app.use(express.json());

app.use('/pecas', pecaRoutes);
app.use('/auth', loginRouter);

export default app;
