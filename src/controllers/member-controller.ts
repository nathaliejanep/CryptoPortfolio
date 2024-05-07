import { Request, Response } from 'express';
import { blockchain } from '../startup.js';

const listMembers = (req: Request, res: Response, next: Function) => {
  // TODO hantera om inga members
  res
    .status(200)
    .json({ success: true, statusCode: 200, data: blockchain.memberNodes });
};

const registerNode = (req: Request, res: Response, next: Function) => {
  const node = req.body;
  const nodeUrl = node.nodeUrl;
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

const syncMembers = (url: string) => {
  const members = [...blockchain.memberNodes, blockchain.nodeUrl];

  try {
    members.forEach(async (member) => {
      const body = { nodeUrl: member };
      await fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  } catch (err) {
    console.log(err);
  }
};
export { listMembers, registerNode };
