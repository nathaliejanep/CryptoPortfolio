export default class Block {
  timestamp: number;
  blockIndex: number;
  previousBlockHash: string;
  currentBlockHash: string;
  data: string;

  constructor(
    timestamp: number,
    blockIndex: number,
    previousBlockHash: string,
    currentBlockHash: string,
    data: any // type?
  ) {
    this.timestamp = timestamp;
    this.blockIndex = blockIndex;
    this.previousBlockHash = previousBlockHash;
    this.currentBlockHash = currentBlockHash;
    this.data = data;
  }
}
