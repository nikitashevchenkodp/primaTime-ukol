import { useState } from 'react';
import { useDebouncedValue } from 'src/hooks/useDebounceValue';
import { useGetUniversities } from 'src/hooks/useGetUniversities';
import { usePreviousNonNullish } from 'src/hooks/usePreviousNonNullish';
import { ComboBox, ComboboxValue } from './ui/ComboBox';
import { Input } from './ui/Input';

type FormType = {
  name: string;
  university: ComboboxValue | null;
};

const PlainForm = () => {
  const [form, setForm] = useState<FormType>({
    name: '',
    university: null,
  });

  const [inputValue, setInputValue] = useState('');

  const debouncedInputValue = useDebouncedValue(inputValue, 500);

  const { data, isLoading } = useGetUniversities(debouncedInputValue);

  const prevOptions = usePreviousNonNullish(data);

  return (
    <div className="form-container">
      <h3 className="title">Plain form</h3>
      <form className="form">
        <fieldset className="fieldset">
          <Input
            label="Name"
            fullWidth
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />

          <ComboBox
            value={form.university}
            handleChange={(newValue) => {
              setForm((prev) => ({ ...prev, university: newValue }));
            }}
            inputValue={inputValue}
            onInputChange={(_: unknown, val) => setInputValue(val)}
            options={data || prevOptions}
            isLoading={isLoading}
            inputProps={{
              fullWidth: true,
              label: 'University',
            }}
          />
        </fieldset>
        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default PlainForm;
