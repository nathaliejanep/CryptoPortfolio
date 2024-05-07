export default class Block {
  timestamp: number;
  index: number;
  prevHash: string;
  hash: string;
  data: string;

  constructor(
    timestamp: number,
    index: number,
    prevHash: string,
    hash: string,
    data: any // TODO create blockData interface?
  ) {
    this.timestamp = timestamp;
    this.index = index;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
  }
}
