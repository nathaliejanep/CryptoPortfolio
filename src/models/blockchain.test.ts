import { beforeEach, describe, it, expect } from 'vitest';
import Blockchain from './Blockchain.js';
import Block from './Block.js';

describe('Blockchain', () => {
  let blockchain: Blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  describe('constructor', () => {
    it('should initialize the chain with a genesis block', () => {
      expect(blockchain.chain.length).toBe(1);
      expect(blockchain.chain[0]).toBeInstanceOf(Block);
      expect(blockchain.memberNodes).toEqual([]);
      //   expect(blockchain.nodeUrl).toBeDefined();
    });
  });

  describe('getLastBlock', () => {
    it('should return the last block of the chain', () => {
      const lastBlock = blockchain.getLastBlock();
      expect(lastBlock).toBeInstanceOf(Block);
      expect(lastBlock.index).toBe(0);
    });
  });

  describe('addBlock', () => {
    it('should add a new block to the chain', async () => {
      console.log(blockchain);

      const data = ['Transaction 1', 'Transaction 2'];
      const prevBlock = blockchain.getLastBlock();
      await blockchain.addBlock(data);
      const lastBlock = blockchain.getLastBlock();
      expect(lastBlock.index).toBe(prevBlock.index + 1);
      expect(lastBlock.data).toEqual(data);
    });
  });
});
