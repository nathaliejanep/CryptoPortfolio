// https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000&convert=USD
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import request from 'request';

const getCrypto = (req: Request, res: Response, next: Function) => {
  const crypto = req.params.crypto;
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${crypto}`;
  // 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD';

  dotenv.config({ path: 'src/config/.env' });

  request.get(
    {
      url: url,
      json: true,
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINBASE_API_KEY,
      },
    },
    (error: any, response: any, data: any) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({ data: data.data[crypto].quote });
    }
  );
};

export { getCrypto };
