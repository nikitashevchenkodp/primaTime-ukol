import { forwardRef } from 'react';
import classNames from 'classnames';

import './Input.scss';

export type InputProps = JSX.IntrinsicElements['input'] & {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, helperText, error, disabled, className = '', fullWidth = false, ...rest } = props;
  const rootClasses = classNames('Input-root', className, {
    'Input-fullWidth': fullWidth,
    'Input-withError': error,
    'Input-Disabled': disabled,
  });
  return (
    <div className={rootClasses}>
      {label && <label className="Input-label">{label}</label>}
      <input className="Input-field" ref={ref} {...rest} disabled={disabled} />
      {helperText && <p className="Input-HelperText">{helperText}</p>}
    </div>
  );
});

export default Input;
