import { PropsWithChildren, useLayoutEffect, useRef } from 'react';
import { Portal } from '../../Portal';
import './Dropdown.scss';

const DEFAULT_MARGIN_TOP = 12;

type Props = PropsWithChildren & {
  anchorElement: HTMLElement | null;
  isOpen?: boolean;
};

const Dropdown = (props: Props) => {
  const { children, anchorElement, isOpen } = props;
  const contentRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (anchorElement && contentRef.current) {
      const cr = anchorElement.getBoundingClientRect();

      const top = cr.height + cr.y;
      const left = cr.x;
      const width = cr.width;

      contentRef.current.style.width = width + 'px';
      contentRef.current.style.top = top + DEFAULT_MARGIN_TOP + 'px';
      contentRef.current.style.left = left + 'px';
    }
  }, [isOpen, anchorElement]);

  return (
    <>
      {isOpen && (
        <Portal>
          <div className="Dropdown-content" ref={contentRef} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </Portal>
      )}
    </>
  );
};

export default Dropdown;
