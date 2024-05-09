import fs from 'node:fs/promises';
import { join, join as joinPath } from 'path';

class FileHandler {
  private readonly __basedir: string;

  constructor() {
    this.__basedir = join(process.cwd(), 'src');
  }

  async write(folderName: string, fileName: string, data: any) {
    try {
      const filePath = joinPath(this.__basedir, folderName, fileName);
      // Stringify the entire blockchain, not just the new block
      await fs.writeFile(filePath, JSON.stringify(data.chain, null, 2));
    } catch (err) {
      console.error(`Error writing file: ${err}`);
      throw err;
    }
  }
  async read(folderName: string, fileName: string) {
    const filePath = joinPath(this.__basedir, folderName, fileName);

    try {
      const path = joinPath(filePath);
      const data = await fs.readFile(path, 'utf-8');
      return data;
    } catch (err) {
      console.error(`Error reading file: ${err}`);
      throw err;
    }
  }
}

export default FileHandler;
