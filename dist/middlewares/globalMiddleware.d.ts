export declare class GlobalMiddleware {
    static CheckError(req: any, res: any, next: any): void;
    static authenticate(req: any, res: any, next: any): Promise<void>;
}
