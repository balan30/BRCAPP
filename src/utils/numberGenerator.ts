@@ .. @@
 export const formatCurrency = (amount: number): string => {
   return new Intl.NumberFormat('en-IN', {
     style: 'currency',
     currency: 'INR',
-    minimumFractionDigits: 0,
+    minimumFractionDigits: 2,
     maximumFractionDigits: 2,
   }).format(amount);
 };