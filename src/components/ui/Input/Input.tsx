import { forwardRef, memo } from 'react';
import classNames from 'classnames';

import './Input.scss';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  endElement?: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, helperText, error, disabled, endElement, className = '', fullWidth = false, ...rest } = props;

  const rootClasses = classNames('Input-root', className, {
    'Input-fullWidth': fullWidth,
    'Input-withError': error,
    'Input-Disabled': disabled,
  });
  return (
    <div className={rootClasses}>
      {label && <label className="Input-label">{label}</label>}
      <div className="Input-fieldContainer">
        <input className="Input-field" ref={ref} {...rest} disabled={disabled} />
        {endElement && <div className="Input-fieldEndItem">{endElement}</div>}
      </div>
      {helperText && <p className="Input-HelperText">{helperText}</p>}
    </div>
  );
});

export default memo(Input);
