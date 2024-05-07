import { ICryptoCurrency } from './ICryptoCurrency.js';

export interface ICryptoHolding {
  currency: ICryptoCurrency; // The type of cryptocurrency
  amount: number; // The amount of the cryptocurrency in the user's portfolio
}
