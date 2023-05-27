import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://icmgieijfinnhpwdyphu.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const main = async () => {
  const { data: lectures, error } = await supabase
    .from('lecture_list')
    .select(
      'id, title_ja, lecture_teachers (name), lecture_quarter(*), lecture_periods(*)'
    );

  if (error) {
    console.error(error);
    return;
  }

  console.log('lecture', lectures);
};

main();
