import { Request, Response, NextFunction } from 'express';
import { blockchain } from '../startup.js';
import ErrorResponse from '../models/ErrorResponse.js';

const listMembers = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (blockchain.memberNodes.length === 0) {
      throw new ErrorResponse(404, 'No members found');
    }

    res
      .status(200)
      .json({ success: true, statusCode: 200, data: blockchain.memberNodes });
  } catch (err) {
    next(err);
  }
};

const registerNode = (req: Request, res: Response, next: NextFunction) => {
  const { nodeUrl } = req.body;
  try {
    if (
      blockchain.memberNodes.indexOf(nodeUrl) === -1 &&
      blockchain.nodeUrl !== nodeUrl
    ) {
      blockchain.memberNodes.push(nodeUrl);
      syncMembers(nodeUrl);

      res.status(201).json({
        success: true,
        statusCode: 201,
        data: { msg: `Noden ${nodeUrl} är registrerad.` },
      });
    } else {
      throw new ErrorResponse(400, `Node ${nodeUrl} is already registered`);
    }
  } catch (err) {
    next(err);
  }
};

const syncMembers = async (url: string): Promise<void> => {
  const memberNodes = [...blockchain.memberNodes, blockchain.nodeUrl];

  try {
    for (const node of memberNodes) {
      const body = { nodeUrl: node };
      await fetch(`${url}/api/v1/members/register-node`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (err) {
    throw new ErrorResponse(500, `Error synchronizing members: ${err.msg}`);
  }
};
export { listMembers, registerNode };
