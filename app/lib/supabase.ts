import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kqbiodsdqhacmnlhtqaa.supabase.co";
const supabaseAnonKey = "sb_publishable_Q5VrxoZYeuQOvoWGqUwy1A_VyWz2tqS";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);