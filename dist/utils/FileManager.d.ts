import { IFileManager } from './FileServiceInterface';
export declare class FileManager implements IFileManager {
    has(path: string): Promise<boolean>;
    delete(path: string): Promise<void>;
}
