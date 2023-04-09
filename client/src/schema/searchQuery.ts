import { z } from 'zod';
import {
  lectureCodeSchema,
  lecturePeriodSchema,
  lectureSchema,
} from '@/schema/lectures';

export const searchQuerySchema = z
  .object({
    title: z.string(),
    teacher: z.string(),
    code: z.array(lectureCodeSchema.shape.grade),
    quarter: lectureSchema.shape.quarter,
    language: z.array(lectureSchema.shape.language),
    day: z.array(lecturePeriodSchema.shape.day),
    period: z.array(lecturePeriodSchema.shape.period),
    limit: z.number().min(1).max(100).default(50),
    page: z.number().min(1).default(1),
  })
  .partial();

export type searchQuery = z.infer<typeof searchQuerySchema>;
