import Block from './Block.js';

export default class Blockchain {
  chain: Block[];
  memberNodes: string[];
  nodeUrl: string;

  constructor() {
    this.chain = [];
    this.nodeUrl = process.argv[3];
    this.createBlock(Date.now(), '0', '0', []);
  }

  createBlock(
    timestamp: number,
    previousBlockHash: string,
    currentBlockHash: string,
    data: string[]
  ) {
    const block = new Block(
      timestamp,
      this.chain.length + 1,
      previousBlockHash,
      currentBlockHash,
      data
    );
    this.chain.push(block);

    return block;
  }
}
