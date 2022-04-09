import { User } from './user';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
      data: User
  }
}

declare global {
  namespace Jsonwebtoken {
    interface JwtPayload {
      data: User
    }
  }
}