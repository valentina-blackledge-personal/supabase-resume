import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function ExperiencePage() {
  const { data: experience } = await supabase.from('experience').select('*');
  return (
    <div>
      <h1>Experience</h1>
      {experience?.map((item) => (
        <div key={item.id}>{item.company}</div>
      )) || <p>No experience data</p>}
    </div>
  );
}