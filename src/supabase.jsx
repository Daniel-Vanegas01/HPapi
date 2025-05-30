// src/supabase.js
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://mjaauokyuunlepzraens.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qYWF1b2t5dXVubGVwenJhZW5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTk0MTcsImV4cCI6MjA2Mjk5NTQxN30.cU1moWLqDThpzeNl0-VCza4X2d10clz6ag6kYNBvDPY';
export const supabase = createClient(supabaseUrl, supabaseKey);