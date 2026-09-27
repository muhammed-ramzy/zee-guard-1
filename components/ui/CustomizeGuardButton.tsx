// CustomizeGuardButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from './button';

export function CustomizeGuardButton() {
  const [hasSelection, setHasSelection] = useState(false);

  useEffect(() => {
    const checkSelection = () => {
      const braces = sessionStorage.getItem('upper tier');
      setHasSelection(!!braces?.length);
    };

    checkSelection();

    // Listen for our custom event (same tab)
    window.addEventListener('selection-changed', checkSelection);

    return () => {
      window.removeEventListener('selection-changed', checkSelection);
    };
  }, []);

  return !hasSelection ? (
    <Button href="/designer" disabled={true}>
      Customize your mouthguard
    </Button>
  ) : (
    <Button href="/designer">Customize your mouthguard</Button>
  );
}