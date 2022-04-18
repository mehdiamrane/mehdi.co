import { useState, useEffect } from 'react';

const useScrollPosition = () => {
  let initialOffset;

  if (typeof window === 'undefined') {
    initialOffset = 0;
  } else {
    initialOffset = window.pageYOffset;
  }

  // Store the state
  const [scrollPos, setScrollPos] = useState(initialOffset);
  const [isAtTop, setIsAtTop] = useState(true);

  // On Scroll
  const onScroll = () => {
    setScrollPos(window.pageYOffset);

    if (isAtTop !== window.pageYOffset < 50) {
      setIsAtTop(window.pageYOffset < 50);
    }
  };

  // Add and remove the window listener
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  return { scrollPos, isAtTop };
};

export default useScrollPosition;
