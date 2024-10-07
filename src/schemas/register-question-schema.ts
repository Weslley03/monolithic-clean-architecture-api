import { z } from 'zod';

export const registerQuestionSchema = z.object({
  Question_Difficulty: z.number().min(1, 'question difficulty is required"'),
  Question_Statements: z.string().min(3, "question statements is required"),
  Question_Figure: z.string().min(3, "question figure is required"), 
  Question_Text_Body: z.string().min(3, "question text body is required"),  
  Question_Resolution: z.string().min(3, "question resolution is required"),  
  Question_Gabarito: z.string().min(3, "question Gabarito is required"),  
});