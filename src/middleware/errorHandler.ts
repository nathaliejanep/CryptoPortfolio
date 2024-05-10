import { Request, Response } from 'express';

const errorHandler = (err: Error, req: Request, res: Response) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  // TODO also ResponseModel
  // Check if the error has a status code and message
  if (err instanceof Error && err.hasOwnProperty('statusCode')) {
    statusCode = (err as any).statusCode;
    message = err.message;
  }

  res.status(statusCode).json({ success: false, msg: message });
};

export default errorHandler;
