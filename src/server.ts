import express from 'express';
// import js files with '.js'

const PORT = process.argv[2]; // 5001-3

const app = express();

app.use(express.json());
// app.use('/', blockchainRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
console.log('hello from myy scripts');
