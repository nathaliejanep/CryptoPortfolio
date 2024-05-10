export default class Block {
  timestamp: number;
  index: number;
  prevHash: string;
  hash: string;
  data: string;
  nonce: number;
  difficulty: number;

  constructor(
    timestamp: number,
    index: number,
    prevHash: string,
    hash: string,
    data: any, // TODO create blockData interface?
    nonce: number,
    difficulty: number
  ) {
    this.timestamp = timestamp;
    this.index = index;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
    // this.difficulty = difficulty || +process.env.DIFFICULTY;
  }
}
