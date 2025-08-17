@@ .. @@
 export default defineConfig({
   plugins: [react()],
   server: {
     host: '0.0.0.0', // Allow access from other devices on the network (LAN mode)
     port: 5173,
+    strictPort: true,
   },
   optimizeDeps: {
     exclude: ['lucide-react'],
   },
+  build: {
+    outDir: 'dist',
+    sourcemap: true,
+  },
 });