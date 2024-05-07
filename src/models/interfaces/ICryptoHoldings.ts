import { ICryptoCurrency } from './ICryptoCurrency.js';
// TODO include methods for calculating the current value
export interface ICryptoHolding {
  // currency: ICryptoCurrency; // The type of cryptocurrency
  currency: string; // name or symbol
  amount: number; // The amount of the cryptocurrency in the user's portfolio
}
