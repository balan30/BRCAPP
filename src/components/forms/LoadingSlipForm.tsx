@@ .. @@
 import React, { useState, useEffect } from 'react';
 import { X } from 'lucide-react';
-import { generateSlipNumber } from '../../utils/numberGenerator';
+import { generateSlipNumber, formatCurrency } from '../../utils/numberGenerator';
 import type { LoadingSlip } from '../../types';