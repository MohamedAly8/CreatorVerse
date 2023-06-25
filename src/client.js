import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://okdmpsubljduizdqktcc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZG1wc3VibGpkdWl6ZHFrdGNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc0ODY3NjgsImV4cCI6MjAwMzA2Mjc2OH0.e0DPSMX0oWCdlwXkW8cWyc7S6hyJI_HxSKoZWW-uT00'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase



