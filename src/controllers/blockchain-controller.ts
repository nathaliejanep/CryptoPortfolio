import { Request, Response } from 'express';
import { blockchain } from '../startup.js';
import { Block } from 'ethers';

const getBlockchain = (req: Request, res: Response, next: Function) => {
  res.status(200).json({ success: true, data: blockchain });
};

// Use for '/mine' endpoint
const addBlock = (req: Request, res: Response, next: Function) => {
  const data = req.body;
  const block = blockchain.addBlock(data);

  res.status(201).json({
    success: true,
    msg: 'Block created successfully!',
    block,
  });
};

// Use for '/concensus' endpoint
const synchronizeChain = async (req: Request, res: Response) => {
  const currLength = blockchain.chain.length;
  let maxLength = currLength;
  // let longestChain = null;
  let longestChain: Block[] | null = null;

  // TODO hantera om memberNodes är tom
  for (const member of blockchain.memberNodes) {
    try {
      const res = await fetch(`${member}/api/v1/blockchain`);

      if (res.ok) {
        const result = await res.json();
        const resultLength = result.blockchain.length;
        console.log('result', result);
        if (resultLength > maxLength) {
          maxLength = resultLength;
          longestChain = result.blockchain;
        }
      }
    } catch (err) {
      console.error(`Error synchronizing with node ${member}: ${err}`);
    }
  }
  if (
    !longestChain ||
    (longestChain && !blockchain.isChainValid(longestChain))
  ) {
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: { msg: 'Synchronization complete' },
    });
  } else {
    // blockchain.chain = longestChain;
    res.status(500).json({
      success: false,
      statusCode: 500,
      data: { msg: 'Failed to synchronize chains.' },
    });
  }
};

export { addBlock, getBlockchain, synchronizeChain };
