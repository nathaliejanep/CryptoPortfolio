export default class Block {
  timestamp: number;
  blockIndex: number;
  prevHash: string;
  hash: string;
  data: string;

  constructor(
    timestamp: number,
    blockIndex: number,
    prevHash: string,
    hash: string,
    data: any // type? create blockDatA?
  ) {
    this.timestamp = timestamp;
    this.blockIndex = blockIndex;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
  }
}
