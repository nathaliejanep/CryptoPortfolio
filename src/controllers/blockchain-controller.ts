import { Request, Response, NextFunction } from 'express';
import { blockchain } from '../startup.js';
import Block from '../models/Block.js';
import FileHandler from '../utils/fileHandler.js';
import ErrorResponse from '../models/ErrorResponse.js';

const getBlockchain = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ success: true, data: blockchain });
  } catch (err) {
    next(new ErrorResponse(500, 'Error getting blockchain'));
  }
};

// TODO handle memberNodes so they are not reset to []
const addBlock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const block = await blockchain.addBlock(data);

    res.status(201).json({
      success: true,
      msg: 'Block created successfully!',
      data: block,
    });

    const file = new FileHandler();
    await file.write('data', `blockchain-${process.argv[2]}.json`, blockchain);
  } catch (err) {
    next(
      new ErrorResponse(400, `Error while trying to add block: ${req.body}`)
    );
  }
};

// Use for '/concensus' endpoint
const synchronizeChain = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currLength = blockchain.chain.length;
  let maxLength = currLength;
  // let longestChain = null;
  let longestChain: Block[] | null = null;

  try {
    for (const member of blockchain.memberNodes) {
      const res = await fetch(`${member}/api/v1/blockchain`);

      if (res.ok) {
        const result = await res.json();
        const resultLength = result.blockchain.length;

        if (resultLength > maxLength) {
          maxLength = resultLength;
          longestChain = result.blockchain;
        }
      } else {
        throw new Error(`Failed to fetch blockchain from node ${member}`);
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
        msg: 'Failed to synchronize chains.',
      });
    }
  } catch (err) {
    next(new ErrorResponse(500, `Error synchronizing chains: ${err.msg}`));
  }
};

export { addBlock, getBlockchain, synchronizeChain };
