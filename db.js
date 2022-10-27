

import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://itbnozqiheazburehgvv.supabase.co', process.env.ANON)

export default supabase;