import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// null when the env vars are missing, so the site still loads and the account page explains what to add
export const supabase = url && key ? createClient(url, key) : null