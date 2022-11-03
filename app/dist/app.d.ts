import { Pool } from 'pg';
export declare const pool: Pool;
declare module "express-session" {
    interface SessionData {
        user: string;
    }
}
declare const _default: {
    app: import("express-serve-static-core").Express;
};
export default _default;
