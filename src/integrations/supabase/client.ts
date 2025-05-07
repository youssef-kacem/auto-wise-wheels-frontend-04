
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfxntunkuchzicizuufg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmeG50dW5rdWNoemljaXp1dWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1Njk5NjcsImV4cCI6MjA2MjE0NTk2N30.KVkFV2LT7Srvn99il2wrW2Yi53KwtsXrHsceT2OXzvo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
