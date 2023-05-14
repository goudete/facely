import { createClient } from '@supabase/supabase-js';
import { consts } from '../../consts';

export const supabase = createClient(
  consts.SUPABASE_PROJECT_URL,
  consts.SUPABASE_API_KEY
);