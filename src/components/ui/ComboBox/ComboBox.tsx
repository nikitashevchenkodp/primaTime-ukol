import { useEffect, useState, Ref, useMemo, useCallback } from 'react';
import { forwardRef } from 'react';
import { useLatest } from 'src/hooks/useLatest';
import { Input, InputProps } from '../Input';
import { Spinner } from '../Spinner';
import './ComboBox.scss';
import { ComboboxItem } from './ComboboxItem';
import { Dropdown } from './Dropdown';

/*
 There is a lot of ways to optimize this component.
 The main idea make it work and simple.
 For example we can make a render function for options, and pass option component inside
 We can reuse Dropdown for a lot of different components, such as Menu etc.
 Separate autocomplete logic in useAutocomplete hook and leave in this component only component structure.
 Also we can make deeper decomposition, and event listeners to keydown, to handlen avigation by options etc.
 We are able to handle different option types, either strin[] or Record<string,any>
*/

export type ComboboxValue = {
  value: string | number;
  label: string;
};

type ComboBoxProps = JSX.IntrinsicElements['div'] & {
  options?: ComboboxValue[];
  value: ComboboxValue | null;
  handleChange: (newValue: ComboboxValue | null) => void;
  inputValue?: string;
  onInputChange?: (e: React.SyntheticEvent, inputValue: string) => void;
  inputProps?: InputProps;
  inputRef?: Ref<HTMLInputElement>;
  isLoading?: boolean;
};

const ComboBox = forwardRef<HTMLDivElement, ComboBoxProps>((props, ref) => {
  const { options, handleChange, value, onInputChange, inputValue, inputProps, inputRef, isLoading, ...rest } = props;

  const [inptValue, setInptValue] = useState('');
  const [anchorElement, setAnchorElement] = useState<HTMLInputElement | null>(null);

  const latestState = useLatest({ inputValue, inptValue, value });

  // useEffect(() => {
  //   const activeOpt = options?.find((opt) => opt.value === value?.value);
  //   setInptValue(activeOpt?.label || '');
  // }, [value]);

  const handleClose = useCallback(() => {
    setAnchorElement(null);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
    setAnchorElement(e.target as HTMLInputElement);
  }, []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = latestState.current;

    setInptValue(value?.label || '');
    onInputChange?.(e, value?.label || '');
    setAnchorElement(null);
  }, []);

  const listClickHandler = useCallback((e: React.MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
  }, []);

  const handleChooseOption = useCallback((e: React.MouseEvent<HTMLLIElement>, opt: ComboboxValue) => {
    handleChange(opt);
    setInptValue(opt.label);
    onInputChange?.(e, opt.label);
    handleClose();
  }, []);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setAnchorElement(event.target);
    setInptValue(newValue);
    onInputChange?.(event, newValue);
  }, []);

  const resetValue = useCallback((e: React.SyntheticEvent) => {
    handleChange(null);
    setInptValue('');
    onInputChange?.(e, '');
  }, []);

  const inputEndElement = useMemo(() => {
    if (!!anchorElement && isLoading) {
      return <Spinner />;
    }

    if (value) {
      return (
        <button className="Combobox-Reset" onClick={resetValue}>
          &#10005;
        </button>
      );
    }

    return;
  }, [isLoading, value]);

  return (
    <div ref={ref} className="Combobox-Root" {...rest}>
      <Input
        {...inputProps}
        ref={inputRef}
        onChange={handleInputChange}
        value={inptValue}
        onClick={handleClick}
        onBlur={handleBlur}
        endElement={inputEndElement}
        autoComplete="off"
      />
      <Dropdown anchorElement={anchorElement} isOpen={Boolean(anchorElement)}>
        <div className="Combobox-Container">
          <ul className="Combobox-List" onMouseDown={listClickHandler}>
            {options?.length ? (
              options.map((opt) => {
                return (
                  <ComboboxItem
                    key={opt.value}
                    active={value?.value === opt.value}
                    onClick={(e) => {
                      handleChooseOption(e, opt);
                    }}
                  >
                    {opt.label}
                  </ComboboxItem>
                );
              })
            ) : (
              <div className="Combobox-NoOptions">No options</div>
            )}
          </ul>
        </div>
      </Dropdown>
    </div>
  );
});

export default ComboBox;
