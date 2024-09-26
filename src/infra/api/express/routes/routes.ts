import { Request, Response, NextFunction } from 'express';

export type HttpMethod = 'get' | 'post' | 'patch' | 'delete';

export const HttpMethod = {
  GET: 'get' as HttpMethod,
  POST: 'post' as HttpMethod,
  PATCH: 'patch' as HttpMethod,
  DELETE: 'delete' as HttpMethod,
} as const;

export interface Route {
  getHandler(): Array<(request: Request, response: Response, next: NextFunction) => Promise<void> | void>;
  getPath(): string;
  getMethod(): HttpMethod;
};