import { Request, Response } from 'express';
import { blockchain } from '../startup.js';
import Block from '../models/Block.js';
import FileHandler from '../utils/fileHandler.js';

const getBlockchain = (req: Request, res: Response, next: Function) => {
  res.status(200).json({ success: true, data: blockchain });
};

// Use for '/mine' endpoint
const addBlock = async (req: Request, res: Response, next: Function) => {
  const data = req.body;
  const block = await blockchain.addBlock(data);

  res.status(201).json({
    success: true,
    msg: 'Block created successfully!',
    data: block,
  });

  const file = new FileHandler();
  // Write the entire blockchain to the file
  await file.write('data', `blockchain-${process.argv[2]}.json`, blockchain);
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
