import { useEffect, useState, Ref } from 'react';
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
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLLIElement>,
    inputValue: string
  ) => void;
  inputProps?: InputProps;
  inputRef?: Ref<HTMLInputElement>;
};

const ComboBox = forwardRef<HTMLDivElement, ComboBoxProps>((props, ref) => {
  const { options, handleChange, value, onInputChange, inputValue, inputProps, inputRef } = props;

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
    console.log(value);
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

  return (
    <div ref={ref}>
      <Input
        {...inputProps}
        ref={inputRef}
        onChange={handleInputChange}
        value={inptValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Dropdown anchorElement={anchorElement} onClose={handleClose} isOpen={Boolean(anchorElement)}>
        <div className="Dropdown-Container">
          <ul className="Dropdown-List" onMouseDown={clickHandler}>
            {options.length ? (
              options.map((opt) => {
                return (
                  <li
                    className={`${value?.value === opt.value ? 'Dropdown-ItemActive' : ''} Dropdown-Item`}
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
              <p>No options</p>
            )}
          </ul>
        </div>
      </Dropdown>
    </div>
  );
});

export default ComboBox;
