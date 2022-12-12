import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props {
  ref?: Ref;
  trigger?: any;
}

const useScrollToTopWithoutAnchor = ({ ref, trigger }: Props) => {
  const router = useRouter();
  useEffect(() => {
    if (!router.asPath.includes('#')) {
      if (ref && ref.current) {
        ref.current.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [ref, trigger, router.asPath]);
};

export default useScrollToTopWithoutAnchor;
