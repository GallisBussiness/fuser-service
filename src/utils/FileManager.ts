/* eslint-disable prettier/prettier */
import { stat, unlink } from 'fs';
import { IFileManager } from './FileServiceInterface';

export class FileManager implements IFileManager {
    has(path: string): Promise<boolean> {
       return new Promise((resolve, reject) => {
        stat(path, (err, stats) => {
            if(err) reject(err);
           resolve(stats.isFile());
          });
       })
        
    }
    async delete(path: string) {
        const exist = await this.has(path);
        if(exist) return unlink(path, err => console.error(err));
    }
  
}
