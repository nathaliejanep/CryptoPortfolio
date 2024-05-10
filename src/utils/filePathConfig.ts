import { join } from 'path';

const rootDir = process.cwd();
const srcDir = join(rootDir, 'src');
const dataDir = join(srcDir, 'data');
const blockchainFilePath = join(dataDir, 'blockchain.json');

export { rootDir, srcDir, dataDir, blockchainFilePath };
