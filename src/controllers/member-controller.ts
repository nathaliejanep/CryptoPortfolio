import { Request, Response } from 'express';
import { blockchain } from '../startup.js';

const listMembers = (req: Request, res: Response, next: Function) => {
  // TODO hantera om inga members
  // TODO fixa så vi får rätt nodeUrl för egen node
  res
    .status(200)
    .json({ success: true, statusCode: 200, data: blockchain.memberNodes });
};

const registerNode = (req: Request, res: Response, next: Function) => {
  const { nodeUrl } = req.body;

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
    res.status(400).json({
      success: false,
      statusCode: 400,
      data: { msg: `Node ${nodeUrl} är redan registrerad.` },
    });
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
    console.error(err);
  }
};
export { listMembers, registerNode };
