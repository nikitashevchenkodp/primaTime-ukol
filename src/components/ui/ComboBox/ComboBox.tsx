import { useEffect, useState, Ref, useMemo } from 'react';
import { forwardRef } from 'react';
import { Input, InputProps } from '../Input';
import './ComboBox.scss';
import { Dropdown } from './Dropdown';

export type ComboboxValue = {
  value: string | number;
  label: string;
};

type ComboBoxProps = JSX.IntrinsicElements['div'] & {
  options: ComboboxValue[];
  value: ComboboxValue | null;
  handleChange: (newValue: ComboboxValue | null) => void;
  inputValue?: string;
  onInputChange?: (e: React.SyntheticEvent, inputValue: string) => void;
  inputProps?: InputProps;
  inputRef?: Ref<HTMLInputElement>;
};

const ComboBox = forwardRef<HTMLDivElement, ComboBoxProps>((props, ref) => {
  const { options, handleChange, value, onInputChange, inputValue, inputProps, inputRef, ...rest } = props;

  useEffect(() => {
    const activeOpt = options.find((opt) => opt.value === value?.value);
    setInptValue(activeOpt?.label || '');
  }, [value]);

  const [inptValue, setInptValue] = useState('');
  const [anchorElement, setAnchorElement] = useState<HTMLInputElement | null>(null);

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setAnchorElement(e.target);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setInptValue(value?.label || '');
    onInputChange?.(e, value?.label || '');
    setAnchorElement(null);
  };

  const clickHandler = (e: React.MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
  };

  const handleChooseOption = (e: React.MouseEvent<HTMLLIElement>, opt: ComboboxValue) => {
    handleChange(opt);
    setInptValue(opt.label);
    onInputChange?.(e, opt.label);
    handleClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setAnchorElement(event.target);

    if (inputValue !== newValue) {
      setInptValue(newValue);
      onInputChange?.(event, newValue);
    }

    if (newValue === '') {
      handleChange(null);
    }
  };

  const resetValue = (e: React.SyntheticEvent) => {
    handleChange(null);
    setInptValue('');
    onInputChange?.(e, '');
  };

  return (
    <div ref={ref} className="Combobox-Root" {...rest}>
      <Input
        {...inputProps}
        ref={inputRef}
        onChange={handleInputChange}
        value={inptValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        endElement={
          value && (
            <button className="Combobox-Reset" onClick={resetValue}>
              &#10005;
            </button>
          )
        }
      />
      <Dropdown anchorElement={anchorElement} onClose={handleClose} isOpen={Boolean(anchorElement)}>
        <div className="Options-Container">
          <ul className="Options-List" onMouseDown={clickHandler}>
            {options.length ? (
              options.map((opt) => {
                return (
                  <li
                    className={`${value?.value === opt.value ? 'Options-ItemActive' : ''} Options-Item`}
                    key={opt.value}
                    onClick={(e) => {
                      handleChooseOption(e, opt);
                    }}
                  >
                    {opt.label}
                  </li>
                );
              })
            ) : (
              <div className="Options-NoOptions">No options</div>
            )}
          </ul>
        </div>
      </Dropdown>
    </div>
  );
});

export default ComboBox;
