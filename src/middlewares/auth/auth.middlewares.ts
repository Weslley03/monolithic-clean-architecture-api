import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload   } from "jsonwebtoken";

import * as dotenv from "dotenv";
dotenv.config();

interface JwtPayloadWithId extends JwtPayload {
  userId?: string;
};

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if(!authorization) return res.status(404).json(`header without authorazation`);

  const parts = authorization.split(' ');
  const [ schema, token ] = parts;
    
  if(parts.length !== 2) return res.status(404).json("token out of format 'Bearer xxxxxx'"); 
  if(schema !== 'Bearer') return res.status(404).json("schema token out of format"); 
  
  try{    
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if(!JWT_SECRET_KEY) return res.status(404).json("schema token out of format"); 
    
    const decoded = verify(token, JWT_SECRET_KEY) as JwtPayloadWithId;

    req.userId = decoded.userId;
    
    next();
  }catch(err){
    next(err);
  };
};

export { authMiddleware };
