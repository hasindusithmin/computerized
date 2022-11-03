

import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://itbnozqiheazburehgvv.supabase.co', process.env.NEXT_PUBLIC_ANON)

export default supabase;