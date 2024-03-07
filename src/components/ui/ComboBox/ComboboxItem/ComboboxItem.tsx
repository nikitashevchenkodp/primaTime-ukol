import classNames from 'classnames';
import * as React from 'react';
import './ComboboxItem.scss';

type Props = {
  active: boolean;
  children: React.ReactNode;
};

const ComboboxItem = (props: Props & React.HTMLAttributes<HTMLLIElement>) => {
  const { active, children, ...rest } = props;
  const cls = classNames('Combobox-Item', { 'Combobox-ItemActive': active });

  return (
    <li {...rest} className={cls} role="button">
      {children}
    </li>
  );
};

export default ComboboxItem;
