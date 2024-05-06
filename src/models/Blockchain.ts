import { createHash } from '../utils/crypto-lib.js';
import Block from './Block.js';

export default class Blockchain {
  chain: Block[];
  memberNodes: string[];
  nodeUrl: string;

  constructor() {
    this.chain = [];
    this.nodeUrl = process.argv[3];
    this.createBlock('0', '0', []);
  }

  createBlock(
    // timestamp: number, // TODO check if time works
    prevHash: string,
    hash: string,
    data: string[]
  ) {
    const block = new Block(
      Date.now(),
      this.chain.length + 1,
      prevHash,
      hash,
      data
    );

    this.chain.push(block);

    return block;
  }

  getLastBlock() {
    // return this.chain.at(-1);
    return this.chain.slice(-1)[0];
  }

  // TODO change timestamp type
  hashBlock(timestamp: any, prevHash: string, currData: string[]) {
    const hashToString =
      timestamp.toString() + prevHash + JSON.stringify(currData);

    const hash = createHash(hashToString);

    return hash;
  }

  validateChain(blockchain: any[]) {
    let isValid = true;

    for (let i = 1; i < blockchain.length; i++) {
      const block = blockchain[i];
      const prevBlock = blockchain[i - 1];

      console.log('Validating block:', block);

      const hash = this.hashBlock(block.timestamp, prevBlock.hash, block.data);

      if (hash !== block.hash) isValid = false;
      if (block.prevHash !== block.hash) isValid = false;

      return isValid;
    }
  }
}
