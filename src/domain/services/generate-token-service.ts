import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();

export async function generateToken(userId: string): Promise<string> {
  const payload = { userId };

  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  if(!JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY is not defined in the environment variables');

  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' }); 
  return token;
};
