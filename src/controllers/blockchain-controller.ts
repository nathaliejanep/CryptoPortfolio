import { Request, Response } from 'express';
import { blockchain } from '../startup.js';

const getBlockchain = (req: Request, res: Response, next: Function) => {
  res.status(200).json({ success: true, data: blockchain });
};

// Use for '/mine' endpoint
const createBlock = (req: Request, res: Response, next: Function) => {
  const lastBlock = blockchain.getLastBlock();

  const timestamp = Date.now();
  const prevHash = lastBlock.hash;
  const data = req.body;

  const hash = blockchain.hashBlock(timestamp, prevHash, data);
  const block = blockchain.createBlock(lastBlock.hash, hash, data);

  res.status(201).json({
    success: true,
    msg: 'Block created successfully!',
    block,
  });
};

// Use for '/concensus' endpoint
const synchronizeChain = (req: Request, res: Response, next: Function) => {
  const currLength = blockchain.chain.length;
  let maxLength = currLength;
  let longestChain = null;

  // TODO hantera om memberNodes är tom
  blockchain.memberNodes.forEach(async (member) => {
    const res = await fetch(`${member}/api/v1/blockchain`);

    if (res.ok) {
      const result = await res.json();
      const resultLength = result.data.chain.length; // TODO byt namn?

      if (resultLength > maxLength) {
        maxLength = resultLength;
        longestChain = result.data.chain;
      }

      if (
        !longestChain ||
        (longestChain && !blockchain.validateChain(longestChain))
      ) {
        console.log('Synkade');
      } else {
        blockchain.chain = longestChain;
      }
    }
  });

  res
    .status(200)
    .json({
      success: true,
      statusCode: 200,
      data: { msg: 'Synkroniseringen är klar' },
    });
};

export { createBlock, getBlockchain, synchronizeChain };
