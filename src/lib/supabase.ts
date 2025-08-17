@@ .. @@
 import { createClient } from '@supabase/supabase-js';
 
-const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
-const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
+const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
+const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';
 
-if (!supabaseUrl || !supabaseAnonKey) {
-  throw new Error('Missing Supabase environment variables');
-}
+// Create client with fallback for development
+export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
+  auth: {
+    persistSession: false
+  }
+});
 
-export const supabase = createClient(supabaseUrl, supabaseAnonKey);
+// Check if Supabase is properly configured
+export const isSupabaseConfigured = () => {
+  return supabaseUrl !== 'https://placeholder.supabase.co' && 
+         supabaseAnonKey !== 'placeholder-key';
+};