export interface IFileManager {
    has(path: string): Promise<boolean>;
    delete(path: string): any;
}
