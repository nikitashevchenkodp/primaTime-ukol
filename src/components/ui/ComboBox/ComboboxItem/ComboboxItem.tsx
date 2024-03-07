import * as React from 'react';
import './ComboboxItem.scss';

type Props = {
  active: boolean;
  children: React.ReactNode;
};

const ComboboxItem = (props: Props & React.HTMLAttributes<HTMLLIElement>) => {
  const { active, children, ...rest } = props;
  return (
    <li {...rest} className={`${active ? 'Combobox-ItemActive' : ''} Combobox-Item`} role="button">
      {children}
    </li>
  );
};

export default ComboboxItem;
