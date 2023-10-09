'use client'
import { useEffect, useState } from 'react';

function DisplayModeDetector() {
  const [displayMode, setDisplayMode] = useState('');

  useEffect(() => {
    const updateDisplayMode = () => {
      if (window.matchMedia('(display-mode: browser)').matches) {
        setDisplayMode("browser")
      } else if (window.matchMedia('(display-mode:  minimal-ui)').matches) {
        setDisplayMode("minimal-ui")
      } else {
        setDisplayMode("not browser or minimal-ui")
      }
    };
    updateDisplayMode();
  }, []);

  return (
    <div>
      <p>Display Mode: {displayMode}</p>
    </div>
  );
}

export default DisplayModeDetector;
