import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

const Portal: FC<PropsWithChildren> = ({ children }) => {
  return createPortal(children, document.querySelector('#portals') || document.body);
};

export default Portal;
