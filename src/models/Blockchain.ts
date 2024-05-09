import { createHash } from '../utils/crypto-lib.js';
import FileHandler from '../utils/fileHandler.js';
import Block from './Block.js';

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
    return new Block(Date.now(), 0, '0', 'genesis-hash', []);
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

  async addBlock(data: any) {
    const prevBlock = this.getLastBlock();

    const newTimestamp = Date.now();
    const newIndex = prevBlock.index + 1;
    const prevHash = prevBlock.hash;

    const newHash = this.calculateHash(newTimestamp, prevHash, data);
    const newBlock = new Block(newTimestamp, newIndex, prevHash, newHash, data);

    this.chain.push(newBlock);
  }

  private calculateHash(
    timestamp: number,
    prevHash: string,
    currData: string[]
  ): string {
    const hashToString =
      timestamp.toString() + prevHash + JSON.stringify(currData);

    const hash = createHash(hashToString);

    return hash;
  }

  isChainValid(blockchain: any): boolean {
    let isValid = true;

    for (let i = 1; i < blockchain.length; i++) {
      const block = blockchain[i];
      const prevBlock = blockchain[i - 1];

      console.log('Validating block:', block);

      const hash = this.calculateHash(
        block.timestamp,
        prevBlock.hash,
        block.data
      );

      if (hash !== block.hash) isValid = false;
      if (block.prevHash !== block.hash) isValid = false;

      return isValid;
    }
  }
}
