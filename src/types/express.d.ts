// src/types/express.d.ts
import { User } from './user/schemas/user.schema';

declare module 'express' {
  export interface Request {
    user?: Partial<User>;
  }
}
