import Blockchain from './models/Blockchain.js';

export const blockchain = new Blockchain();
await blockchain.loadChainFromFile();
