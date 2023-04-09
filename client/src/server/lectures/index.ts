import type { NextApiHandler } from 'next';
import { z } from 'zod';
import { searchQuerySchema } from '@/schema/searchQuery';
import { searchLectures } from '@/server/lectures/searchLectures';

const querySchema = z.string().default('{}');

export const handler: NextApiHandler = async (req, res) => {
  const { q: query } = req.query;

  const parsedQuery = querySchema.safeParse(query);
  if (!parsedQuery.success) {
    res.status(400).end();
    return;
  }

  const searchQuery = searchQuerySchema.safeParse(JSON.parse(parsedQuery.data));
  if (!searchQuery.success) {
    res.status(400).end();
    return;
  }

  const response = searchLectures(searchQuery.data);

  res.status(200).json(response);
};
