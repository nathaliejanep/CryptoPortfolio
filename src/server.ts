import express from 'express';
import { Request, Response, NextFunction } from 'express';

import blockchainRouter from './routes/blockchain-routes.js';
import cryptoRouter from './routes/crypto-routes.js';
import memberRouter from './routes/member-routes.js';
import ErrorResponse from './models/ErrorResponse.js';
import errorHandler from './middleware/errorHandler.js';

const PORT = process.argv[2]; // 5001-3

const app = express();
app.use(express.json());

app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/members', memberRouter);
app.use('/api/v1/crypto', cryptoRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new ErrorResponse(404, `Kunde inte hitta resursen ${req.originalUrl}`));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
