import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { searchQuery } from '@/schema/searchQuery';

const supabaseUrl = 'https://icmgieijfinnhpwdyphu.supabase.co';
const supabaseKey = z.string().parse(process.env.SUPABASE_KEY);
const supabase = createClient(supabaseUrl, supabaseKey);

export const searchLectures = async (searchQuery: searchQuery) => {
  const { data, error } = await (() => {
    let query = supabase.from('lecture_list').select('*');
    if (searchQuery.title)
      query = query.like('title', `%${searchQuery.title}%`);
    query = query.eq('teacher', searchQuery.teacher);
    if (searchQuery.language)
      query = query.like('language', `%${searchQuery.language}%`);
    return query;
  })();
};