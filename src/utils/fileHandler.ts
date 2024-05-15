import fs from 'node:fs/promises';
import { join, join as joinPath } from 'path';
class FileHandler {
  private readonly __basedir: string;

  constructor() {
    this.__basedir = join(process.cwd(), 'src');
  }

  private getFilePath(folderName: string, fileName: string) {
    return joinPath(this.__basedir, folderName, fileName);
  }

  async read(folderName: string, fileName: string) {
    try {
      const data = await fs.readFile(
        this.getFilePath(folderName, fileName),
        'utf-8'
      );

      return data;
    } catch (err) {
      console.error(`Error reading file: ${err}`);
      throw err;
    }
  }

  async write(folderName: string, fileName: string, data: any) {
    try {
      await fs.writeFile(
        this.getFilePath(folderName, fileName),
        JSON.stringify(data, null, 2)
      );
    } catch (err) {
      console.error(`Error writing file: ${err}`);
      throw err;
    }
  }

  async append(folderName: string, fileName: string, data: any) {
    try {
      await fs.appendFile(this.getFilePath(folderName, fileName), data);
    } catch (err) {
      console.error(`Error writing file: ${err}`);
      throw err;
    }
  }
}
// TODO rename file 'FileHandler'
export default FileHandler;
