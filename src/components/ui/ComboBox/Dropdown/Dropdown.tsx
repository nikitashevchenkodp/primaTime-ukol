import { PropsWithChildren, useLayoutEffect, useRef } from 'react';
import { Portal } from '../../Portal';
import './Dropdown.scss';

const DEFAULT_MARGIN = 12;

type Props = PropsWithChildren & {
  anchorElement: HTMLElement | null;
  isOpen?: boolean;
};

const Dropdown = (props: Props) => {
  const { children, anchorElement, isOpen } = props;
  const contentRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!anchorElement || !contentRef.current) return;
    const anchorCR = anchorElement.getBoundingClientRect();
    const contentCR = contentRef.current.getBoundingClientRect();

    const viewportHeight = window.innerHeight;
    const contentHeight = contentCR.height;

    const betwenAnchorAndBottomOfViewport = viewportHeight - (anchorCR.height + anchorCR.y);
    const betwenAnchorAndTopOfViewport = anchorCR.y;

    const notEnoughPlaceOnTheBottom = betwenAnchorAndBottomOfViewport < contentHeight + DEFAULT_MARGIN;
    const notEnoughPlaceOnTheTop = betwenAnchorAndTopOfViewport < contentHeight + DEFAULT_MARGIN;

    let top = anchorCR.height + anchorCR.y + DEFAULT_MARGIN;
    const left = anchorCR.x;
    const width = anchorCR.width;

    if (notEnoughPlaceOnTheBottom) {
      top = Math.max(0, anchorCR.y - contentHeight - DEFAULT_MARGIN);
    }

    if (notEnoughPlaceOnTheBottom && notEnoughPlaceOnTheTop) {
      if (betwenAnchorAndBottomOfViewport < betwenAnchorAndTopOfViewport) {
        contentRef.current.style.maxHeight = anchorCR.y - DEFAULT_MARGIN * 2 + 'px';
        top = DEFAULT_MARGIN;
      } else {
        contentRef.current.style.maxHeight = betwenAnchorAndBottomOfViewport - DEFAULT_MARGIN * 2 + 'px';
        top = anchorCR.height + anchorCR.y + DEFAULT_MARGIN;
      }
    }

    contentRef.current.style.width = width + 'px';
    contentRef.current.style.top = top + 'px';
    contentRef.current.style.left = left + 'px';

    //To prevent scroll when Combobox is opened.
    //Didn't found fast solution. I dont want use scroll event, and make hundrets of
    // getBoundingClientRect() per second,because it is triggers force reflow.
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, anchorElement]);

  return (
    <>
      {isOpen && (
        <Portal>
          <div className="Dropdown-overlay" ref={overlayRef}>
            <div className="Dropdown-content" ref={contentRef} onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default Dropdown;
