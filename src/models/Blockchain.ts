import { createHash } from '../utils/crypto-lib.js';
import FileHandler from '../utils/fileHandler.js';
import Block from './Block.js';
// TODO lös detta globalt!
import dotenv from 'dotenv';
import { join, resolve } from 'path';

const __basedir = join(process.cwd(), 'src');
const envPath = resolve(__basedir, '../src/config/.env');
dotenv.config({ path: envPath });

export default class Blockchain {
  chain: Block[];
  memberNodes: string[];
  nodeUrl: string;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.memberNodes = [];
    this.nodeUrl = process.argv[3];
  }

  private createGenesisBlock(): Block {
    return new Block(
      Date.now(),
      0,
      '0',
      'genesis-hash',
      [],
      2048,
      +process.env.DIFFICULTY
    );
  }

  getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  async loadChainFromFile() {
    try {
      const file = new FileHandler();
      const data = await file.read(
        'data',
        `blockchain-${process.argv[2]}.json`
      );
      // Parse the data directly into this.chain
      this.chain = JSON.parse(data);
    } catch (err) {
      console.error(`Error loading blockchain from file: ${err}`);
      // Handle error (create new genesis block or stop application)
    }
  }

  // TODO döp om till createBlock
  async addBlock(data: any) {
    // TODO Döp om till lastBlock
    const prevBlock = this.getLastBlock();
    const newTimestamp = Date.now();
    const newIndex = prevBlock.index + 1;
    const prevHash = prevBlock.hash;
    const { nonce, difficulty } = this.proofOfWork(prevBlock.hash, data);

    const newHash = this.calculateHash(
      newTimestamp,
      prevHash,
      data,
      nonce,
      difficulty
    );
    const newBlock = new Block(
      newTimestamp,
      newIndex,
      prevHash,
      newHash,
      data,
      nonce,
      difficulty
    );

    this.chain.push(newBlock);
  }

  // TODO kolla om difficulty stämmer såhär
  private calculateHash(
    timestamp: number,
    prevHash: string,
    currData: string[],
    nonce: number,
    difficulty: number
  ): string {
    const stringToHash =
      timestamp.toString() +
      prevHash +
      JSON.stringify(currData) +
      nonce +
      +difficulty;

    const hash = createHash(stringToHash);
    return hash;
  }

  // TODO kolla om vi ska ta in parameter eller this.chain
  isChainValid(blockchain: any): boolean {
    let isValid = true;

    for (let i = 1; i < blockchain.length; i++) {
      const block = blockchain[i];
      const prevBlock = blockchain[i - 1];

      console.log('Validating block:', block);

      const hash = this.calculateHash(
        block.timestamp,
        prevBlock.hash,
        block.data,
        block.nonce,
        block.difficulty
      );

      if (hash !== block.hash) isValid = false;
      if (block.prevHash !== block.hash) isValid = false;
    }
    return isValid;
  }

  proofOfWork(prevHash: string, data: any) {
    const lastBlock = this.getLastBlock();
    let difficulty: number;
    let hash: string;
    let timestamp: number;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();

      difficulty = this.calcDifficulty(lastBlock, timestamp);
      hash = this.calculateHash(timestamp, prevHash, data, nonce, difficulty);
    } while (!this.isValidHash(hash, difficulty));

    return { nonce, difficulty, timestamp };
  }

  calcDifficulty(lastBlock: Block, timestamp: number) {
    const MINE_RATE = +process.env.MINE_RATE;
    const { difficulty } = lastBlock;

    if (difficulty < 1) return 1;

    return timestamp - lastBlock.timestamp > MINE_RATE
      ? +difficulty + 1
      : +difficulty - 1;
  }

  isValidHash(hash: string, difficulty: number): boolean {
    return hash.substring(0, difficulty) === '0'.repeat(difficulty);
  }
}
