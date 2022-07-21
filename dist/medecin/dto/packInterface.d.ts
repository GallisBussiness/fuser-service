export interface PackInterface {
    name: string;
    options?: [PackOptions?];
}
interface PackOptions {
    name: string;
    isActive: boolean;
    price: number;
}
export {};
