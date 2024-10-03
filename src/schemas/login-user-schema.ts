import { z } from 'zod';

export const loginUserSchema = z.object({
	User_Email: z.string().email("invalid email"),
	User_Password: z.string().min(6, "password must be at least 6 characters"),
});