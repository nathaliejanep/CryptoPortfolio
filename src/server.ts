import express from 'express';
import blockchainRouter from './routes/blockchain-routes.js';
import cryptoRouter from './routes/crypto-routes.js';
import memberRouter from './routes/member-routes.js';

const PORT = process.argv[2]; // 5001-3

const app = express();
app.use(express.json());
app.use('/api/v1/blockchain', blockchainRouter);
app.use('/api/v1/members', memberRouter);
app.use('/api/v1/crypto', cryptoRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
