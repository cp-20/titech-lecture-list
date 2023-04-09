import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://icmgieijfinnhpwdyphu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljbWdpZWlqZmlubmhwd2R5cGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA3ODQzODUsImV4cCI6MTk5NjM2MDM4NX0.hzPO1D02Fg2ktocCw6gdzXjb2Xj_C1wM74KfxeRIXns'
);
