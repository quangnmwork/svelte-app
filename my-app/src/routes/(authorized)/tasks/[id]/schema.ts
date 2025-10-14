import { z } from 'zod';

export const schema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().optional()
});
