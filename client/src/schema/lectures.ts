import { z } from 'zod';

export const lecturePeriodSchema = z.object({
  day: z.union([
    z.literal('月'),
    z.literal('火'),
    z.literal('水'),
    z.literal('木'),
    z.literal('金'),
    z.literal('土'),
  ]),
  period: z.number().int().min(1).max(12),
  classroom: z.string().nullable(),
});

export type lecturePeriod = z.infer<typeof lecturePeriodSchema>;

export const lecturePlaceSchema = z.union([
  z.object({
    type: z.literal('intensive'),
  }),
  z.object({
    type: z.literal('normal'),
    periods: z.array(lecturePeriodSchema),
  }),
  z.object({
    type: z.literal('research'),
  }),
  z.object({
    type: z.literal('internship'),
  }),
  z.object({
    type: z.literal('TBD'),
  }),
  z.object({
    type: z.literal('null'),
  }),
  z.object({
    type: z.literal('raw'),
    value: z.string(),
  }),
]);

export type lecturePlace = z.infer<typeof lecturePlaceSchema>;

export const lectureCodeSchema = z.object({
  grade: z.union([
    z.literal(100),

    z.literal(200),

    z.literal(300),

    z.literal(400),

    z.literal(500),

    z.literal(600),
  ]),
  value: z.string(),
});

export type lectureCode = z.infer<typeof lectureCodeSchema>;

export const lectureQuarterSchema = z.array(
  z.union([
    z.literal('1Q'),
    z.literal('2Q'),
    z.literal('3Q'),
    z.literal('4Q'),
    z.literal('1-2Q'),
    z.literal('2-3Q'),
    z.literal('3-4Q'),
    z.literal('1-4Q'),
  ]),
);

export type lectureQuarter = z.infer<typeof lectureQuarterSchema>;

export const lectureSchema = z.object({
  link: z.string(),
  title: z.object({
    ja: z.string(),
    en: z.string().optional(),
  }),
  origin: z.string(),
  teachers: z.array(z.string()),
  place: lecturePlaceSchema,
  code: lectureCodeSchema,
  credit: z.number(),
  year: z.string(),
  quarter: lectureQuarterSchema,
  language: z.union([z.literal('日本語'), z.literal('英語')]),
});

export type lecture = z.infer<typeof lectureSchema>;

export const lecturesResponseSchema = z.object({
  finish: z.boolean(),
  lectures: z.array(lectureSchema),
});

export type lecturesResponse = z.infer<typeof lecturesResponseSchema>;
