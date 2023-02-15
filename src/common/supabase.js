import { createClient } from "@supabase/supabase-js";

const supaUrl = process.env.REACT_APP_supaUrl;
const supaAnon = process.env.REACT_APP_supaAnon;

const supabase = createClient(supaUrl, supaAnon);

export default supabase;
