import { Request, Response, NextFunction } from 'express';
import FileHandler from '../utils/fileHandler.js';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const message = `${req.method} ${
    req.originalUrl
  } - ${new Date().toLocaleDateString('sv-SE')} ${new Date().toLocaleTimeString(
    'sv-SE'
  )}\n`;

  const file = new FileHandler();
  file.append('logs', 'error.log', message);
  next();
};

export default logger;
