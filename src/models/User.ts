import { ICryptoHolding } from './interfaces/ICryptoHoldings.js';
// TODO methods for user authentication, registration, and managing their portfolio.
export class User {
  username: string;
  cryptoHoldings: ICryptoHolding[]; // List of cryptocurrency holdings for the user
  //   id: string; // User's identifier
  //   email: string;

  constructor(
    username: string,
    cryptoHoldings: ICryptoHolding[]
    // id: string,
    // email: string,
  ) {
    this.username = username;
    this.cryptoHoldings = cryptoHoldings;
    // this.id = id;
    // this.email = email;
  }
}
