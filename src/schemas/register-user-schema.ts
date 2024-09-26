import { z } from 'zod';

export const registerUserSchema = z.object({
  User_Name: z.string().min(3, "user name is required"),
	User_Email: z.string().email("invalid email"),
	User_Password: z.string().min(6, "password must be at least 6 characters"),
	User_Username: z.string().min(2, "username is required"),	
});